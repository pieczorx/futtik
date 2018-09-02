class AutoBuyer extends Emitter {
  constructor() {
    super();
    this.accounts = [];
    this.players = [];
    this.tasks = [];

    let that = this;

    setInterval(() => {
      this.work();
    }, CONFIG.AUTOBUYER_TICK)
  }

  getPlayerBuyPrice(player, platform) {
    return Utils.calculateValidPrice(CONFIG.AUTOBUYER_BUY_FACTOR * player.lastPriceCheck[platform].priceBuyNowAverage); //TODO: performance
  }

  getPlayerSellPrice(player, platform) {
    return Utils.calculateValidPrice(CONFIG.AUTOBUYER_SELL_FACTOR * player.lastPriceCheck[platform].priceBuyNowAverage); //TODO: performance
  }

  getPlayerProfit(player, platform) {
    const buyPrice = this.getPlayerBuyPrice(player, platform)
    const sellPrice = this.getPlayerSellPrice(player, platform)
    return this.getProfit(buyPrice, sellPrice);
  }

  getProfit(buyPrice, sellPrice) {
    return sellPrice * (1 - CONFIG.EA_COMMISSION) - buyPrice;
  }

  //Works
  work() {
    //Check if accounts are on globally
    if(!power.state) {
      return;
    }

    this.accounts.forEach(account => {
      this.workSingle(account);
    });
  }
  async workSingle(account) {
    try {
      //Check if account is not busy
      if(account.busy) {
        return;
      }

      //Check if account is enabled
      if(!account.enabled) {
        return;
      }

      //Check if instance was added
      if(!account.instance) {
        this.addInstance(account);
      }

      //Check if account is logged
      if(await this.workTaskEnsureLogged(account)) {return;}

      //Check for custom tasks
      if(await this.workTaskCheckCustomTasks(account)) {return;}

      //Pricecheck co 30 minut
      if(await this.workTaskPriceCheck(account)) {return;}

      //Get tradepile every 2 minutes
      if(await this.workTaskGetTradePile(account)) {return;}

      //Search for players, buy them and relist them
      if(await this.workTaskSearchAndBuy(account)) {return;}

      //No tasks :)

    } catch(e) {
      let errorSolved = true;
      switch(e.message) {
        case 'PLAYER_ALREADY_BOUGHT': {

          break;
        }
        case 'FUN_CAPTCHA_REQUIRED': {
          account.logged = false;
          this.emit('accountUpdate');
          console.log('CAPTCHA DETECTED XDDD');
          break;
        }
        case 'UNAUTHORIZED': {
          account.logged = false;
          this.emit('accountUpdate');
          break;
        }
        case 'NOT_ENOUGH_CREDIT': {
          console.error('wszystko jest ok xD');

          break;
        }
        default: {
          errorSolved = false;
          break;
        }
      }
      if(errorSolved) {
        this.free(account);

      } else {
        logger.logAccount(`Account unexpected error ${e.message}`, account, {
          error: e
        });
        power.updateState(false);
        this.emit('accountUpdate');
        this.free(account, 0)
      }

    }
  }

  async workTaskEnsureLogged(account) {
    if(account.enabled && !account.instance.logged) {
      //But make sure no other account on this proxy was logged less than X seconds before
      if(this.lastLoginDate) {
        if((new Date() - this.lastLoginDate) < CONFIG.ACCOUNT_LOGIN_DELAY) {
          return true;
        }
      }
      this.lastLoginDate = new Date();
      await this.login(account);
      return true;
    }
    return false;
  }
  async workTaskCheckCustomTasks(account) {
    for(let task of this.tasks) {
      const handledTask = await this.handleTask(account, task);
      if(handledTask) {
        return true;
      }
    }
    return false;
  }
  async workTaskPriceCheck(account) {
    const platform = account.options.platform;
    const playersPlatform = this.players.filter(player => {
      return player.current ? player.current[platform] : false;
    })
    for(let player of playersPlatform) {
      if(!player.lastPriceCheck || !player.lastPriceCheck[platform] || (new Date() - player.lastPriceCheck[platform].date) >= CONFIG.PRICE_CHECK_INTERVAL) {
        const taskAlreadyAdded = this.findTask({
          type: 'priceCheck',
          player: player,
          platform: platform,
          taskSource: 'defaultPriceCheck',
        })
        if(!taskAlreadyAdded) {
          this.addTask({
            type: 'priceCheck',
            player: player,
            pageMax: CONFIG.PRICE_CHECK_PAGES,
            cheapestItemsQuantity: CONFIG.PRICE_CHECK_CHEAPEST_ITEMS_QUANTITY,
            platform: platform,
            account: account,
            taskSource: 'defaultPriceCheck',
            onComplete: (res, account) => {
              player.lastPriceCheck[platform] = {
                priceBuyNowAverage: res.buyNowPriceAverage,
                date: new Date()
              }
              this.emit('playersUpdate');
            },
            //priority: -1
          });
          return true;
        }
      }
    }
    return false;
  }
  async workTaskGetTradePile(account) {
    if(!account.tradePile || (new Date() - account.tradePile.date) > CONFIG.TRADEPILE_CHECK_INTERVAL) {
      this.busy(account)
      this.busyMessage(account, 'Getting tradepile');
      let tradePile = await account.instance.getTradePile();
      logger.logAccount('Got tradepile', account, {tradePile: tradePile});
      for(let auction of tradePile) {
        switch(auction.tradeState) {
          case 'closed': { //SOLD ITEMS
            //DO NOTHING HERE

            break
          }
          case 'active': { //ACTIVE TRANSFERS

            break;
          }
          case 'expired': { //UNSOLD ITEMS

            break;
          }
          default: { //AVAILABLE ITEMS

            break;
          }
        }
      };

      //Clear sold cards
      const activeAuctions = tradePile.filter(auction => {
        return auction.tradeState === 'closed';
      });
      if(activeAuctions.length > 0) {
        this.busyMessage(account, 'Deleting sold auctions');
        const resDeleteAuctions = await account.instance.deleteSoldAuctions();
        logger.logAccount('Deleted sold auctions', account);
      }

      //Update tradepile to show real results
      this.busyMessage(account, 'Getting tradepile');
      tradePile = await account.instance.getTradePile();
      account.tradePile = {
        auctions: tradePile,
        date: new Date()
      }
      this.emit('accountUpdate');
      this.free(account);
      return true;
    }
    return false;
  }
  async workTaskSearchAndBuy(account) {
    if(!account.buy) {
      return false;
    }
    const platform = account.options.platform;
    const playersPlatform = this.players.filter(player => {
      return player.current ? player.current[platform] : false;
    })
    playersPlatform.sort((a, b) => {
      let lastBuyCheckDate = {
        a: new Date(0),
        b: new Date(0)
      }
      if(a.lastBuyCheckDate) {
        lastBuyCheckDate.a = a.lastBuyCheckDate
      }
      if(b.lastBuyCheckDate) {
        lastBuyCheckDate.b = b.lastBuyCheckDate
      }
      return lastBuyCheckDate.a - lastBuyCheckDate.b;
    });
    for(let player of playersPlatform) {

      if(!player.buyCheckBusy && player.lastPriceCheck && player.lastPriceCheck[platform]) {
        const priceBuyNowMax = this.getPlayerBuyPrice(player, platform);
        const priceSell = this.getPlayerSellPrice(player, platform);
        const profit = this.getProfit(priceBuyNowMax, priceSell);
        
        if(account.coins >= priceBuyNowMax) {
          player.buyCheckBusy = true;
          this.busyMessage(account, 'Searching...');
          this.busy(account)
          try {

            const playersFound = await account.instance.searchTransferMarket({
              baseId: player.id,
              num: CONFIG.TRANSFERMARKET_LIMIT,
              page: 1,
              priceBuyNowMax: priceBuyNowMax
            });
            if(playersFound.auctions.length === 0) {
              player.lastBuyCheckDate = new Date();
              player.buyCheckBusy = false;
              this.free(account)
              return true;
            }

            //Buy player
            playersFound.auctions.sort((a, b) => {
              return a.buyNowPrice - b.buyNowPrice;
            });

            const cheapestTrade = playersFound.auctions[0];
            this.busyMessage(account, 'Buying');
            const playerBought = await account.instance.bid({
              coins: cheapestTrade.buyNowPrice,
              tradeId: cheapestTrade.tradeId
            });
            logger.logAccount(`Bought ${player.name} for ${formatCoins(cheapestTrade.buyNowPrice)}`, account);


            //Put to tradepile
            await account.instance.putToTradepile({
              itemId: playerBought[0].itemData.id
            });
            logger.logAccount(`Moved ${player.name} to trade pile`, account);

            //List player for sell
            const priceBid = Utils.calculateNextLowerPrice(priceSell);
            this.busyMessage(account, 'Selling');
            await account.instance.sell({
              itemId: playerBought[0].itemData.id,
              priceBuyNow: priceSell,
              priceBid: priceBid,
              duration: 3600
            });
            logger.logAccount(`Listed ${player.name} for ${formatCoins(priceSell)}`, account);
          } catch(e) {
            player.lastBuyCheckDate = new Date();
            player.buyCheckBusy = false;
            this.free(account)
            throw e;
          }

          player.lastBuyCheckDate = new Date();
          player.buyCheckBusy = false;
          this.free(account)
          this.emit('playersUpdate');
          return true;
        }
      }
    }
    return false;
  }

  //Tasks
  performTask(task) {
    return new Promise((resolve, reject) => {
      task.onComplete = resolve;
      this.addTask(task);
    });
  }
  addTask(task) {
    this.tasks[this.tasks.length] = task;
  }
  findTask(parameters) {
    for(let task of this.tasks) {
      let parametersOk = true;
      Object.keys(parameters).forEach(key => {
        if(task[key] !== parameters[key]) {
          parametersOk = false;
        }
      });
      if(parametersOk) {
        return true;
      }
    }
  }
  finishTask(task) {
    task.finished = true;
    if(typeof(task.onComplete) === 'function') {
      task.onComplete(task.result);
    }
    this.cleanUnusedTasks();
  }
  cleanUnusedTasks() {
    if(this.cleaningTasks) {
      console.warn('WTF IT HAPPENED XD')
      return;
    }
    this.cleaningTasks = true;
    let removeValFromIndex = [];
    for(let i = 0; i < this.tasks.length; i++) {
      if(this.tasks[i].finished) {
        removeValFromIndex[removeValFromIndex.length] = i;
      }
    }

    for(let i = removeValFromIndex.length -1; i >= 0; i--) {
      this.tasks.splice(removeValFromIndex[i],1);
    }

    this.cleaningTasks = false;
  }

  async handleTask(account, task) {
    //Check if task is not finished
    if(task.finished) {
      return false;
    }

    //Check if account is good
    if(typeof(task.account) !== 'undefined' && task.account !== account) {
      return false;
    }

    //Check if platform is good
    if(task.platform && task.platform != account.options.platform) {
      return false;
    }

    //Handle different tasks

    switch(task.type) {
      case "priceCheck": {
        if(await this.handleTaskPriceCheck(task, account)) {
          return true;
        }
      }
    }
    return false;
  }
  async handleTaskPriceCheck(task, account) {
    task.account = account;
    this.busy(account);


    if(!task.page) {
      task.page = 1;
    }

    if(!task.auctions) {
      task.auctions = [];
    }
    this.busyMessage(account, `Price checking (${task.page} / ${task.pageMax})`);
    const response = await account.instance.searchTransferMarket({
      page: task.page,
      baseId: task.player.id,
      limit: CONFIG.TRANSFERMARKET_LIMIT
    });

    if(response.auctions.length > 0) {
      task.auctions.push(...response.auctions.map(e => {
        return {
          buyNowPrice: e.buyNowPrice,
          startingBid: e.startingBid
        }
      }));
    }

    if(task.page >= task.pageMax || response.auctions.length == 0 || response.auctions.length < CONFIG.TRANSFERMARKET_LIMIT) {
      //Sort auctions by price ascending
      task.auctions.sort((a, b) => {
        return a.buyNowPrice - b.buyNowPrice;
      })
      task.result = {
        auctions: task.auctions,
        buyNowPriceAverage: (task.auctions.slice(0, task.cheapestItemsQuantity)).reduce((p, c) => p + c.buyNowPrice, 0) / task.cheapestItemsQuantity
      }
      logger.logAccount(`Price check complete for ${task.player.name}. Average price: ${task.result.buyNowPriceAverage}`, account, {
        player: task.player
      });
      this.finishTask(task);
    } else {
      task.page++;
    }

    this.free(account);
    return true;
  }

  addInstance(account) {
    account.instance = new Account(account.options);
    account.instance.on('coinsUpdate', coins => {
      account.coins = account.instance.coins;
      this.emit('accountUpdate');
    });
  }

  async login(account) {
    this.busy(account);

    if(account.cookies) {
      account.instance.cookies(account.cookies)
    }
    this.busyMessage(account, 'Logging in');
    await account.instance.login();
    //account.logged = true;
    logger.logAccount('Logged in to an account', account);
    this.emit('accountUpdate');
    account.cookies = account.instance.cookies();
    this.busyMessage(account, 'Getting mass info');
    await account.instance.getMassInfo();
    this.saveAccounts();

    this.free(account);
  }

  busy(account) {
    account.busy = true;
  }
  async free(account, time) {

    await wait(time || CONFIG.AUTOBUYER_REQUEST_DELAY);
    this.busyMessage(account, '-');
    account.busy = false;

  }

  busyMessage(account, message) {
    account.message = message;
    this.emit('accountUpdate');
  }
  toggleAccountState(account, state) {
    if(typeof(state) === 'undefined') {
      state = !account.enabled;
    }
    account.enabled = state;
    this.emit('accountUpdate');
    this.saveAccounts();
  }

  toggleAccountBuyState(account, state) {
    if(typeof(state) === 'undefined') {
      state = !account.buy;
    }

    account.buy = state;
    this.emit('accountUpdate');
    this.saveAccounts();
  }

  init() {
    return new Promise(async (resolve, reject) => {
      await this.loadAccounts();
      await this.loadPlayers();
      resolve();
    });
  }

  addAccount(options) {
    return new Promise(async (resolve, reject) => {
      this.accounts.push({
        options: options,
        enabled: true
      });
      await this.saveAccounts();
      resolve();
    });


  }

  async loadAccounts() {
    try {
      const accountsFile = await fse.readJson(CONFIG.PATH_ACCOUNTS);
      this.accounts = accountsFile.map(account => {
        const newAccount = {
          options: account.options,
          cookies: account.cookies,
        };

        if(account.coins) {
          newAccount.coins = account.coins;
        }
        if(account.enabled) {
          newAccount.enabled = true;
        }

        if(account.tradePile) {
          newAccount.tradePile = {
            auctions: account.tradePile.auctions,
            date: new Date(account.tradePile.date)
          }
        }

        newAccount.buy = account.buy ? true : false;

        return newAccount;
      });
      for(let i = 0; i < this.accounts.length; i++) {
        this.accounts[i].busy = false;
      }
    } catch(e) {

    }
  }
  async saveAccounts() {
    await fse.outputJson(CONFIG.PATH_ACCOUNTS, this.accounts.map(account => {
      return {
        options: account.options,
        cookies: account.cookies,
        enabled: account.enabled,
        tradePile: account.tradePile,
        coins: account.coins,
        buy: account.buy ? true : false
      };
    }));
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
      this.emit('playersUpdate');
    } catch(e) {
      console.log(e)
    }
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
  getPlayerFromId(id) {
    for(let player of this.players) {
      if(player.id == id) {
        return player;
      }
    }
  }
  getAccountFromId(id) {
    for(let account of this.accounts) {
      if(account.options.mail == id) {
        return account;
      }
    }
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
  fetchSinglePage(page) {
    return new Promise((resolve, reject) => {
      const url = util.format(CONFIG.URL_DATABASE, page);
      request({
        url,
        json: true
      }, (err, res, body) => {
        if(!err) {
          resolve(body)
        } else {
          reject(err)
        }

      })
    });

  }
}
