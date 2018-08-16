const util = require('util');

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
        return this.players;
      },
      name: 'players',
      empty: `
      <div class="empty w100 center">
        <div class="middle">
          <div class="w100">There are no players</div>
          <button type="submit" class="r radius" data-role="playersUpdateDatabase">Fetch database</button>
        </div>
      </div>
      `,
      fields: [
        {name: 'avatar', title: '', format: (row) => {
          //return `<img src="${util.format(CONFIG.URL_PLAYER_AVATAR_SMALL, row.id)}">`
          //row.headshot.smallImgUrl
          return `<img src="${util.format(CONFIG.URL_PLAYER_AVATAR_SMALL, row.baseId)}">`
        }},
        {name: 'name', title: 'Name'},
        {name: 'rating', title: 'Rating'},
        {name: 'color', title: 'Color'}
      ]
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

        el.text(`Updating database (${currentPage}/${allPages})...`)
        if(currentPage >= allPages) {
          fetchedAllPages = true;
        } else {
          currentPage++;
          await this.wait(1000);
        }
      }
      console.log('fetched all players', players)
      this.players = players;
      el.text('Database updated!')
    } catch(e) {
      el.text('Error')
    }
    this.table.update();
    await this.wait(3000);
    el.text('Update database')
    el.attr('data-disabled', 0);


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
