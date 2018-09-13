class Settings {
  constructor() {
    this.settingsDefault = {
      AUTOBUYER_REQUEST_DELAY_MIN: 4 * 1000,
      AUTOBUYER_REQUEST_DELAY_MAX: 6 * 1000,

      LOGIN_DELAY: 5 * 1000,

      AUTOBUYER_TICK_INTERVAL: 1 * 1000,
      TRADEPILE_INTERVAL: 20 * 60 * 1000,
      UNASSIGNED_INTERVAL: 60 * 60 * 1000,
      PRICECHECK_INTERVAL: 30 * 60 * 1000,

      EA_COMMISSION: 5,

      MINIMUM_TABLE_ACCOUNTS_REFRESH_INTERVAL: 10000,

      PRICE_CHECK_CHEAPEST_ITEMS_QUANTITY: 3,
      PRICE_CHECK_PAGES: 5,
      AUTOMATIC_BACKUP_INTERVAL: 1000 * 60 * 10
    };
    this.settings = {};
  }

  set(name, value) {
    this.settings[name] = value;
  }

  get(name) {
    if(this.settings[name]) {
      return this.settings[name];
    }
    return this.getDefault(name);
  }

  getDefault(name) {
    return this.settingsDefault[name];
  }

  async save() {
    await fse.outputJson(CONFIG.PATH_SETTINGS, this.settings);
  }

  async load() {
    try {
      this.settings = await fse.readJson(CONFIG.PATH_SETTINGS);
    } catch(e) {

    }
  }


  get AUTOBUYER_REQUEST_DELAY() {
    return Utils.randomNumberInRange(this.get('AUTOBUYER_REQUEST_DELAY_MIN'), this.get('AUTOBUYER_REQUEST_DELAY_MAX'));
  }

  get LOGIN_DELAY() {
    return this.get('LOGIN_DELAY');
  }

  get TRADEPILE_INTERVAL() {
    return this.get('TRADEPILE_INTERVAL');
  }

  get UNASSIGNED_INTERVAL() {
    return this.get('UNASSIGNED_INTERVAL');
  }

  get EA_COMMISSION() {
    return this.get('EA_COMMISSION') / 100;
  }

  get AUTOBUYER_TICK_INTERVAL() {
    return this.get('AUTOBUYER_TICK_INTERVAL');
  }

  get PRICECHECK_INTERVAL() {
    return this.get('PRICECHECK_INTERVAL');
  }

  get MINIMUM_TABLE_ACCOUNTS_REFRESH_INTERVAL() {
    return this.get('MINIMUM_TABLE_ACCOUNTS_REFRESH_INTERVAL')
  }

  get PRICE_CHECK_PAGES() {
    return this.get('PRICE_CHECK_PAGES')
  }

  get PRICE_CHECK_CHEAPEST_ITEMS_QUANTITY() {
    return this.get('PRICE_CHECK_CHEAPEST_ITEMS_QUANTITY')
  }

  get AUTOMATIC_BACKUP_INTERVAL() {
    return this.get('AUTOMATIC_BACKUP_INTERVAL')
  }
}
