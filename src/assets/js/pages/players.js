const util = require('util');

class PagePlayers {
  constructor() {
    let that = this;
    $(document).on('click', `[data-role='playersUpdateDatabase']`, function() {
      that.updateDatabase();
    });
    $(document).on('click', `[data-role='playersAddToAnalyzer']`, function() {
      that.addToAnalyzer();
    });
    $(document).on('click', `[data-role='playersAddToCurrent']`, function() {
      that.addToCurrent();
    });
    $(document).on('submit', `form[name='playersAnalyzer']`, function() {
      const data = $(this).serializeJSON();
      that.analyze(data);
      return false;
    });

    this.players = [];

    this.fetchUrl = ``;
    this.initTables();

    autoBuyer.on('playersUpdate', () => {
      this.players = autoBuyer.players;
      this.updateTables();
    });

    pltfrm.on('change', () => {
      this.updateTables();
    });

  }
  updateTables() {
    if(!this.active) {
      return;
    }
    this.table.update();
    this.tableCurrent.update();
    this.tableAnalyzer.update();
  }
  initTables() {
    this.table = new Table({
      getData: () => {
        return tableConverter.convert({
          rows: this.players,
          filters: this.table.filters,
          fields: this.table.fields
        })
      },
      onFilterChange: () => {
        this.table.update();
      },
      name: 'players',
      htmlEmpty: `

      <div class="w100">There are no players</div>
      <div class="w100"><button type="submit" class="inline radius" data-role="playersUpdateDatabase">Fetch database</button></div>

      `,
      fields: [
        Fields.playerAvatar,
        Fields.playerName,
        Fields.playerRating,
        Fields.playerColor,
        Fields.playerLeague,
        Fields.playerClub,
        {
          title: '',
          name: 'add',
          type: 'action',
          format: (row) => {
            return `<button class="radius"><i class="far fa-user-plus"></i></button>`;
          }
        }
      ],
      getId: (row) => {return row.id},
      filters: {
        limit: CONFIG.TABLE_PLAYERS_PER_PAGE
      },
      actions: {
        add: (id) => {
          let player = this.getPlayerFromId(id);
          player.analyzer[currentPlatform()] = true;
          this.tableAnalyzer.update();
          autoBuyer.savePlayers();
        }
      }
    });
    this.tableAnalyzer = new Table({
      getData: () => {
        return tableConverter.convert({
          rows: this.getAnalyzerPlayers(),
          filters: this.tableAnalyzer.filters,
          fields: this.tableAnalyzer.fields
        })
      },
      onFilterChange: () => {
        this.tableAnalyzer.update();
      },
      name: 'playersAnalyzer',
      htmlEmpty: `<div class="w100">There are no players, add them from <a href="/players/">database tab</a>.</div>`,
      fields: [
        Fields.playerAvatar,
        Fields.playerName,
        Fields.playerRating,
        {
          title: 'Auctions',
          name: 'lastAnalyzerPriceCheckAuctionCount',
          search: {
            type: 'numericFromTo',
            format: (row) => {
              if(row.lastAnalyzerPriceCheck && row.lastAnalyzerPriceCheck[currentPlatform()]) {
                return row.lastAnalyzerPriceCheck[currentPlatform()].auctionCount
              }
              return false;
            },
            min: 0,
            max: 500,
            step: 50
          },
          format: (row) => {
            if(row.lastAnalyzerPriceCheck && row.lastAnalyzerPriceCheck[currentPlatform()]) {
              return row.lastAnalyzerPriceCheck[currentPlatform()].auctionCount
            }
            return '-';
          }
        },
        {
          title: 'Average price',
          name: 'lastAnalyzerPriceCheckPriceBuyNowAverage',
          search: {
            type: 'numericFromTo',
            format: (row) => {
              if(row.lastAnalyzerPriceCheck && row.lastAnalyzerPriceCheck[currentPlatform()]) {
                return row.lastAnalyzerPriceCheck[currentPlatform()].priceBuyNowAverage;
              }
              return false;
            },
            min: 250,
            max: 15000000,
            step: 50
          },

          format: (row) => {
            if(row.lastAnalyzerPriceCheck && row.lastAnalyzerPriceCheck[currentPlatform()]) {
              return formatCoins(Math.round(row.lastAnalyzerPriceCheck[currentPlatform()].priceBuyNowAverage))
            }
            return '-';
          }
        },
        {
          title: '<i class="far fa-user-minus"></i>',
          name: 'remove',
          type: 'action',
          format: (row) => {
            return `<button class="radius buttonRed"><i class="far fa-user-minus"></i></button>`;
          }
        }
      ],
      getId: (row) => {return row.id},
      filters: {
        limit: CONFIG.TABLE_PLAYERS_PER_PAGE
      },
      actions: {
        remove: (id) => {
          console.warn('remove this id', id);
          let player = this.getPlayerFromId(id);
          player.analyzer[currentPlatform()] = false;
          this.tableAnalyzer.update();
          autoBuyer.savePlayers();
        }
      }
    });
    this.tableCurrent = new Table({
      getData: () => {
        return tableConverter.convert({
          rows: this.getCurrentPlayers(),
          filters: this.tableCurrent.filters,
          fields: this.tableCurrent.fields
        })
      },
      onFilterChange: () => {
        this.tableCurrent.update();
      },
      getId: (row) => {return row.id},
      name: 'playersCurrent',
      htmlEmpty: `<div class="w100">There are no players, add them from <a href="/players/analyzer/">analyzer tab</a>.</div>`,
      fields: [
        Fields.playerAvatar,
        Fields.playerName,
        Fields.playerRating,
        Fields.playerColor,
        Fields.playerLeague,
        Fields.playerClub,
        {
          title: 'Price',
          name: 'lastPriceCheck',
          search: 'text',
          format: (row) => {
            if(row.lastPriceCheck) {
              if(row.lastPriceCheck[currentPlatform()]) {
                return `
                <span title="${row.lastPriceCheck[currentPlatform()].date.toLocaleTimeString()}">${row.lastPriceCheck[currentPlatform()].priceBuyNowAverage.toFixed(0)}</span>
                `
              }
            }
            return '-';
          }
        },
        {
          title: 'Buy price',
          name: 'buyPrice',
          search: {
            type: 'numericFromTo',
            format: (row) => {
              if(row.lastPriceCheck && row.lastPriceCheck[currentPlatform()]) {
                return autoBuyer.getPlayerBuyPrice(row, currentPlatform());
              }
              return false;
            }
          },
          format: (row) => {
            if(row.lastPriceCheck && row.lastPriceCheck[currentPlatform()]) {
              return `
              <span title="${row.lastPriceCheck[currentPlatform()].date.toLocaleTimeString()}">${formatCoins(autoBuyer.getPlayerBuyPrice(row, currentPlatform()))}</span>
              `
            }
            return '-';
          }
        },
        {
          title: 'Sell price',
          name: 'sellPrice',
          search: {
            type: 'numericFromTo',
            format: (row) => {
              if(row.lastPriceCheck && row.lastPriceCheck[currentPlatform()]) {
                return autoBuyer.getPlayerSellPrice(row, currentPlatform());
              }
              return false;
            }
          },
          format: (row) => {
            if(row.lastPriceCheck && row.lastPriceCheck[currentPlatform()]) {
              return `
              <span title="${row.lastPriceCheck[currentPlatform()].date.toLocaleTimeString()}">${formatCoins(autoBuyer.getPlayerSellPrice(row, currentPlatform()))}</span>
              `
            }
            return '-';
          }
        },
        {
          title: '',
          name: 'remove',
          type: 'action',
          format: (row) => {
            return `<button class="radius buttonRed"><i class="far fa-user-minus"></i></button>`;
          }
        }
      ],
      filters: {
        limit: CONFIG.TABLE_PLAYERS_PER_PAGE
      },
      actions: {
        remove: (id) => {
          console.warn('remove this id', id);
          let player = this.getPlayerFromId(id);
          player.current[currentPlatform()] = false;
          this.tableCurrent.update();
          autoBuyer.savePlayers();
        }
      }
    });

  }
  _load() {
    this.active = true;
    this.updateTables();
  }
  _stop() {
    this.active = false;
  }
  getAnalyzerPlayers() {
    return this.players.filter(row => {return row.analyzer ? !!row.analyzer[currentPlatform()] : false;});
  }

