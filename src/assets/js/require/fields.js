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
    search: 'text',
    title: 'Color'
  },
  playerLeague: {
    name: 'league',
    search: {
      type: 'text',
      retrieve: (row) => {
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
      retrieve: (row) => {
        return row.club.name;
      }
    },
    title: 'Club',
    format: (row) => {
      return row.club.name;
    }
  },
}
