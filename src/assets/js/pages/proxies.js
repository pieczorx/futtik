class PageProxies {
  constructor() {
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
      let canAdd = true;
      console.log(data)
      let requiredValues = ['ip', 'port'];
      for(let key of requiredValues) {
        if(!data[key]) {
          canAdd = false;
          alert('Missing value: ' + key);
        }
      }
      if(canAdd) {
        autoBuyer.addProxy(data).then(() => {
          //that.tableAccounts.update();
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
