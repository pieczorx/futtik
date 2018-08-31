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
      this.tableCurrent.update();
    });
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
          this.savePlayers();
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
            min: 0,
            max: 500,
            step: 50
          },
          format: (row) => {
            if(row.lastAnalyzerPriceCheck) {
              if(row.lastAnalyzerPriceCheck[currentPlatform()]) {
                return row.lastAnalyzerPriceCheck[currentPlatform()].auctionCount
              }
            }
            return '-';
          }
        },
        {
          title: 'Average price',
          name: 'lastAnalyzerPriceCheckPriceBuyNowAverage',
          search: {
            type: 'numericFromTo',
            min: 250,
            max: 15000000,
            step: 50
          },

          format: (row) => {
            if(row.lastAnalyzerPriceCheck) {
              if(row.lastAnalyzerPriceCheck[currentPlatform()]) {
                return row.lastAnalyzerPriceCheck[currentPlatform()].priceBuyNowAverage.toFixed(2)
              }
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
          this.savePlayers();
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
          this.savePlayers();
        }
      }
    });

  }
  _load() {
    this.table.update();
    this.tableAnalyzer.update();
    this.tableCurrent.update();
  }
  getAnalyzerPlayers() {
    return this.players.filter(row => {return row.analyzer ? !!row.analyzer[currentPlatform()] : false;});
  }

  getCurrentPlayers() {
    this.setAutoBuyerPlayers();
    return this.players.filter(row => {return row.current ? row.current[currentPlatform()] : false});
  }

  setAutoBuyerPlayers() {
    autoBuyer.players = this.players;
  }
  getPlayerFromId(id) {
    for(let player of this.players) {
      if(player.id == id) {
        return player;
      }
    }
  }
  addToAnalyzer() {
    /*this.playersAnalyzer = tableConverter.getAllData({
      filters: this.table.filters,
      rows: this.players,
      fields: this.table.fields
    });*/
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
    this.savePlayers();
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
    this.savePlayers();
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

  async updateDatabase() {
    let fetchedAllPages = false;
    let allPages;
    let currentPage = 1;
    let players = [];

    let el = $(`[data-role='playersUpdateDatabase']`);
    el.attr('data-disabled', 1);
    el.text('Updating database...')
    try {
      while(!fetchedAllPages) {

        const result = await this.fetchSinglePage(currentPage);
        allPages = result.totalPages;
        players = players.concat(result.items);

        el.text(`Updating database... (${currentPage}/${allPages})`)
        if(currentPage >= allPages) { //TODO: TEMPORARY
          fetchedAllPages = true;
        } else {
          currentPage++;
          await this.wait(500);
        }
      }
      console.log('fetched all players', players)
      this.players = players;
      el.text('Database updated!')
    } catch(e) {
      el.text('Error')
    }
    await this.savePlayers();
    this.table.update();
    await this.wait(3000);
    el.text('Update database')
    el.attr('data-disabled', 0);


  }

  async savePlayers() {
    let newPlayers = [];
    this.players.forEach(player => {
      newPlayers.push({
        //Important
        baseId: player.baseId,
        color: player.color,
        commonName: player.commonName,
        firstName: player.firstName,
        headshot: player.headshot,
        headshotImgUrl: player.headshotImgUrl,
        id: player.id,
        lastName: player.lastName,
        league: player.league,
        name: player.name,
        nation: player.nation,
        rating: player.rating,
        club: player.club,

        //Can be useful
        specialImages: player.specialImages,
        fitness: player.fitness,
        position: player.position,
        quality: player.quality,
        isSpecialType: player.isSpecialType,
        itemType: player.itemType,
        playerType: player.playerType,

        //Custom
        analyzer: player.analyzer,
        current: player.current,
      })
    });
    await fse.outputJson(CONFIG.PATH_PLAYERS, newPlayers)
  }

  async loadPlayers() {
    try {
      this.players = await fse.readJson(CONFIG.PATH_PLAYERS)
      this.players.map(player => {
        if(!player.current) {
          player.current = {};
        }
        if(!player.analyzer) {
          player.analyzer = {};
        }
        if(!player.lastPriceCheck) {
          player.lastPriceCheck = {};
        }

      });
      console.log(`Loaded ${this.players.length} players`)
      this.table.update();
    } catch(e) {
      console.log(e)
    }
  }

  wait(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  fetchSinglePage(page) {
    return new Promise((resolve, reject) => {
      const url = util.format(CONFIG.URL_DATABASE, page);
      request({
        url,
        json: true
      }, (err, res, body) => {
        if(!err) {
          console.log('fetched page ', page);
          resolve(body)
        } else {
          console.log('wystapil blad', err);
          reject(err)
        }

      })
    });

  }
}
