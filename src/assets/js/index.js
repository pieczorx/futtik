require('dotenv').config()
const CryptoJS = require("crypto-js");
const fse = require('fs-extra');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);


const logger = new Logger();

//Add pages
const memHeap = new MemHeap();

const pltfrm = new Platform();
const currentPlatform = () => {
  return pltfrm.current;
}

const funCaptcha = new FunCaptcha({
  onRequest: async () => {
    pages.captcha.updateCaptchas();
    //pageCaptcha.requestCaptcha(imgUrl);
    //imgUrls.forEach(imgUrl => {

    //});
  }
});

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

  await wait(1500);
  popupLoadingInitial.hide();
  console.log('App started');
}

$(document).ready(start);

let currentPageFirstArg;
let timeoutClearPreviousPageContent;
a.use(async (r, next) => {
  clearTimeout(timeoutClearPreviousPageContent);
  if(currentPageFirstArg != r.args[0]) {
    if(currentPageFirstArg) {
      r.removePreviousContentArg = r.args[0];
    }
    currentPageFirstArg = r.args[0]
    if($(`.s[data-name='${r.args[0]}']`).length == 0) {
      let content = await readFile(`${__dirname}/html/${currentPageFirstArg}.html`)
      console.log('Loaded ' + currentPageFirstArg);
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
  await wait(15);
  r.set_data_args();
  if(r.removePreviousContentArg) {
    console.log('Remove pls ' + r.removePreviousContentArg);
    timeoutClearPreviousPageContent = setTimeout(() => {
      $(".s").not(`[data-name='${r.removePreviousContentArg}']`).remove();
    }, 1000);
  }
  next();
})
a.use((r, next) => {
  next();
})
