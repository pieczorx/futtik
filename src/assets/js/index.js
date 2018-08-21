require('dotenv').config()
const fse = require('fs-extra');

const autoBuyer = new AutoBuyer();


const start = async () => {

  await wait(100);

  $(`[data-popup='loadingInitial']`).attr('data-status', 1);
  await wait(1500);
  a.go('/bots');
  autoBuyer.on('update', () => {
    tableAccounts.update();
  });
  await autoBuyer.init();
  tableAccounts.update();
  await pagePlayers.loadPlayers();
  pagePlayers._load();
  await wait(1500);
  popupLoadingInitial.hide();
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
    return {
      rows: autoBuyer.accounts,
      paging: {
        previous: false,
        next: false
      }
    }
  },
  name: 'accounts',
  htmlEmpty: `
  <div class="empty w100 center">
    <div class="middle">
      <div class="w100">No account added yet</div>
      <button class="radius" data-role="showPopup" data-popup-name="addAccount">Add new account</button>
    </div>
  </div>
  `,
  fields: [
    {name: 'enabled', title: 'Enabled?', format: (row, i) => {
      console.log('dodajemy z takim i', i);
      let statuses = ['Disabled', 'Logging in...', 'Logged']
      let status = 0;
      if(row.enabled) {
        status = 1;
        if(row.logged) {
          status = 2;
        }
      }
      return `
      <div class="activeStatus l" data-status="${status}" data-role="toggleAccountState" data-account-id="${i}">
        <div class="dot l circle"></div>
        <div class="text l">${statuses[status]}</div>
      </div>
      `
    }},
    {name: 'mail', title: 'Mail', format: row => row.options.mail},
    {name: 'platform', title: 'Platform', format: row => {return row.options.platform;}},
    {name: 'coins', title: 'Coins', format: row => {return typeof(row.coins) != 'undefined' ? row.coins : '?';}}
  ]
});



const a = new AsyncPages();

a.use((r, next) => {
  r.set_data_args();
})





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
