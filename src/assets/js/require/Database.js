class Database extends Emitter {
  constructor() {
    super();
    this.proxies = [];
    this.priceSteps = {};
  }

  async loadAll() {
    await Promise.all([
      this.loadProxies(),
      this.loadPriceSteps()
    ]);
  }

  async saveAll() {
    await Promise.all([
      this.saveProxies(),
      this.savePriceSteps()
    ]);
  }

  //Proxies
  async loadProxies() {
    try {
      this.proxies = await fse.readJson(CONFIG.PATH_PROXIES);
      this.emit('proxiesUpdate');
    } catch(e) {}
    this.proxiesLoaded = true;
  }
  async saveProxies() {
    if(!this.proxiesLoaded) {
      return;
    }
    await fse.outputJson(CONFIG.PATH_PROXIES, this.proxies);
  }

  //Price Steps

  async loadPriceSteps() {
    try {
      this.priceSteps = await fse.readJson(CONFIG.PATH_PRICE_STEPS);
      this.emit('priceStepsUpdate');
    } catch(e) {}
    for(let platform of pltfrm.list) {
      if(!this.priceSteps[platform]) {
        this.priceSteps[platform] = [];
      }
    }
    this.priceStepsLoaded = true;
  }
  async savePriceSteps() {
    if(!this.priceStepsLoaded) {
      return;
    }
    await fse.outputJson(CONFIG.PATH_PRICE_STEPS, this.priceSteps);
  }
}
