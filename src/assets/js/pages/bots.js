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
      <div class="w100">No account added yet</div>
      <button class="radius" data-role="showPopup" data-popup-name="addAccount"><i class="far fa-plus"></i> Add new account</button>
      `,
      getId: (row) => {return row.options.mail;},
      fields: [
        {
          title: 'Enable',
          name: 'enabledState',
          type: 'checkbox',
          format: (row) => {

            return `
            <div class="checkbox">
              <input type="checkbox"${row.enabled ? ` checked="checked"` : ''}>
              <span class="box radius"><i class="far fa-check"></i></span>
            </div>
            `
          },
          align: 'center',
          width: 40
        },
        {
          title: 'Buy',
          name: 'buyState',
          type: 'checkbox',
          format: (row) => {

            return `
            <div class="checkbox">
              <input type="checkbox"${row.buy ? ` checked="checked"` : ''}>
              <span class="box radius"><i class="far fa-check"></i></span>
            </div>
            `
          },
          align: 'center',
          width: 40
        },
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
        {name: 'coins', title: 'Coins', format: row => {return typeof(row.coins) != 'undefined' ? formatCoins(row.coins) : '-';}},
        {name: 'coinsWithActiveAuctions', title: 'Coins Max', format: row => {
          if(typeof row.coins !== 'undefined' && typeof row.tradePile !== 'undefined') {
            const coinsFromActiveAuctions = row.tradePile.auctions.filter(x => {return x.tradeState === 'active';}).reduce((current, auction) => {return current + auction.buyNowPrice;}, 0)
            return formatCoins(row.coins + coinsFromActiveAuctions)
          }
          return '-';
        }},
        {name: 'proxy', title: 'Proxy', format: (row) => {
          return row.proxy ? row.proxy.ip : '-';
        }},
        {name: 'message', title: 'Message', width: 180}
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
      if(!this.active) {
        return;
      }
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
