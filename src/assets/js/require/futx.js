const request = require('request');
const querystring = require('querystring');
const gotp = require('gotp');
class Account {
  constructor(data) {
    this.jar = request.jar();
    Object.assign(this, data);
    this.listeners = [];
    let platforms = {
      xone: 'FFA18XBO'
    }
    this.gameSku = platforms[this.platform];
  }

  login() {
    return new Promise(async (resolve, reject) => {
      console.log('========== Visit first page');
      await this.visitFirstPage();

      console.log('========== Get web app config');
      await this.getWebAppConfig();

      console.log('========== Get fid');
      await this.getFid();

      console.log('========== Get execution');
      await this.getExecution();

      console.log('========== Visit login page');
      await this.visitLoginPage();

      console.log('========== Log in for the first time');
      await this.firstLogin();


      if(this.twoStepEnabled) {
        console.log('========== Visit answer page');
        await this.visitAnswerPage();

        console.log('========== Request two factor code');
        await this.requestTwoFactorCode();

        console.log('========== Visit two factor page');
        await this.visitCodePage();

        console.log('========== Login with code');
        await this.loginWithCode();
      }

      console.log('========== Get access token');
      await this.getAccessToken();

      console.log('========== Get pids');
      await this.getPids();

      console.log('========== Get shards');
      await this.getShards();

      console.log('========== Get utas server');
      await this.getUtasServer();

      console.log('========== Get FOS server code');
      await this.getFosServerCode();

      console.log('========== Get UT SID');
      await this.getUtSid();

      console.log('========== Get security question');
      await this.getSecurityQuestion();

      console.log('========== Answer security question');
      await this.answerSecurityQuestion();
      resolve();
    });
  }



