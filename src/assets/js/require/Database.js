class Database extends Emitter {
  constructor() {
    super();
    this.proxies = [];
  }

  async loadAll() {
    await Promise.all([
      this.loadProxies()
    ]);
  }

  async saveAll() {
    await Promise.all([
      this.saveProxies()
    ]);
  }

  //Proxies
  async loadProxies() {
    this.proxies = await fse.readJson(CONFIG.PATH_PROXIES);
    this.proxiesLoaded = true;
    this.emit('proxiesUpdate');
  }
  async saveProxies() {
    if(!this.proxiesLoaded) {
      return;
    }
    await fse.outputJson(CONFIG.PATH_PROXIES, this.proxies);
  }
}
