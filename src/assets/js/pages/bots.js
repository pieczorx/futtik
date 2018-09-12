class PageBots {
  constructor() {
    let that = this;

    this.tableAccounts = new Table({
      getData: () => {
        return tableConverter.convert({
          rows: autoBuyer.accounts,
          filters: this.tableAccounts.filters,
          fields: this.tableAccounts.fields
        })
      },
      onFilterChange: () => {
        this.tableAccounts.update();
      },
      name: 'accounts',
      htmlEmpty: `
      <div class="w100">No account added yet</div>
      <button class="radius" data-role="showPopup" data-popup-name="addAccount"><i class="far fa-plus"></i> Add new account</button>
      `,
      getId: (row) => {return row.options.mail;},
      fields: [
        Fields.accountEnabledState,
        Fields.accountBuyState,
        Fields.accountMail,
        Fields.accountTradepile,
        Fields.accountPlatform,
        Fields.accountCoins,
        Fields.accountCoinsWithActiveAuctions,
        Fields.accountProxy,
        Fields.accountUtasRequestCount,
        Fields.accountMessage
      ],
      actions: {
        buyState: (id, state) => {
          const account = autoBuyer.getAccountFromId(id);
          autoBuyer.toggleAccountBuyState(account, state);
        },
        enabledState: (id, state) => {
          const account = autoBuyer.getAccountFromId(id);
          autoBuyer.toggleAccountState(account, state);
        }
      }
    });

    $(document).on('submit', `form[name='addAccount']`, function() {
      const data = $(this).serializeJSON();
      let canAdd = true;
      console.log(data)
      let requiredValues = ['mail', 'password', 'answer', 'platform', 'twoFactorToken'];
      for(let key of requiredValues) {
        if(!data[key]) {
          canAdd = false;
          alert('Missing value: ' + key);
        }
      }
      if(canAdd) {
        autoBuyer.addAccount(data).then(() => {
          that.tableAccounts.update();
          popupAddAccount.hide();

        });
      }
      return false;
    });

    autoBuyer.on('accountUpdate', () => {
      if(this.lastTablesUpdateDate && (new Date() - this.lastTablesUpdateDate) < settings.MINIMUM_TABLE_ACCOUNTS_REFRESH_INTERVAL) {
        return;
      }
      if(!this.active) {
        return;
      }
      this.lastTablesUpdateDate = new Date();
      this.tableAccounts.update();
    });
    power.on('update', () => {
      this.tableAccounts.update();
    })

  }
  _load() {
    this.active = true;
    this.tableAccounts.update();
  }
  _stop() {
    this.active = false;
  }
}
