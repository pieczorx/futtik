require('dotenv').config()

const fse = require('fs-extra');


$(document).ready(() => {
  console.log('niby wyslalo');
  raven.captureException(new Error('Sth went wronk'));
  $(document).on('submit', `form[name='addAccount']`, function() {
    const data = $(this).serializeJSON();
    addAccount(data)
    return false;
  });
});

//const autoBuyer = new AutoBuyer();
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
