let CONFIG = {};

//App data depending on platform
if(process.platform == "darwin"){
  CONFIG.DIR_APPDATA = `${process.env.HOME}/Library/Application Support/`;
} else {
  CONFIG.DIR_APPDATA = process.env.APPDATA.replace(/\\/g,"/");
}

//Main data directory
CONFIG.DIR_DATA = `${CONFIG.DIR_APPDATA}/Futtik`;

//Path to account cookies etc
CONFIG.PATH_ACCOUNTS = `${CONFIG.DIR_DATA}/accounts.json`;

//Path to players
CONFIG.PATH_PLAYERS = `${CONFIG.DIR_DATA}/players.json`;

//AutoBuyer tick amount
CONFIG.AUTOBUYER_TICK = 2000;

//AutoBuyer reqest delay
CONFIG.AUTOBUYER_REQUEST_DELAY = 5000;

//Official fifa database url
CONFIG.URL_DATABASE = "https://www.easports.com/fifa/ultimate-team/api/fut/item?jsonParamObject=%7B%22page%22:%d,%22position%22:%22LF,CF,RF,ST,LW,LM,CAM,CDM,CM,RM,RW,LWB,LB,CB,RB,GK,RWB%22%7D";
//CONFIG.URL_DATABASE = "https://www.easports.com/fifa/ultimate-team/api/fut/item?jsonParamObject=%7B%22page%22:%d,%22position%22:%22LF,CF%22%7D"

CONFIG.URL_PLAYER_AVATAR_SMALL = "https://fifa17.content.easports.com/fifa/fltOnlineAssets/B1BA185F-AD7C-4128-8A64-746DE4EC5A82/2018/fut/items/images/players/html5/40x40/%d.png";

//How much delay should be between two login requests [ms]
CONFIG.ACCOUNT_LOGIN_DELAY = 5000;

//Players per page in tables
CONFIG.TABLE_PLAYERS_PER_PAGE = 50;

//Price check interval [ms]
CONFIG.PRICE_CHECK_INTERVAL = 5 * 60 * 1000;

//Price check pages
CONFIG.PRICE_CHECK_PAGES = 5;

//Price check cheapest items quantity
CONFIG.PRICE_CHECK_CHEAPEST_ITEMS_QUANTITY = 5;

//Transfermarket search limit per page
CONFIG.TRANSFERMARKET_LIMIT = 36;

//Buy & sell percentage
CONFIG.AUTOBUYER_BUY_FACTOR = 9/10;
CONFIG.AUTOBUYER_SELL_FACTOR = 11/10;