  async visitFirstPage() {
    const url = `https://www.easports.com/pl/fifa/ultimate-team/web-app/`;
    const data = await this.get(url);
    console.log(data);
  }
  async getWebAppConfig() {
    const url = `https://www.easports.com/pl/fifa/ultimate-team/web-app/config/config.json`;
    const data = await this.get(url, {
      json: true
    });
    console.log('Got web app config', data.body);
    this.webAppConfig = data.body;
    this.authUrl = this.webAppConfig.authURL;
  }
  async getFid() {
    const url = `https://accounts.ea.com/connect/auth?prompt=login&accessToken=null&client_id=FIFA-18-WEBCLIENT&response_type=token&display=web2/login&locale=en_US&redirect_uri=https://www.easports.com/pl/fifa/ultimate-team/web-app/auth.html&scope=basic.identity+offline+signin`;

    const data = await this.get(url, {
      follow: false
    });
    this.fid = data.res.headers.location.split('fid=')[1];
    this.urlGetExecution = data.res.headers.location;
    console.log('Got fid: ', this.fid);
    console.log('Got execution url', this.urlGetExecution);
  }
  async getExecution() {
    const data = await this.get(this.urlGetExecution, {
      follow: false
    });
    this.execution = (data.res.headers.location.split('execution=')[1]).split('&')[0];
    console.log('Got execution: ', this.execution);
  }
  async visitLoginPage() {
    const url = `https://signin.ea.com/p/web2/login?execution=${this.execution}&initref=https%3A%2F%2Faccounts.ea.com%3A443%2Fconnect%2Fauth%3Fprompt%3Dlogin%26accessToken%3Dnull%26client_id%3DFIFA-18-WEBCLIENT%26response_type%3Dtoken%26display%3Dweb2%252Flogin%26locale%3Den_US%26redirect_uri%3Dhttps%253A%252F%252Fwww.easports.com%252Fpl%252Ffifa%252Fultimate-team%252Fweb-app%252Fauth.html%26scope%3Dbasic.identity%2Boffline%2Bsignin`;
    const data = await this.get(url);
    console.log(data);
  }
  async firstLogin() {
    const url = `https://signin.ea.com/p/web2/login?execution=${this.execution}&initref=https%3A%2F%2Faccounts.ea.com%3A443%2Fconnect%2Fauth%3Fprompt%3Dlogin%26accessToken%3Dnull%26client_id%3DFIFA-18-WEBCLIENT%26response_type%3Dtoken%26display%3Dweb2%252Flogin%26locale%3Den_US%26redirect_uri%3Dhttps%253A%252F%252Fwww.easports.com%252Fpl%252Ffifa%252Fultimate-team%252Fweb-app%252Fauth.html%26scope%3Dbasic.identity%2Boffline%2Bsignin`;
    const data = await this.post(url, {
      form: {
        email: this.mail,
        password: this.password,
        country: 'PL',
        phoneNumber: '',
        passwordForPhone: '',
        _rememberMe: 'on',
        rememberMe: 'on',
        _eventId: 'submit',
        gCaptchaResponse: '',
        isPhoneNumberLogin: false,
        isIncompletePhone: ''
      },
      follow: false
    });

    //Check if two factor is enabled
    if(data.res.headers.location) {
      let newExecution = (data.res.headers.location.split('execution=')[1]).split('&')[0];
      this.twoStepEnabled = true;
      console.log('Two step is enabled but we dont know which one');
      if(newExecution == this.execution) {
        throw new Error('Invalid credentials');
      }
      this.execution = newExecution;
      console.log('Got new execution:', this.execution);
    } else {
      console.log('Two step is disabled');
    }
  }
  async visitAnswerPage() {
    const url = `https://signin.ea.com/p/web2/login?execution=${this.execution}&initref=https%3A%2F%2Faccounts.ea.com%3A443%2Fconnect%2Fauth%3Fprompt%3Dlogin%26accessToken%3Dnull%26client_id%3DFIFA-18-WEBCLIENT%26response_type%3Dtoken%26display%3Dweb2%252Flogin%26locale%3Den_US%26redirect_uri%3Dhttps%253A%252F%252Fwww.easports.com%252Fpl%252Ffifa%252Fultimate-team%252Fweb-app%252Fauth.html%26scope%3Dbasic.identity%2Boffline%2Bsignin&_eventId=end`;
    const data = await this.get(url, {follow: false});
    if(data.res.headers.location) {
      this.execution = (data.res.headers.location.split('execution=')[1]).split('&')[0];
      console.log('Got execution after visiting answer page:', this.execution);

      const url2 = `https://signin.ea.com/p/web2/login?execution=${this.execution}&initref=https%3A%2F%2Faccounts.ea.com%3A443%2Fconnect%2Fauth%3Fprompt%3Dlogin%26accessToken%3Dnull%26client_id%3DFIFA-18-WEBCLIENT%26response_type%3Dtoken%26display%3Dweb2%252Flogin%26locale%3Den_US%26redirect_uri%3Dhttps%253A%252F%252Fwww.easports.com%252Fpl%252Ffifa%252Fultimate-team%252Fweb-app%252Fauth.html%26scope%3Dbasic.identity%2Boffline%2Bsignin`;
      const data2 = await this.get(url2);
    } else {
      console.log('Visited answer page', data);
    }
  }
  async requestTwoFactorCode(resend) {
    const url = `https://signin.ea.com/p/web2/login?execution=${this.execution}&initref=https%3A%2F%2Faccounts.ea.com%3A443%2Fconnect%2Fauth%3Fprompt%3Dlogin%26accessToken%3Dnull%26client_id%3DFIFA-18-WEBCLIENT%26response_type%3Dtoken%26display%3Dweb2%252Flogin%26locale%3Den_US%26redirect_uri%3Dhttps%253A%252F%252Fwww.easports.com%252Fpl%252Ffifa%252Fultimate-team%252Fweb-app%252Fauth.html%26scope%3Dbasic.identity%2Boffline%2Bsignin`;
    const data  = await this.post(url, {
      form: {
        codeType: this.twoFactorToken ? 'APP' : 'EMAIL',
        _eventId: resend ? 'resend' : 'submit'
      },
      follow: false
    });
    this.execution = (data.res.headers.location.split('execution=')[1]).split('&')[0];
    console.log('Two factor code requested');
  }
  async visitCodePage() {
    await this.get(`https://signin.ea.com/p/web2/login?execution=${this.execution}&initref=https%3A%2F%2Faccounts.ea.com%3A443%2Fconnect%2Fauth%3Fprompt%3Dlogin%26accessToken%3Dnull%26client_id%3DFIFA-18-WEBCLIENT%26response_type%3Dtoken%26display%3Dweb2%252Flogin%26locale%3Den_US%26redirect_uri%3Dhttps%253A%252F%252Fwww.easports.com%252Fpl%252Ffifa%252Fultimate-team%252Fweb-app%252Fauth.html%26scope%3Dbasic.identity%2Boffline%2Bsignin`);
  }
  async loginWithCode() {
    let code = '';
    if(this.twoFactorToken) {
      console.log('Loggin in with 2 factor');
      code = gotp(this.twoFactorToken, 6, 30, Math.floor(Date.now() / 1000));
    } else {
      throw new Error('Loggin in with mail is not ready yet');
    }
    const url = `https://signin.ea.com/p/web2/login?execution=${this.execution}&initref=https%3A%2F%2Faccounts.ea.com%3A443%2Fconnect%2Fauth%3Fprompt%3Dlogin%26accessToken%3Dnull%26client_id%3DFIFA-18-WEBCLIENT%26response_type%3Dtoken%26display%3Dweb2%252Flogin%26locale%3Den_US%26redirect_uri%3Dhttps%253A%252F%252Fwww.easports.com%252Fpl%252Ffifa%252Fultimate-team%252Fweb-app%252Fauth.html%26scope%3Dbasic.identity%2Boffline%2Bsignin`;
    await this.post(url, {
      form: {
        oneTimeCode: code,
        _trustThisDevice: 'on',
        trustThisDevice: 'on',
        _eventId: 'submit'
      },
      follow: false
    });
  }
  async getAccessToken() {
    const url = `https://accounts.ea.com/connect/auth?prompt=login&accessToken=null&client_id=FIFA-18-WEBCLIENT&response_type=token&display=web2%2Flogin&locale=en_US&redirect_uri=https%3A%2F%2Fwww.easports.com%2Fpl%2Ffifa%2Fultimate-team%2Fweb-app%2Fauth.html&scope=basic.identity+offline+signin&fid=${this.fid}`;
    const data = await this.get(url, {
      follow: false
    });
    this.accessToken = (data.res.headers.location.split('access_token=')[1]).split('&')[0];
    console.log('Got access token', this.accessToken);
    //2do
    //https://www.easports.com/pl/fifa/ultimate-team/web-app/auth.html#access_token=QVQwOjEuMDozLjA6NjA6ZmlnTml3azJRcTZnakNnMzZoZDdYbWVnOFZhZm1uMGh0MWY6NjgzNDM6b2IyN3U&token_type=Bearer&expires_in=3599
    //this.authorizationTokenExpiresAt =
  }
  async getPids() {
    const url = `https://gateway.ea.com/proxy/identity/pids/me`;
    const data = await this.get(url, {
      json: true,
      headers: {
        'Accept': '*/*'
      }
    });
    this.pids = data.body.pid;
    this.nucleusId = this.pids.externalRefValue;
  }
  async getShards() {
    const url = `https://${this.authUrl}/ut/shards/v2`;
    const data = await this.get(url, {
      json: true
    });
    console.log('Shards: ', data);
    this.shards = data.body.shardInfo;
  }

