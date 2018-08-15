class AutoBuyer {
  constructor() {
    this.accounts = [];
    this.instances = [];
    this.listeners = [];

    let that = this;
    $(document).on('click', `[data-role='toggleAccountState']`, function() {
      const id = $(this).attr('data-account-id');
      that.toggleAccountState(id);
    });

    this.work();
  }

  work() {
    clearTimeout(this.timeoutWork);
    console.log('workin...');
    for(let i = 0; i < this.accounts.length; i++) {
      this.workSingle(i);
    }
    this.timeoutWork = setTimeout(() => {
      this.work();
    }, CONFIG.AUTOBUYER_TICK);
  }

  toggleAccountState(id) {
    this.accounts[id].enabled = !this.accounts[id].enabled;
    this.emit('update');
  }

  workSingle(id) {
    //Check if account is not busy
    if(this.accounts[id].busy) {
      console.log('bizi');
      return;
    }

    //Check if instance was added
    if(!this.instances[id]) {
      this.addInstance(id);
    }

    //Check if account is logged
    if(this.accounts[id].enabled && !this.accounts[id].logged) {
      return this.login(id);
    }
  }

  addInstance(id) {
    console.log('add instance', id);
    this.instances[id] = new Account(this.accounts[id].options);
  }

  async login(id) {
    console.log('login to acc', id);
    this.busy(id);
    try {
      await this.instances[id].login();
      this.accounts[id].logged = true;
      console.log('logged in', id);
      this.emit('update');

      await this.instances[id].getMassInfo();
      this.accounts[id].coins = this.instances[id].coins;
      this.emit('update');
      console.log('Got money', this.accounts[id].coins);
    } catch(e) {
      console.log('Error with login', id, e);
    }
  }

  busy(id) {
    this.accounts[id].busy = true;
  }

  async free(id) {
    await wait(CONFIG.AUTOBUYER_REQUEST_DELAY);
    this.accounts[id].busy = false;
  }

  init() {
    return new Promise(async (resolve, reject) => {
      await this.loadAccounts();
      resolve();
    });
  }

  addAccount(options) {
    return new Promise(async (resolve, reject) => {
      this.accounts.push({
        options: options,
        enabled: true
      });
      await this.saveAccounts();
      resolve();
    });


  }

  async loadAccounts() {
    try {
      this.accounts = await fse.readJson(CONFIG.PATH_ACCOUNTS);
      for(let i = 0; i < this.accounts.length; i++) {
        this.accounts[i].enabled = false;
        this.accounts[i].busy = false;
      }
    } catch(e) {

    }
  }

  async saveAccounts() {
    await fse.outputJson(CONFIG.PATH_ACCOUNTS, this.accounts);
    console.log('save accounts', this.accounts);
  }

  emit(type, data) {
    this.listeners.forEach(listener => {
      if(listener.type == type) {
        listener.f(data);
      }
    });
  }
  on(type, f) {
    this.listeners.push({
      type,
      f
    })
  }
}
