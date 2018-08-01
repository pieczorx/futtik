require('dotenv').config()
const fse = require('fs-extra');
const raven = require('raven');
raven.config('https://a9e956f1b16a4aef87de8d1160260e7c@sentry.io/1254138').install();
$(document).ready(() => {
  alert('xd');
  raven.captureException('test xdddd')
  $(document).on('submit', `form[name='addAccount']`, function() {
    const data = $(this).serializeJSON();
    addAccount(data)
    return false;
  });
});

const autoBuyer = new AutoBuyer();
const start = async () => {
  autoBuyer.init();
}

const addAccount = async (options) => {
  try {
    throw new Error('test erroru konta');
    const account = new Account(options);

    console.log('Logging in...');
    await account.login();
    console.log('Logged in');


    await account.getMassInfo();
    alert(account.coins);
  } catch(e) {
    raven.captureException(e);
    console.log('kurde mamy problemmo', e);
  }
}


class AccountStorage {
  constructor() {

  }
  addAccount() {

  }
}
