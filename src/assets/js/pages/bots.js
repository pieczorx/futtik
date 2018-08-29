class PageBots {
  constructor() {
    let that = this;

    this.tableAccounts = new Table({
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
          <button class="radius" data-role="showPopup" data-popup-name="addAccount"><i class="far fa-plus"></i> Add new account</button>
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
          let statusText = statuses[status];
          if(!power.state && status == 1) {
            statusText = 'Waiting for login...';
          }
          return `
          <div class="activeStatus l" data-status="${status}" data-role="toggleAccountState" data-account-id="${i}">
            <div class="dot l circle"></div>
            <div class="text l">${statusText}</div>
          </div>
          `
        }},
        {name: 'mail', title: 'Mail', format: row => row.options.mail},
        {name: 'platform', title: 'Platform', format: row => {return row.options.platform.toUpperCase();}},
        {name: 'coins', title: 'Coins', format: row => {return typeof(row.coins) != 'undefined' ? row.coins : '-';}}
      ]
    });

    $(document).on('submit', `form[name='addAccount']`, function() {
      const data = $(this).serializeJSON();
      autoBuyer.addAccount(data).then(() => {
        that.tableAccounts.update();
        popupAddAccount.hide();

      });
      return false;
    });

    autoBuyer.on('update', () => {
      this.tableAccounts.update();
    });

  }
  _load() {
    this.tableAccounts.update();
  }
}