  async getUtasServer() {
    let finalShard;
    let finalData;
    for(let i = 0; i < this.shards.length; i++) {
      let shard = this.shards[i];
      let shardUrl = `${shard.clientProtocol}://${shard.clientFacingIpPort}/ut/game/fifa18/user/accountinfo?filterConsoleLogin=true&sku=FUT18WEB&returningUserGameYear=2017`;
      try {
        let data = await this.get(shardUrl, {
          json: true
        });
        finalShard = shard;
        finalData = data;
        break;
      } catch(e) {
        console.log(`Shard ${shard.clientFacingIpPort} doesn't work, it should be ok`);
      }
    }
    if(!finalShard) {
      throw new Error('No working shards');
    }
    this.utas = `${finalShard.clientProtocol}://${finalShard.clientFacingIpPort}`;
    this.persona = finalData.body.userAccountInfo.personas[0];
  }

  async getFosServerCode() {
    const url = `https://accounts.ea.com/connect/auth?client_id=FOS-SERVER&redirect_uri=nucleus:rest&response_type=code&access_token=${this.accessToken}`;
    const data = await this.get(url, {
      json: true
    });
    this.fosCode = data.body.code;
  }

  async getUtSid() {
    const url = `${this.utas}/ut/auth?sku_b=FFT18`;
    const data = await this.post(url, {
      form: {
        clientVersion: 1,
        gameSku: this.gameSku,
        identification: {
          authCode: this.fosCode,
          redirectUrl: 'nucleus:rest'
        },
        isReadOnly: false,
        locale: 'en-US',
        method: 'authcode',
        nucleusPersonaId: this.persona.personaId,
        priorityLevel: 4,
        sku: 'FUT18WEB'
      },
      json: true,
      sendJson: true
    });
    this.utSid = data.body.sid;
    this.utas = `${data.body.protocol}://${data.body.ipPort}`;
  }

