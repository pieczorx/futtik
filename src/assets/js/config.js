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

//AutoBuyer tick amount
CONFIG.AUTOBUYER_TICK = 1000;

//AutoBuyer reqest delay
CONFIG.AUTOBUYER_REQUEST_DELAY = 5000;

//Official fifa database url
CONFIG.URL_DATABASE = "https://www.easports.com/fifa/ultimate-team/api/fut/item?jsonParamObject=%7B%22page%22:%d,%22position%22:%22LF,CF,RF,ST,LW,LM,CAM,CDM,CM,RM,RW,LWB,LB,CB,RB,GK,RWB%22%7D";
CONFIG.URL_DATABASE = "https://www.easports.com/fifa/ultimate-team/api/fut/item?jsonParamObject=%7B%22page%22:%d,%22position%22:%22LF,CF%22%7D"
