class PageProxies {
  constructor() {
    let that = this;
    this.table = new Table({
      name: 'proxies',
      getData: () => {
        return tableConverter.convert({
          rows: database.proxies,
          filters: this.table.filters,
          fields: this.table.fields
        })
      },
      onFilterChange: () => {
        this.table.update();
      },
      htmlEmpty: `
      <div class="w100">You didn't add any proxy yet.</div>
      <div class="w100"><button type="submit" class="inline radius" data-role="assignProxiesToAllAccounts">Add proxy</button></div>
      `,
      fields: [
        {
          title: 'IP',
          name: 'ip'
        },
        {
          title: 'Port',
          name: 'port'
        },
        {
          title: 'Username',
          name: 'username'
        },
        {
          title: 'Password',
          name: 'password'
        },
        {
          title: 'Local',
          name: 'isLocal',
          format: (row) => {
            return row.isLocal ? 'Yes' : 'No';
          }
        },
        {
          title: 'Account quantity',
          name: 'accountQuantity',
          format: (row) => {
            return autoBuyer.accounts.filter(account => {return account.proxy ? account.proxy.ip === row.ip : false;}).length;
          }
        }
      ]
    });

    database.on('update:proxies', () => {
      this.table.update();
    })

    $(document).on('click', `[data-role='assignProxiesToAllAccounts']`, () => {
      autoBuyer.assignProxiesToAllAccounts();
    });
    $(document).on('submit', `form[name='addProxy']`, function() {
      const data = $(this).serializeJSON();
      data.isLocal = data.isLocal == 1 ? true : false;
      let canAdd = true;
      let requiredValues = ['ip'];
      for(let key of requiredValues) {
        if(!data[key]) {
          canAdd = false;
          alert('Missing value: ' + key);
        }
      }
      if(canAdd) {
        autoBuyer.addProxy(data).then(() => {
          that.table.update();
          popupAddProxy.hide();

        });
      }
      return false;
    });

    autoBuyer.on('accountUpdate', () => {
      if(!this.active) {
        return;
      }
    //  this.tableAccounts.update();
    });
  }

  _load() {
    this.active = true;
    this.table.update();
  }

  _stop() {
    this.active = false;
  }
}
