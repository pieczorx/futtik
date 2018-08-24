require('dotenv').config()

const fse = require('fs-extra');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);

const autoBuyer = new AutoBuyer();


const xd = async () => {
  const esprima = require('esprima');
  const escodegen = require('escodegen');
  const program = await readFile('deobFile.js', 'utf8');

  let nodes = esprima.parseScript(program);


  console.log('nudeski', nodes);

  loopThroughNodes(nodes.body, node => {
    editSingleNode(node);
  });

  const finalProgram = escodegen.generate(nodes);

  fse.outputFile('deobFileOutput.js', finalProgram);
}

const loopThroughNodes = (nodes, fn) => {
  console.log(nodes.length, nodes);

  nodes.forEach(node => {
    fn(node);
    if(!node.body) {
      return;
    }

    if(Array.isArray(node.body)) {
      return loopThroughNodes(node.body, fn);
    }

    if(Array.isArray(node.body.body)) {
      return loopThroughNodes(node.body.body, fn);
    }

    if(Array.isArray(node.body.body)) {

    }
  });
}

const editSingleNode = (node) => {
  if(node.type == "VariableDeclaration") {
    node.declarations.forEach(declaration => {
      if(declaration.init && declaration.init.type == 'Literal') {
        declaration.init.value = declaration.init.raw = 'XD';
      }
    });
  }
}

const isVar = (node) => {

}




$(document).on('input', `input`, async function() {
  const v1 = $(`[data-role='test1']`).val();
  const v2 = $(`[data-role='test2']`).val();



  const CryptoJS = require("crypto-js");

  v3 = await fse.readJson('analyze/image.json');

  console.log(v3)
  v3 = JSON.stringify(v3)
  console.log(v3)

  const CryptoJSAesJson = {
    stringify: function (cipherParams) {
    	var j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
    	if (cipherParams.iv) j.iv = cipherParams.iv.toString();
    	if (cipherParams.salt) j.s = cipherParams.salt.toString();
    	return JSON.stringify(j);
    },
    parse: function (jsonStr) {
    	var j = JSON.parse(jsonStr);
    	var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)});
    	if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
    	if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
    	return cipherParams;
    }
  }
  v3
  const decryptionKey = '2695b7fb43bb1bdf1.4566348805';

  v3 = CryptoJS.AES.decrypt(v3 , decryptionKey, {format: CryptoJSAesJson})
  v3 = v3.toString(CryptoJS.enc.Base64);
  v3 = atob(v3)
  v3 = btoa(v3)
  v3 = "data:image/jpeg;base64," + v3;

  $(`[data-role='test3']`).prop('src', v3)
});


const start = async () => {

  await funCaptcha.trigger({
    publicKey: `A4EECF77-AC87-8C8D-5754-BF882F72063B`,
    siteUrl: 'https://www.easports.com'
  });

  return;
  //console.log('elo');
  //await xd();
  //return;


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
