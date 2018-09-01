class Logger extends Emitter {
  constructor() {
    super();
    this.logs = [];
  }
  log(message, options) {
    this.logs[this.logs.length] = {
      message: message,
      options: options
    };
    if(options.account) {
      message = `[${options.account.options.mail}] ${message}`;
    }
    if(options.error) {
      console.error(message, options)
    } else {
      console.log(message, options);
    }
    this.emit('newLog', this.logs);
  }
  logAccount(message, account, options) {
    if(!options) {
      options = {};
    }
    options.account = account;
    this.log(message, options);
  }
}
