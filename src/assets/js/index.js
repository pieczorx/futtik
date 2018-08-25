require('dotenv').config()

const fse = require('fs-extra');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);

const autoBuyer = new AutoBuyer();
const pageHandler = new PagesHandler();
const a = new AsyncPages();

//Add pages
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
  await a.go('/bots');
  await autoBuyer.init();

  await pages.players.loadPlayers();

  await wait(1500);
  popupLoadingInitial.hide();
  console.log('App started');
}

$(document).ready(start);




a.use((r, next) => {
  r.set_data_args();
  next();
})


a.get('/accounts', async (r, next) => {
  await pageHandler.load('accounts');
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
