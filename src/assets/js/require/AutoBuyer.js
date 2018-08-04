class AutoBuyer {
  constructor() {
    this.accounts = [];
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
    } catch(e) {
      
    }
  }

  async saveAccounts() {
    await fse.outputJson(CONFIG.PATH_ACCOUNTS, this.accounts);
    console.log('save accounts', this.accounts);
  }
}
