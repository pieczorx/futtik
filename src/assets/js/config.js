let CONFIG = {};

//App data depending on platform
if(process.platform == "darwin"){
  CONFIG.DIR_APPDATA = `${process.env.HOME}/Library/Application Support/`;
} else {
  CONFIG.DIR_APPDATA = process.env.APPDATA.replace(/\\/g,"/");
}

const isDev = () => {
  return process.mainModule.filename.indexOf('app.asar') === -1;
}

//Futtik url
if(isDev()) {
  CONFIG.URL = 'http://localhost:8765';
} else {
  CONFIG.URL = 'http://159.89.39.224';
}


//Main data directory
CONFIG.DIR_DATA = `${CONFIG.DIR_APPDATA}/Futtik/data`;

//Path to account cookies etc
CONFIG.PATH_ACCOUNTS = `${CONFIG.DIR_DATA}/accounts.json`;

//Path to players
CONFIG.PATH_PLAYERS = `${CONFIG.DIR_DATA}/players.json`;

//Path to proxies
CONFIG.PATH_PROXIES = `${CONFIG.DIR_DATA}/proxies.json`;

//Path to settings
CONFIG.PATH_SETTINGS = `${CONFIG.DIR_DATA}/settings.json`;

//Path to price steps
CONFIG.PATH_PRICE_STEPS = `${CONFIG.DIR_DATA}/priceSteps.json`;

//Official fifa database url
CONFIG.URL_DATABASE = "https://www.easports.com/fifa/ultimate-team/api/fut/item?jsonParamObject=%7B%22page%22:%d,%22position%22:%22LF,CF,RF,ST,LW,LM,CAM,CDM,CM,RM,RW,LWB,LB,CB,RB,GK,RWB%22%7D";

//Players per page in tables
CONFIG.TABLE_PLAYERS_PER_PAGE = 50;

//Transfermarket search limit per page
CONFIG.TRANSFERMARKET_LIMIT = 36;

//AutoBuyer tick amount
//CONFIG.AUTOBUYER_TICK = 1000;

//AutoBuyer reqest delay
//CONFIG.AUTOBUYER_REQUEST_DELAY = 5000;

//How much delay should be between two login requests [ms]
//CONFIG.ACCOUNT_LOGIN_DELAY = 5000;



//Price check interval [ms]
//CONFIG.PRICE_CHECK_INTERVAL = 30 * 60 * 1000;

//Price check pages
//CONFIG.PRICE_CHECK_PAGES = 5;

//Price check cheapest items quantity
//CONFIG.PRICE_CHECK_CHEAPEST_ITEMS_QUANTITY = 3;


//Buy & sell percentage
//CONFIG.AUTOBUYER_BUY_FACTOR = 89/100;
//CONFIG.AUTOBUYER_SELL_FACTOR = 99/100;

//Tradepile check interval [ms]
//CONFIG.TRADEPILE_CHECK_INTERVAL = 10 * 60 * 1000;

//EA Commission
//CONFIG.EA_COMMISSION = 0.05;

//Unassigned check interval [ms]
//CONFIG.UNASSIGNED_CHECK_INTERVAL = 60 * 60 * 1000;
