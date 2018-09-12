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
      html: '<button class="radius" data-table-request>Choose</button>',
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
      type: 'text',
      format: (row) => {
        return row.league.name;
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
      type: 'text',
      format: (row) => {
        return row.club.name;
      }
    },
    title: 'Club',
    format: (row) => {
      return row.club.name;
    }
  },
};
