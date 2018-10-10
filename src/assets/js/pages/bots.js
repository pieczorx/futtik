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
        Fields.accountProfit,
        Fields.accountItemsBought,
        Fields.accountItemsSold,
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
      try {
        autoBuyer.addAccountValidate(data);
        autoBuyer.addAccount(data);
        popupAddAccount.hide();
      } catch(e) {
        alert(e.message);
      }

      //that.tableAccounts.update();


      /*
      let canAdd = true;
      console.log(data)
      let requiredValues = ['mail', 'password', 'answer', 'platform', 'authenticationMethod'];
      for(let key of requiredValues) {
        if(!data[key]) {
          canAdd = false;
          alert('Missing value: ' + key);
        }
      }

      if(canAdd) {
        for(let account of autoBuyer.accounts) {
          if(data.mail == account.options.mail) {
            canAdd = false;
            alert('Account with this mail was already added');
          }
        }
      }

      if(canAdd) {
        autoBuyer.addAccount(data).then(() => {
          that.tableAccounts.update();
          popupAddAccount.hide();

        });
      }*/

      return false;
    });

    $(document).on('change', `form[name='addAccount'] [name='authenticationMethod']`, function() {
      const val = $(this).val();
      $(`[data-role='addAccountAuthenticationMethodFieldsWrapper']`).hide();
      $(`[data-role='addAccountAuthenticationMethodFieldsWrapper'][data-value='${val}']`).show();

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
