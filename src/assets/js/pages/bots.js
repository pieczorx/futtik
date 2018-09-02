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
        {name: 'enabled', title: 'Status', format: (row, i) => {
          let statuses = ['Disabled', 'Logging in...', 'Logged']
          let status = 0;
          if(row.enabled) {
            status = 1;
            if(row.instance && row.instance.logged) {
              status = 2;
            }
          }
          let statusText = statuses[status];
          if(!power.state && status == 1) {
            statusText = 'Enabled';
          }
          return `
          <div class="activeStatus l" data-status="${status}" data-role="toggleAccountState" data-account-id="${i}">
            <div class="dot l circle"></div>
            <div class="text l">${statusText}</div>
          </div>
          `
        }},
        {name: 'mail', title: 'Mail', format: row => row.options.mail},
        {name: 'tradepile', title: '<span title="active | closed | expired | available">Tradepile</span>', format: row => {
          if(!row.tradePile) {
            return '-';
          }
          const tradePileTypes = ['active', 'closed', 'expired', 'available'];
          let tradePileCount = {};
          tradePileTypes.forEach(type => {
            tradePileCount[type] = 0;
          });
          row.tradePile.auctions.forEach(auction => {
            if(typeof(tradePileCount[auction.tradeState]) != 'undefined') {
              tradePileCount[auction.tradeState]++;
            } else {
              tradePileCount['available']++;
            }
          });
          let finalArray = [];
          tradePileTypes.forEach(type => {
            finalArray[finalArray.length] = tradePileCount[type];
          });
          finalArray = finalArray.map((value, i) => {
            return `<span title="${tradePileTypes[i]}">${value}</span>`;
          })
          return `<span class="tradePileValues">${finalArray.join(' · ')}</span>`;
        }},
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

    autoBuyer.on('accountUpdate', () => {
      if(!this.active) {
        return;
      }
      this.tableAccounts.update();
    });

  }
  _load() {
    this.active = true;
    this.tableAccounts.update();
  }
  _stop() {
    this.active = false;
  }
}
