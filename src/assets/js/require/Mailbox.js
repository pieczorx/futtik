const imap = require('imap');
const inspect = require('util').inspect;
class Mailbox {
  constructor(options, max_timeout) {
    Object.assign(this, options);
    this.message_count = null;
    this.options = options;
    this.mail = new imap(options);
    this.interval_refresh_mail = null;
    this.box = null;
    this.max_timeout = max_timeout * 1000;
  }
  async connect() {
    console.log('Lets connect');
    if(!this.connected) {
      await this.connect_once();
      console.log('Connected?');
      this.connected = true;
    }
  }
  get_latest(type) {
    let that = this;
    let interval_refresh_mail;
    let code_fetched = false;
    return new Promise((resolve, reject) => {
      interval_refresh_mail = setInterval(async function() {
        const current_message_id = that.get_latest_message_id();

        if(current_message_id > that.latest_message_id) {
          const new_messages_count = current_message_id - that.latest_message_id;
          console.log('You have ' + new_messages_count + ' new messages!');
          for(let i = 1; i <= new_messages_count; i++) {
            let message_id = that.latest_message_id + i;
            try {
              let code = await that.get_data_from_message(message_id, type);
              that.latest_message_id = message_id;
              clearInterval(interval_refresh_mail);
              if(!code_fetched) {
                code_fetched = true;
                return resolve(code);
              }
            } catch(e) {
              console.log('awkward error', e);
            }
          }
          that.latest_message_id = current_message_id;
        } else {
          console.log('No new messages, current count:', current_message_id);
        }
      }, 1000);
      setTimeout(function() {
        if(!code_fetched) {
          clearInterval(interval_refresh_mail);
          reject(`Could not get code in ${that.max_timeout / 1000} seconds`);
        }
      }, this.max_timeout);
    });
  }
  connect_once() {
    let that = this;
    return new Promise(async (resolve, reject) => {
      this.mail.once('ready', function() {
        that.mail.openBox('INBOX', true, function(err, box) {
          that.box = box;
          that.latest_message_id = that.get_latest_message_id();
          console.log('Connected with message count', that.latest_message_id);
          resolve();
        })
      });
      that.mail.once('error', function(err) {
        reject(err);
      });
      try {
        that.mail.connect();
      } catch(e) {
        reject(e);
      }
    });
  }
  get_data_from_message(id, type) {
    let resolved = false;
    return new Promise(async (resolve, reject) => {
      const message = await this.get_message(id);
      if(!resolved) {
        resolved = true;
        if(message.from.indexOf('<EA@e.ea.com>') > -1) {
          switch(type) {
            case "code": {
              if(message.subject.length > 6) {
                const code = message.subject.slice(-6);
                if(!isNaN(code)) {
                  return resolve(code);
                }
              }
              break;
            }
            case "verify_mail_change_link": {
              if(message.body.indexOf('signin.ea.com/p/web/emailVerification') > -1) {
                //https://signin.ea.com/p/web/emailVerification?code=7C2592F37F5555CCF45D0D6&email=pxdasd12%40xcxc.pl&locale=pl_PL
                let code = message.body.split(`https://signin.ea.com/p/web/emailVerification?code=`)[1];
                code = code.split('&')[0];
                let link = `https://signin.ea.com/p/web/emailVerification?code=${code}&email=${this.options.user.replace('@', '%40')}&locale=pl_PL`;
                return resolve(link);
              }
              break;
            }
            case "verify_mail_change_code": {
              if(message.body.indexOf('Your Code:<br><br>') > -1) {
                let code = message.body.split(`Your Code:<br><br>`)[1];
                code = code.split(`</b>`)[0];
                return resolve(code);
              }
              break;
            }
          }
        }
        reject();
      }
    });
  }
  get_message(id) {
    return new Promise((resolve, reject) => {
      const f = this.mail.seq.fetch(id, {
        bodies: '',
        struct: true
      });
      f.on('message', function(msg, seqno) {
        msg.on('body', function(stream, info) {
          let buffer = '';
          stream.on('data', function(chunk) {
            buffer += chunk.toString('utf8');
          });
          stream.once('end', function() {
            let headers_parsed = imap.parseHeader(buffer);

            resolve({
              headers_parsed: headers_parsed,
              body: buffer,
              from: headers_parsed['from'][0],
              date_unix: Math.floor(new Date(headers_parsed['date'][0])),
              subject: headers_parsed['subject'][0]
            });
          });
        });
      });
    });

  }
  get_latest_message_id() {
    return this.box.messages.total;
  }
}