  async getSecurityQuestion() {
    const url = `${this.utas}/ut/game/fifa18/phishing/question`;
    const data = await this.get(url, {
      json: true
    });
    console.log('Got security question info', data.body);

  }

  async answerSecurityQuestion() {
    const answerHashed = eaHasher(this.answer);
    console.log('answerHashed', answerHashed);
    const url = `${this.utas}/ut/game/fifa18/phishing/validate?answer=${answerHashed}`;
    const data = await this.post(url, {
      form: answerHashed,
      json: true
    });
    if(data.body.code != 200) {
      throw new Error('Could not answer question');
    }
    this.phishingToken = data.body.token;
    console.log('secret hash data', data);
  }

  async getMassInfo() {
    const url = `${this.utas}/ut/game/fifa18/usermassinfo`
    const data = await this.get(url, {
      json: true
    });
    console.log('Fetched mass info', data);
    this.massInfo = data.body;
    this.massInfo.userInfo.currencies.forEach(currency => {
      if(currency.name == 'COINS') {
        this.coins = currency.finalFunds;
      }
    });
  }





  get(url, options) {
    if(!options) {
      options = {};
    }
    options.method = 'GET';
    return this.request(url, options);
  }
  post(url, options) {
    if(!options) {
      options = {};
    }
    options.method = 'POST';
    return this.request(url, options);
  }
  request(url, options) {
    if(!options) {
      options = {};
    }
    let that = this;
    return new Promise((resolve, reject) => {
      //Default settings
      let form = options.form || {};
      let follow = typeof(options.follow) !== 'undefined' ? options.follow : true;
      let method = options.method || 'POST';
      let body = '';
      let headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36'
      };

      //Send json or querystring
      if(options.form) {
        if(options.sendJson) {
    			body = JSON.stringify(form);
    		} else {
    			body = querystring.stringify(form);
          headers['Content-Type'] = 'application/x-www-form-urlencoded';
    		}
      }

      //Send bearer if defined
      if(this.accessToken && options.useAccessToken !== false) {
        headers['Authorization'] = `Bearer ${this.accessToken}`;
      }

      //Send EASW Nucleus
      if(this.nucleusId) {
        headers['Easw-Session-Data-Nucleus-Id'] = this.nucleusId;
      }

      //Send UT SID
      if(this.utSid) {
        headers['X-UT-SID'] = this.utSid;
      }

      //Use phishing token
      if(this.phishingToken) {
        headers['X-UT-PHISHING-TOKEN'] = this.phishingToken;
      }

      //Use csrf token
      if(this.csrf) {
        headers['X-CSRF-TOKEN'] = this.csrf;
      }


      //Add other headers
      if(options.headers) {
        Object.assign(headers, options.headers);
      }

      let request_options = {
        headers: headers,
        uri: url,
        body: body,
        method: method,
        followRedirect: follow,
        jar: this.jar,
      };

      if(process.env.FIDDLER == 1) {
        request_options.rejectUnauthorized = false;
      }
      if(options.replace_spaces_with_pluses_in_form) {
        request_options.body = request_options.body.replaceAll('%20', '+');
      }
      //console.log(request_options);

      //Set proxy for debugging purposes
      if(process.env.FIDDLER == 1) {
        request_options.proxy = 'http://127.0.0.1:8888'
        //console.log('Use fiddler my friend');
      } else {
        if(this.proxy) {
          //console.log('Use proxy my friend');
          if(this.proxy_user) {
            request_options.proxy = `http://${this.proxy_user}:${this.proxy_password}@${this.proxy}`;
          } else {
            request_options.proxy = `http://${this.proxy}`;
          }
        } else {
          //console.log(`Dont use proxy my friend`);
        }
      }
      if((options.unzip || url.indexOf('/cp-ui/') > -1) && process.env.FIDDLER != 1) {
        request_options.encoding = null;
      }

      //Make request
      request(request_options, async function(err, res, body) {
        if(!err) {
          if((options.unzip || url.indexOf('/cp-ui/') > -1) && process.env.FIDDLER != 1) {
            try {
              body = await that.unzip_body(body);
            } catch(e) {
              body = body.toString();
            }
          }
          if(options.json) {
            try {
              body = JSON.parse(body);
            } catch(e) {
              return reject(e);
            }
          }
          resolve({res: res, body: body});
        } else {
          reject(err);
        }
      });
    });
  }

}