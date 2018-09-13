require('dotenv').config()

const CryptoJS = require("crypto-js");
const fse = require('fs-extra');
const fs = require('fs');
const { ipcRenderer } = require('electron');
const readFile = util.promisify(fs.readFile);
const zlib = require('zlib');
const csv = new CSV();
const settings = new Settings();
const checkbox = new Checkbox();
const logger = new Logger();
const smallMenu = new SmallMenu();
const memHeap = new MemHeap();
const pltfrm = new Platform();
const backup = new Backup();

const currentPlatform = () => {
  return pltfrm.current;
}
const database = new Database();
const funCaptcha = new FunCaptcha({
  onRequest: async () => {
    pages.captcha.updateCaptchas();
  }
});

//Disallow drag & drop
document.addEventListener('dragover', event => event.preventDefault())
document.addEventListener('drop', event => event.preventDefault())

//Save changes upon exit
let _saved = false;
ipcRenderer.on('quitReload', () => {
  window.location.reload();
})

window.onbeforeunload = (e) => {
  if(!_saved) {
    console.log('Saving all...');
    autoBuyer.saveAll().then(async () => {
      await settings.save();
      _saved = true;
      ipcRenderer.send('quitAppIfTriedToQuitBefore')
    });
    e.returnValue = false;
  }
};

const testFuncaptcha = async () => {
  console.log('Requested captcha answer');
  funCaptcha.requestCaptchaAnswer({
    imgUrl: 'assets/img/captchaTest.png'
  }).then(x => {
    console.log('fwhahaha, odpowiedz to', x);
  })
}
const power = new Power();
const autoBuyer = new AutoBuyer({
  captcha: funCaptcha
});
const menuCounter = new MenuCounter();

const pageHandler = new PagesHandler();
const a = new AsyncPages();


const pages = {
  bots: new PageBots(),
  captcha: new PageCaptcha(),
  players: new PagePlayers(),
  proxies: new PageProxies(),
  settingsGlobal: new PageSettings(),
  settingsPriceSteps: new PageSettingsPriceSteps()
}

Object.keys(pages).forEach(key => {
  pageHandler.add(key, pages[key]);
})





const start = async () => {
  $(`[data-role='openDeveloperTools']`).click(() => {
    ipcRenderer.send('openDeveloperTools')
  });


  await wait(100);

  $(`[data-popup='loadingInitial']`).attr('data-status', 1);
  await wait(1500);
  await settings.load();
  await autoBuyer.init();
  pltfrm.changePlatform(settings.get('lastPlatform') || 'xone');
  await a.go(settings.get('LAST_URL') || '/bots');

  menuCounter.init();
  await wait(1500);
  popupLoadingInitial.hide();
  backup.start();
  console.log('App started');


}

$(document).ready(start);

let currentPageFirstArg;
let timeoutClearPreviousPageContent;
let aBusy = false;

a.use(async (r, next) => {
  if(aBusy) {
    return;
  }
  aBusy = true;
  pageHandler.stop();
  $("body").attr('data-a-loading', 1)
  clearTimeout(timeoutClearPreviousPageContent);
  if(currentPageFirstArg != r.args[0]) {
    if(currentPageFirstArg) {
      r.removePreviousContentArg = r.args[0];
    }
    currentPageFirstArg = r.args[0]
    if($(`.s[data-name='${r.args[0]}']`).length == 0) {
      let content = await readFile(`${__dirname}/html/${currentPageFirstArg}.html`)
      content = `<div class="s" data-name="${currentPageFirstArg}" data-a-args="${currentPageFirstArg}">${content}</div>`
      $(".c").append(content);
    }
  }
  next();
});


a.get('/bots', async (r, next) => {
  await pageHandler.load('bots');
  next();
});

a.get('/captcha', async (r, next) => {
  await pageHandler.load('captcha');
  next();
});

a.get('/players', async (r, next) => {
  await pageHandler.load('players');
  next();
});
a.get('/players/*', async (r, next) => {
  await pageHandler.load('players');
  next();
});
a.get('/proxies', async (r, next) => {
  await pageHandler.load('proxies');
  next();
});
a.get('/settings', async (r, next) => {
  await pageHandler.load('settingsGlobal');
  next();
});
a.get('/settings/steps', async (r, next) => {
  await pageHandler.load('settingsPriceSteps');
  next();
});


a.use(async(r, next) => {
  listExpandable.update();
  await wait(200);
  listExpandable.update();
  $("body").attr('data-a-loading', 0)
  r.set_data_args();
  if(r.removePreviousContentArg) {
    timeoutClearPreviousPageContent = setTimeout(() => {
      $(".s").not(`[data-name='${r.removePreviousContentArg}']`).remove();
    }, 1000);
  }
  next();
})
a.use((r, next) => {
  settings.set('LAST_URL', '/' + r.args.slice(0, -1).join('/'))
  aBusy = false;
  next();
})
