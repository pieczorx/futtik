const util = require('util');

const tableConverter = function (getData) {
  const data = getData();
  let rows = [];
  let filters = data.filters;
  let fields = data.fields;
  //let {rows, filters, fields} = data;

  data.rows.forEach(row => {
    let matches = true;

    //Search for fields
    data.fields.forEach(field => {
      if(field.search) {
        if(data.filters[field.name]) {
          const value = row[field.name].toLowerCase();
          const search = data.filters[field.name].toLowerCase();
          if(value.indexOf(search) < 0) {
            matches = false;
          }
        }
      }

    });
    console.log(row.name, matches);
    if(matches) {
      rows.push(row)
    }
  });

  console.log('tyle rowsuw', rows.length);
  let paging = {next: false, previous: false}
  if(filters.page > 1) {
    paging.previous = true;
  }
  if((filters.page * filters.limit) < rows.length) {
    paging.next = true;
  }
  if(filters.limit) {

    const INDEX_FROM = (filters.page - 1) * filters.limit
    const INDEX_TO = filters.page * filters.limit
    rows = rows.slice(INDEX_FROM, INDEX_TO)
  }

  return {
    rows: rows,
    paging: paging
  }
}


class PagePlayers {
  constructor() {
    let that = this;
    $(document).on('click', `[data-role='playersUpdateDatabase']`, function() {
      that.updateDatabase();
    });
    this.players = [];
    this.fetchUrl = ``;

    this.table = new Table({
      getData: () => {
        return tableConverter(() => {

          return {
            rows: this.players,
            filters: this.table.filters,
            fields: this.table.fields
          }
        })
      },
      onFilterChange: () => {
        this.table.update();
      },
      name: 'players',
      htmlEmpty: `
      <div class="empty w100 center">
        <div class="w100">There are no players</div>
        <div class="w100"><button type="submit" class="r radius" data-role="playersUpdateDatabase">Fetch database</button></div>
      </div>
      `,
      fields: [
        {name: 'avatar', title: '', format: (row) => {
          //return `<img src="${util.format(CONFIG.URL_PLAYER_AVATAR_SMALL, row.id)}">`
          //row.headshot.smallImgUrl
          return `<img src="${util.format(CONFIG.URL_PLAYER_AVATAR_SMALL, row.baseId)}">`
        }},
        {name: 'name', search: 'text', title: 'Name'},
        {name: 'rating', search: 'text', title: 'Rating'},
        {name: 'color', search: 'text', title: 'Color'}
      ],
      filters: {
        limit: 15
      }
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
        if(currentPage >= allPages) {
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
    await fse.outputJson(CONFIG.PATH_PLAYERS, this.players)
  }

  async loadPlayers() {
    try {
      console.log('getting players')
      this.players = await fse.readJson(CONFIG.PATH_PLAYERS)
      console.log('got', this.players)
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

const pagePlayers = new PagePlayers();
