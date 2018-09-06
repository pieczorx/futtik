require('dotenv').config()

const CryptoJS = require("crypto-js");
const fse = require('fs-extra');
const fs = require('fs');
const { ipcRenderer } = require('electron');
const readFile = util.promisify(fs.readFile);


const checkbox = new Checkbox();
const logger = new Logger();
const smallMenu = new SmallMenu();
const memHeap = new MemHeap();
const pltfrm = new Platform();
const currentPlatform = () => {
  return pltfrm.current;
}

const funCaptcha = new FunCaptcha({
  onRequest: async () => {
    pages.captcha.updateCaptchas();
  }
});

//Save changes upon exit
let _saved = false;
window.onbeforeunload = (e) => {
  if(!_saved) {
    autoBuyer.saveAll().then(() => {
      _saved = true;
      ipcRenderer.send('quitApp')
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
  players: new PagePlayers()
}

Object.keys(pages).forEach(key => {
  pageHandler.add(key, pages[key]);
})





const start = async () => {
  await wait(100);

  $(`[data-popup='loadingInitial']`).attr('data-status', 1);
  await wait(1500);
  await autoBuyer.init();
  await a.go('/bots');

  pltfrm.changePlatform('xone');
  menuCounter.init();
  await wait(1500);
  popupLoadingInitial.hide();
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
a.use(async(r, next) => {
  await wait(200);
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
  aBusy = false;
  next();
})
