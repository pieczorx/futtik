require('dotenv').config()
const fse = require('fs-extra');

const autoBuyer = new AutoBuyer();


const start = async () => {
  await autoBuyer.init();
  tableAccounts.update();
  console.log('App started');
}



$(document).ready(() => {
  $(document).on('submit', `form[name='addAccount']`, function() {
    const data = $(this).serializeJSON();
    autoBuyer.addAccount(data).then(() => {
      tableAccounts.update();
      popupAddAccount.hide();

    });
    return false;
  });
  start();
});

let tableAccounts = new Table({
    getData: () => {
      return autoBuyer.accounts;
    },
    name: 'accounts',
    empty: `
    <div class="empty w100 center">
      <div class="middle">
        <div class="w100">No account added yet</div>
        <button class="radius" data-role="showPopup" data-popup-name="addAccount">Add new account</button>
      </div>
    </div>

    `,
    fields: [
      {name: 'enabled', title: 'Enabled?', format: row => {return row.options.enabled ? 'yes' : 'no';}},
      {name: 'mail', title: 'Mail', format: row => row.options.mail},
      {name: 'platform', title: 'Platform', format: row => {return row.options.platform;}},
      {name: 'coins', title: 'Coins', format: row => {return typeof(row.coins) != 'undefined' ? row.coins : '?';}}
    ]
});





/*
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
*/
