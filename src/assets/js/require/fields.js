const Fields = {
  playerName: {
    name: 'name',
    search: 'text',
    title: 'Name'
  },
  playerAvatar: {
    name: 'avatar',
    title: '',
    format: (row) => {
      return `<img src="${util.format(CONFIG.URL_PLAYER_AVATAR_SMALL, row.baseId)}">`
    }
  },
  playerRating: {
    name: 'rating',
    search: {
      type: 'numericFromTo',
      min: 0,
      max: 100
    },
    title: 'Rating'
  },
  playerColor: {
    name: 'color',
    search: {
      type: 'textArray',
      html: '<button class="radius" data-table-request>Choose color</button>',
      onRequest: async ({filters}) => {
        console.log('On request');
        //return ['toty', 'tots_gold'];
        let categories = [
          {
            title: 'Default',
            name: 'default',
            list: [
              {
                title: 'Bronze',
                name: 'bronze'
              },
              {
                title: 'Silver',
                name: 'silver'
              },
              {
                title: 'Gold',
                name: 'gold'
              }
            ]
          },
          {
            title: 'Rare',
            name: 'rare',
            list: [
              {
                title: 'Rare bronze',
                name: 'rare_bronze'
              },
              {
                title: 'Rare silver',
                name: 'rare_silver'
              },
              {
                title: 'Rare gold',
                name: 'rare_gold'
              }
            ]
          },
          {
            title: 'Team of the week',
            name: 'totw',
            list: [
              {
                title: 'Bronze (TOTW)',
                name: 'totw_bronze'
              },
              {
                title: 'Silver (TOTW)',
                name: 'totw_silver'
              },
              {
                title: 'Gold (TOTW)',
                name: 'totw_gold'
              }
            ]
          }
        ];
        let existingColors = [];
        for(let category of categories) {
          for(let listElement of category.list) {
            existingColors.push(listElement.name);
          }
        }
        let otherColors = [];

        for(let player of autoBuyer.players) {
          if(!otherColors.includes(player.color) && !existingColors.includes(player.color)) {
            otherColors.push(player.color);
          }
        }
        categories.push({
          title: 'Other',
          name: 'other',
          list: otherColors.map(color => {return {title: color, name: color};})
        })
        return await popupChooseList.show({
          categories: categories,
          selected: filters.color
        });
      }
    },
    title: 'Color'
  },
  playerLeague: {
    name: 'league',
    search: {
      type: 'textArray',
      html: '<button class="radius" data-table-request>Choose league</button>',
      format: (row) => {
        return row.league.abbrName;
      },
      onRequest: async ({filters}) => {

        let allLeagueNames = [];
        let list = [];

        for(let player of autoBuyer.players) {
          if(!allLeagueNames.includes(player.league.abbrName)) {
            allLeagueNames.push(player.league.abbrName);
            list.push({
              title: player.league.name,
              name: player.league.abbrName
            })
          }
        }

        let categories = [{
          title: 'All leagues',
          name: 'all',
          list: list
        }];


        return await popupChooseList.show({
          categories: categories,
          selected: filters.league
        });
      }
    },
    title: 'League',
    format: (row) => {
      return row.league.name;
    }
  },
  playerClub: {
    name: 'club',
    search: {
      type: 'textArray',
      html: '<button class="radius" data-table-request>Choose club</button>',
      format: (row) => {
        return row.club.abbrName;
      },
      onRequest: async ({filters}) => {

        let allClubNames = [];
        let list = [];

        for(let player of autoBuyer.players) {
          if(!allClubNames.includes(player.club.abbrName)) {
            allClubNames.push(player.club.abbrName);
            list.push({
              title: player.club.name,
              name: player.club.abbrName
            })
          }
        }

        let categories = [{
          title: 'All clubs',
          name: 'all',
          list: list
        }];


        return await popupChooseList.show({
          categories: categories,
          selected: filters.club
        });
      }
    },
    title: 'Club',
    format: (row) => {
      return row.club.name;
    }
  },

  accountEnabledState: {
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
  accountBuyState: {
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

  accountMail: {
    name: 'mail',
    title: 'Mail',
    format: row => row.options.mail,
    search: {
      type: 'text',
      format: row => row.options.mail
    }

  },

  accountTradepile: {
    name: 'tradepile',
    title: '<span title="active | closed | expired | available">Tradepile</span>',
    width: 100,
    format: row => {
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
    }
  },

  accountPlatform: {
    name: 'platform',
    title: 'Platform',
    width: 50,
    search: {
      type: 'text',
      format: row => {
        return row.options.platform;
      }
    },
    format: row => {
      return row.options.platform.toUpperCase();
    }
  },
  accountCoins: {
    name: 'coins',
    title: 'Coins',
    width: 60,
    format: row => {return typeof(row.coins) != 'undefined' ? formatCoins(row.coins) : '-';},
    search: {
      type: 'numericFromTo',
      min: 0
    }
  },
  accountCoinsWithActiveAuctions: {
    name: 'coinsWithActiveAuctions',
    title: 'Coins + TP',
    width: 60,
    format: row => {
      if(typeof row.coins !== 'undefined' && typeof row.tradePile !== 'undefined') {
        const coinsFromActiveAuctions = row.tradePile.auctions.filter(x => {return x.tradeState === 'active';}).reduce((current, auction) => {return current + auction.buyNowPrice;}, 0)
        return formatCoins(row.coins + coinsFromActiveAuctions)
      }
      return '-';
    }
  },
  accountProxy: {
    name: 'proxy',
    title: 'Proxy',
    format: row => {
      return row.proxy ? row.proxy.ip : '-';
    }
  },
  accountUtasRequestCount: {
    name: 'utasRequestCount',
    title: 'UT Count'
  },
  accountMessage: {
    name: 'message',
    title: 'Message',
    width: 180
  }

};
