require('dotenv').config()
const CryptoJS = require("crypto-js");
const fse = require('fs-extra');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);

//Add pages

const platform = new Platform();


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

  await pages.players.loadPlayers();

  platform.changePlatform('xone');

  await wait(1500);
  popupLoadingInitial.hide();
  console.log('App started');
}

$(document).ready(start);




a.use((r, next) => {
  r.set_data_args();
  next();
})


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

a.use((r, next) => {
  console.log('elo');
  next();
})
