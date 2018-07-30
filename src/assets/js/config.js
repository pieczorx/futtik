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
