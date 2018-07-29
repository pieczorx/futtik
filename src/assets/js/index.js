require('dotenv').config()

$(document).ready(() => {
  $(document).on('click', `[data-role='test1']`, function() {
    addAccount();
  });
  $(document).on('submit', `form`, function() {
    try {
      const data = $(this).serializeJSON();
      console.log('submit', data);

    } catch(e) {
      console.log('errorek xD', e);
    }
    return false;
  });
});

const addAccount = async () => {
  try {
    const options = {
      mail: 'zpmzhc@cxxz.pl',
      password: 'toHFIgPoH4',
      answer: 'aaaa',
      twoFactorToken: 'ajbcy2dyhomge4za',
      platform: 'xone'
    };
    const account = new Account(options);

    console.log('Logging in...');
    await account.login();
    console.log('Logged in');


    await account.getMassInfo();
    alert(account.coins);
  } catch(e) {
    console.log('kurde mamy problemmo', e);
  }
}