  getCurrentPlayers() {
    return this.players.filter(row => {return row.current ? row.current[currentPlatform()] : false});
  }

  getPlayerFromId(id) {
    for(let player of this.players) {
      if(player.id == id) {
        return player;
      }
    }
  }
  addToAnalyzer() {
    let playersToAdd = tableConverter.getAllData({
      filters: this.table.filters,
      rows: this.players,
      fields: this.table.fields
    });
    playersToAdd.forEach(player => {
      player.analyzer[currentPlatform()] = true;
    });

    this.tableAnalyzer.update();

    a.go('/players/analyzer')
    autoBuyer.savePlayers();
  }
  addToCurrent() {
    let playersToAdd = tableConverter.getAllData({
      filters: this.tableAnalyzer.filters,
      rows: this.getAnalyzerPlayers(),
      fields: this.tableAnalyzer.fields
    });
    playersToAdd.forEach(player => {
      player.current[currentPlatform()] = true;
    });

    this.tableCurrent.update();

    a.go('/players/current')
    autoBuyer.savePlayers();
  }
  async analyze(data) {
    const playersToAnalyze = this.getAnalyzerPlayers();

    playersToAnalyze.forEach(async (player) => {
      const res = await autoBuyer.performTask({
        type: 'priceCheck',
        baseId: player.id,
        pageMax: parseInt(data.pagesMax),
        cheapestItemsQuantity: data.cheapestItemsQuantity,
        platform: currentPlatform()
      });
      if(!player.lastAnalyzerPriceCheck) {
        player.lastAnalyzerPriceCheck = {};
      }
      player.lastAnalyzerPriceCheck[currentPlatform()] = {
        auctionCount: res.auctions.length,
        priceBuyNowAverage: res.buyNowPriceAverage,
        //date: new Date()
      }
      this.tableAnalyzer.update();
    });
  }

  wait(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }
}
