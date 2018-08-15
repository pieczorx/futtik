const util = require('util');

class PagePlayers {
  constructor() {
    let that = this;
    $(document).on('click', `[data-role='playersUpdateDatabase']`, function() {
      that.updateDatabase();
    });
    this.fetchUrl = ``
  }

  async updateDatabase() {
    let fetchedAllPages = false;
    let allPages;
    let currentPage = 1;
    let players = [];

    while(!fetchedAllPages) {

      const result = await this.fetchSinglePage(currentPage);
      allPages = result.totalPages;
      players = players.concat(result.items);

      if(currentPage >= allPages) {
        fetchedAllPages = true;
      } else {
        currentPage++;
        await this.wait(1000);
      }
    }
    console.log('fetched all players', players)

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
