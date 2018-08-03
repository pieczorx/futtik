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

  //  await fse.readJson();
  }

  async saveAccounts() {
    console.log('save accounts', this.accounts);
  }
}
