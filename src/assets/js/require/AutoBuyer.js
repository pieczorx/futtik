class AutoBuyer extends Emitter {
  constructor() {
    super();
    this.accounts = [];
    this.players = [];
    this.tasks = [];
    this.playersPlatform = {};
    this.emptyTasksTime = [];
    let that = this;

    setInterval(() => {
      this.work();
    }, settings.AUTOBUYER_TICK_INTERVAL)
  }

  getPlayerBuyPrice(player, platform) {
    const sellPrice = this.getPlayerSellPrice(player, platform);
    if(!sellPrice) {
      return false;
    }
    const averagePlayerPrice = player.lastPriceCheck[platform].priceBuyNowAverage;
    for(let priceStep of database.priceSteps[platform]) {
      if(priceStep.min <= averagePlayerPrice && priceStep.max >= averagePlayerPrice) {
        return Utils.calculateValidPrice((sellPrice * (1 - settings.EA_COMMISSION)) - priceStep.minProfit);
      }
    }
    return false;
    //const averagePlayerPrice = player.lastPriceCheck[platform].priceBuyNowAverage
    //return Utils.calculateValidPrice(CONFIG.AUTOBUYER_BUY_FACTOR * player.lastPriceCheck[platform].priceBuyNowAverage); //TODO: performance
  }

  getPlayerSellPrice(player, platform) {
    const averagePlayerPrice = player.lastPriceCheck[platform].priceBuyNowAverage;
    for(let priceStep of database.priceSteps[platform]) {
      if(priceStep.min <= averagePlayerPrice && priceStep.max >= averagePlayerPrice) {
        let finalPrice = Utils.calculateValidPrice(averagePlayerPrice);
        if(priceStep.sellSteps != 0) {
          let utilsFnName;
          let finalStepCount;

          if(priceStep.sellSteps > 0) {
            utilsFnName = 'calculateNextHigherPrice';
            finalStepCount = priceStep.sellSteps;
          }

          if(priceStep.sellSteps < 0) {
            utilsFnName = 'calculateNextLowerPrice';
            finalStepCount = priceStep.sellSteps * -1;
          }

          for(let i = 0; i < finalStepCount; i++) {
            finalPrice = Utils[utilsFnName](finalPrice, true);
          }
        }
        return finalPrice;
      }
    }
    return false;
    //return Utils.calculateValidPrice(CONFIG.AUTOBUYER_SELL_FACTOR * player.lastPriceCheck[platform].priceBuyNowAverage); //TODO: performance
  }

  getPlayerProfit(player, platform) {
    const buyPrice = this.getPlayerBuyPrice(player, platform)
    const sellPrice = this.getPlayerSellPrice(player, platform)
    return this.getProfit(buyPrice, sellPrice);
  }

  getProfit(buyPrice, sellPrice) {
    return Math.floor(sellPrice * (1 - settings.EA_COMMISSION) - buyPrice);
  }

  //Works
  work() {
    //Check if accounts are on globally
    if(!power.state) {
      return;
    }
    for(let i = 0; i < pltfrm.list.length; i++) {
      let platform = pltfrm.list[i];
      this.playersPlatform[platform] = this.players.filter(player => {
        return player.current ? player.current[platform] : false;
      })
    }
    for(let i = 0; i < this.accounts.length; i++) {
      const account = this.accounts[i];
      this.workSingle(account);
    }
  }
  async workSingle(account) {
    let dateStart = new Date();
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

      if(account.proxy) {
        account.instance.setProxy(account.proxy); //TODO: performance
      } else {
        account.instance.setDefaultProxy();
      }

      //Check if account is logged
      if(await this.workTaskEnsureLogged(account)) {return;}

      //Check for custom tasks
      if(await this.workTaskCheckCustomTasks(account)) {return;}

      //Pricecheck co 30 minut
      if(await this.workTaskPriceCheck(account)) {return;}

      //Get tradepile every X minutes
      if(await this.workTaskGetTradePile(account)) {return;}

      //Get unassigned items every X minutes
      if(await this.workTaskMoveUnassigned(account)) {return;}

      //Search for players, buy them and relist them
      if(await this.workTaskSearchAndBuy(account)) {return;}

      //No tasks :)

    } catch(e) {
      let errorSolved = true;
      switch(e.message) {
        case 'PLAYER_ALREADY_BOUGHT': {

          break;
        }
        case 'NO_TRADE_EXISTS': {

          break;
        }
        case 'FUN_CAPTCHA_REQUIRED': {
          await account.instance.logout();
          console.warn('FUN_CAPTCHA_REQUIRED HEHE');
          account.logged = false;
          account.enabled = false;
          this.emit('accountUpdate');
          logger.logAccount(`Captcha detected, logout account`, account);
          break;
        }
        case 'UNAUTHORIZED': {
          logger.logAccount(`Account was unauthorized, try to log in again...`, account);
          account.logged = false;
          this.emit('accountUpdate');
          break;
        }
        case 'NOT_ENOUGH_CREDIT': {
          console.error('NOT_ENOUGH_CREDIT');
          break;
        }
        case 'SERVICE_UNAVAILABLE_ERROR': {

          break;
        }
        default: {
          switch(e.code) {
            case 'ECONNRESET': {

              break;
            }
            default: {
              errorSolved = false;
              break;
            }
          }
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
        if(!isDev()) {
          Raven.setExtraContext({
            account: account
          });
          Raven.captureException(e);
        }
      }

    }
    this.emptyTasksTime.unshift(new Date() - dateStart);
  }

  async workTaskEnsureLogged(account) {
    if(account.enabled && !account.logged) {
      //But make sure no other account on this proxy was logged less than X seconds before
      if(account.proxy) {
        if(account.proxy.lastLoginDate) {
          if((new Date() - account.proxy.lastLoginDate) < settings.LOGIN_DELAY) {
            return true;
          }
        }
      } else {
        if(this.lastLoginDate) {
          if((new Date() - this.lastLoginDate) < settings.LOGIN_DELAY) {
            return true;
          }
        }
      }

      if(account.proxy) {
        account.proxy.lastLoginDate = new Date();
      } else {
        this.lastLoginDate = new Date();
      }
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
    const playersPlatform = this.playersPlatform[platform];

    for(let player of playersPlatform) {
      if(!player.lastPriceCheck || !player.lastPriceCheck[platform] || (new Date() - player.lastPriceCheck[platform].date) >= settings.PRICECHECK_INTERVAL) {
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
            pageMax: settings.PRICE_CHECK_PAGES,
            cheapestItemsQuantity: settings.PRICE_CHECK_CHEAPEST_ITEMS_QUANTITY,
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
    const platform = account.options.platform;
    if(!account.tradePile || (new Date() - account.tradePile.date) > settings.TRADEPILE_INTERVAL) {
      this.busy(account)
      this.busyMessage(account, 'Getting tradepile');
      let tradePile = await account.instance.getTradePile();
      logger.logAccount('Got tradepile', account, {tradePile: tradePile});

      //Sell inactive cards
      const auctionsInactive = tradePile.filter(auction => {return auction.tradeState !== 'closed' && auction.tradeState !== 'active';});
      for(let i = 0; i < auctionsInactive.length; i++) {
        let auction = auctionsInactive[i];
        const player = this.getPlayerFromId(auction.itemData.resourceId);
        if(player && player.lastPriceCheck[platform] && (new Date() - player.lastPriceCheck[platform].date) < settings.PRICECHECK_INTERVAL) {
          await wait(settings.AUTOBUYER_REQUEST_DELAY);
          const priceSell = this.getPlayerSellPrice(player, platform);
          if(priceSell) {
            const priceBid = Utils.calculateNextLowerPrice(priceSell);
            this.busyMessage(account, `Selling player from tradepile (${i + 1} / ${auctionsInactive.length})`);
            await account.instance.sell({
              itemId: auction.itemData.id,
              priceBuyNow: priceSell,
              priceBid: priceBid,
              duration: 3600
            });
            logger.logAccount(`Listed ${player.name} for ${formatCoins(priceSell)}`, account);
          }
        }
      };

      await wait(settings.AUTOBUYER_REQUEST_DELAY);

      //Clear sold cards
      const soldAuctions = tradePile.filter(auction => {
        return auction.tradeState === 'closed';
      });

      //Add sold player to Stats
      for(let i = 0; i < soldAuctions.length; i++) {
        let auction = soldAuctions[i];
        for(let i2 = 0; i2 < account.boughtItems.length; i2++) {
          let boughtItem = account.boughtItems[i2];
          if(boughtItem.id == auction.itemData.id) {
            //This is player sold by futtik, not someone else
            if(!boughtItem.priceSold) {
              boughtItem.priceSold = auction.buyNowPrice;
              account.stats.itemsSold++;
              const boughtItemProfit = (boughtItem.priceSold * (1 - settings.EA_COMMISSION)) - boughtItem.priceBought;
              account.stats.profit = account.stats.profit + boughtItemProfit;
              boughtItem.player.stats.sold++;
              boughtItem.player.stats.profit = boughtItem.player.stats.profit + boughtItemProfit;
            }
          }
        }
      }

      if(soldAuctions.length > 0) {
        this.busyMessage(account, `Deleting ${soldAuctions.length} sold auctions`);
        const resDeleteAuctions = await account.instance.deleteSoldAuctions();
        logger.logAccount(`Deleted ${soldAuctions.length} sold auctions`, account, {
          soldAuctions: soldAuctions
        });
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
    const playersPlatform = this.playersPlatform[platform];
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

        if(priceBuyNowMax && priceSell && account.coins >= priceBuyNowMax) {
          player.buyCheckBusy = true;
          this.busyMessage(account, `Searching ${player.name} (${player.rating})`);
          this.busy(account)
          try {

            const playersFound = await account.instance.searchTransferMarket({
              baseId: player.id,
              num: CONFIG.TRANSFERMARKET_LIMIT,
              page: 1,
              priceBuyNowMax: priceBuyNowMax
            });
            player.stats.search++;
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
            account.stats.itemsBought++;
            player.stats.bought++;
            account.boughtItems[account.boughtItems.length] = {
              id: playerBought[0].itemData.id,
              player: player,
              priceBought: cheapestTrade.buyNowPrice
            };
            await wait()



            //Put to tradepile
            this.busyMessage(account, `Putting to trade pile`)
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
  async workTaskMoveUnassigned(account) {
    if(account.unassignedPlayers) {
      if((new Date() - account.unassignedPlayers.date) < settings.UNASSIGNED_INTERVAL) {
        return false;
      }
    }
    this.busyMessage(account, `Getting unassigned players`)
    this.busy(account)
    const items = await account.instance.getUnassignedItems();
    const unassignedPlayers = items.filter(item => {return item.itemType === 'player';});
    logger.logAccount(`Got ${unassignedPlayers.length} unassigned players`, account);

    if(unassignedPlayers.length > 0) {
      for(let player of unassignedPlayers) {
        await wait(settings.AUTOBUYER_REQUEST_DELAY);
        this.busyMessage(account, `Putting to trade pile`)
        await account.instance.putToTradepile({
          itemId: player.id
        });
        let realPlayer = this.getPlayerFromId(player.assetId)
        logger.logAccount(`Moved ${realPlayer.name} to trade pile`, account, {player: realPlayer});
        //await this.sellPlayerFromTradePile(); //TODO
      }
    }

    account.unassignedPlayers = {date: new Date()};
    this.free(account);
    return true;
  }

  /*async sellPlayerFromTradePile(player, platform) {

  }*/


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
    this.busyMessage(account, `Pricecheck ${task.player.name} (${task.player.rating}) [${task.page}/${task.pageMax}]`);
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
    account.instance.captcha = funCaptcha;
    account.instance.on('coinsUpdate', coins => {
      account.coins = account.instance.coins;
      this.emit('accountUpdate');
    });

    account.instance.on('awaitingCaptcha', () => {
      this.busyMessage(account, '<span style="color: hsla(4, 83%, 60%, 1);font-weight: 600;">Awaiting captcha</span>');
    });
    account.instance.on('validatingCaptcha', () => {
      this.busyMessage(account, 'Validating captcha');
    });
    account.instance.on('requestUtas', () => {
      account.utasRequestCount++;
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
    account.logged = true;
    logger.logAccount('Logged in to an account', account);
    this.emit('accountUpdate');
    account.cookies = account.instance.cookies();
    this.busyMessage(account, 'Getting mass info');
    await account.instance.getMassInfo();
    //this.saveAccounts();

    this.free(account);
  }

  busy(account) {
    account.busy = true;
  }
  async free(account, time) {

    await wait(time || settings.AUTOBUYER_REQUEST_DELAY);
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
  }

  toggleAccountBuyState(account, state) {
    if(typeof(state) === 'undefined') {
      state = !account.buy;
    }

    account.buy = state;
    this.emit('accountUpdate');
  }

  async init() {
    await database.loadAll(); //First load database
    await this.loadPlayers(); //Then players
    await this.loadAccounts(); //And then accounts (important)
  }
  assignProxiesToAllAccounts() {
    const unassignedAccounts = this.accounts.filter(account => {return !account.proxy;})
    console.log(unassignedAccounts)
    for(let account of unassignedAccounts) {
      this.assignLeastUsedProxyToAccount(account);
    }
    this.emit('playersUpdate');
    this.savePlayers();
  }
  assignLeastUsedProxyToAccount(account) {
    //Get proxies with count
    const proxiesWithCount = database.proxies.map(proxy => {
      const proxyCount = this.accounts.filter(account => {return account.proxy ? account.proxy.ip === proxy.ip : false;}).length;
      return {
        proxy: proxy,
        count: proxyCount
      };
    });
    console.log(proxiesWithCount)

    //Sort them by usage
    const leastUsedProxy = proxiesWithCount.sort((a, b) => {
      return a.count - b.count;
    })[0].proxy;
    account.proxy = leastUsedProxy;
    console.log(`Assign proxy ${leastUsedProxy.ip} to account ${account.options.mail}`);
  }

  addAccountValidate(options) {
    let requiredValues = ['mail', 'password', 'platform', 'twoFactorToken', 'answer'];
    for(let value of requiredValues) {
      if(!options[value]) {
        throw new Error(`Missing ${value}`);
      }
    }

    for(let account of autoBuyer.accounts) {
      if(options.mail == account.options.mail) {
        throw new Error(`Account ${options.mail} already exists`);
      }
    }
  }
  addAccount(options) {
    return new Promise(async (resolve, reject) => {
      let account = {
        options: options
      };
      account = this.formatAccountRead(account);
      this.assignLeastUsedProxyToAccount(account);
      this.accounts.push(account);
      await this.saveAccounts();
      resolve();
    });
  }
  addProxy(options) {
    return new Promise(async (resolve, reject) => {
      database.proxies.push(options);
      await database.saveProxies();
      resolve();
    });
  }

  async saveAll() {
    await Promise.all([
      this.saveAccounts(),
      this.savePlayers(),
      database.saveAll()
    ])
  }

  formatAccountRead(account) {
    const newAccount = {
      options: account.options
    };

    if(account.cookies) {
      newAccount.cookies = account.cookies;
    }
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

    if(account.proxy) {
      for(let proxy of database.proxies) {
        if(proxy.ip === account.proxy) {
          newAccount.proxy = proxy;
        }
      }
    }

    if(account.utasRequestCount) {
      newAccount.utasRequestCount = parseInt(account.utasRequestCount);
    } else {
      newAccount.utasRequestCount = 0;
    }

    if(account.boughtItems) {
      newAccount.boughtItems = account.boughtItems;
    } else {
      newAccount.boughtItems = [];
    }

    for(let boughtItem of newAccount.boughtItems) {
      boughtItem.player = this.getPlayerFromId(boughtItem.playerId);
      delete boughtItem.playerId;
    }


    if(!account.stats) {
      newAccount.stats = {};
    } else {
      newAccount.stats = account.stats;
    }

    if(!newAccount.stats.itemsSold) {
      newAccount.stats.itemsSold = 0;
    }

    if(!newAccount.stats.itemsBought) {
      newAccount.stats.itemsBought = 0;
    }

    if(!newAccount.stats.profit) {
      newAccount.stats.profit = 0;
    }

    newAccount.buy = account.buy ? true : false;

    return newAccount;
  }
  async loadAccounts() {
    let accountsFile;
    try {
      accountsFile = await fse.readJson(CONFIG.PATH_ACCOUNTS);
    } catch(e) {
      this.accountsLoaded = true;
      return;
    }
    this.accounts = accountsFile.map(account => {
      return this.formatAccountRead(account);
    });
    for(let i = 0; i < this.accounts.length; i++) {
      this.accounts[i].busy = false;
    }


    this.accountsLoaded = true;
  }
  async saveAccounts() {
    if(!this.accountsLoaded) {
      return;
    }
    await fse.outputJson(CONFIG.PATH_ACCOUNTS, this.accounts.map(account => {
      let newAccount = {
        options: account.options,
        cookies: account.cookies,
        enabled: account.enabled,
        tradePile: account.tradePile,
        coins: account.coins,
        buy: account.buy ? true : false,
        stats: account.stats
      };
      if(account.utasRequestCount) {
        newAccount.utasRequestCount = account.utasRequestCount;
      }
      if(account.boughtItems) {
        newAccount.boughtItems = account.boughtItems.map(boughtItem => {
          return {
            id: boughtItem.id,
            playerId: boughtItem.player.id,
            priceBought: boughtItem.priceBought,
            priceSold: boughtItem.priceSold
          }
        });


      }
      if(account.proxy) {
        newAccount.proxy = account.proxy.ip;
      }
      return newAccount;
    }));
  }

  async loadPlayers() {
    try {
      let players = await fse.readJson(CONFIG.PATH_PLAYERS)
      players = this.formatPlayersRead(players);
      this.players = players;
      console.log(`Loaded ${players.length} players`)

      this.emit('playersUpdate');
    } catch(e) {
      console.log(e)
    }
    this.playersLoaded = true;
  }

  formatPlayersRead(players) {
    for(let player of players) {
      if(!player.current) {
        player.current = {};
      }
      if(!player.analyzer) {
        player.analyzer = {};
      }
      if(player.lastPriceCheck) {
        for(let platform of pltfrm.list) {
          if(player.lastPriceCheck[platform]) {
            player.lastPriceCheck[platform].date = new Date(player.lastPriceCheck[platform].date);
          }
        }
      } else {
        player.lastPriceCheck = {};
      }

      if(!player.stats) {
        player.stats = {};
      }

      if(!player.stats.sold) {
        player.stats.sold = 0;
      }

      if(!player.stats.bought) {
        player.stats.bought = 0;
      }

      if(!player.stats.profit) {
        player.stats.profit = 0;
      }

      if(!player.stats.search) {
        player.stats.search = 0;
      }
    }
    return players;
  }

  formatPlayersWrite(players) {
    let newPlayers = [];
    players.forEach(player => {
      let newPlayer = {
        //Important
        baseId: player.baseId,
        color: player.color,
        commonName: player.commonName,
        firstName: player.firstName,
        //headshotImgUrl: player.headshotImgUrl, //:C
        id: player.id,
        lastName: player.lastName,
        league: {
          abbrName: player.league.abbrName,
          id: player.league.id,
          name: player.league.name
        },
        name: player.name,
        nation: {
          abbrName: player.nation.abbrName,
          id: player.nation.id,
          name: player.nation.name,
        },
        rating: player.rating,
        club: {
          abbrName: player.club.abbrName,
          id: player.club.id,
          name: player.club.name
        },
        quality: player.quality,
        rarityId: player.rarityId,

        //Custom
        analyzer: player.analyzer,
        current: player.current,
        lastPriceCheck: player.lastPriceCheck,
        stats: player.stats
      };
      newPlayers.push(newPlayer);
    });
    return newPlayers;
  }

  formatPlayers(players) {
    return this.formatPlayersRead(this.formatPlayersWrite(players));
  }

  async savePlayers() {
    if(!this.playersLoaded) {
      return;
    }

    await fse.outputJson(CONFIG.PATH_PLAYERS, this.formatPlayersWrite(this.players))
  }
  getPlayerFromId(id) {
    for(let i = 0; i < this.players.length; i++) {
      if(this.players[i].id == id) {
        return this.players[i];
      }
    }
  }
  getAccountFromId(id) {
    for(let i = 0; i < this.accounts.length; i++) {
      if(this.accounts[i].options.mail == id) {
        return this.accounts[i];
      }
    }
  }

  async updateDatabase() {
    if(!this.playersLoaded) {
      alert('Players did not load yet')
      return;
    }

    let el = $(`[data-role='playersUpdateDatabase']`);
    el.attr('data-disabled', 1);
    el.text('Fetching first page...');

    this.updateDatabaseInfo = {
      pagesInfo: {},
      playerPages: [],
      proxyBusy: [],
      players: [],
      finished: false,
      pagesFetched: 0
    };


    for(let i = 0; i < database.proxies.length; i++) {
      this.updateDatabaseInfo.proxyBusy[i] = false;
    }

    //Get total pages
    const result = await this.fetchSinglePage(1);
    this.updateDatabaseInfo.pages = result.totalPages;
    for(let i = 0; i < this.updateDatabaseInfo.playerPages; i++) {
      this.updateDatabaseInfo.playerPages[i] = null;
    }

    for(let i = 0; i < database.proxies.length; i++) {
      this.fetchNextPage();
    }

  }

  async fetchNextPage() {
    const el = $(`[data-role='playersUpdateDatabase']`);
    el.attr('data-disabled', 1);
    //el.attr('data-disabled', 1);
    if(this.updateDatabaseInfo.finished) {
      return;
    }
    const freeProxyId = this.getFreeProxyId();
    if(freeProxyId !== false) {

      //Get first free proxy
      let proxy = database.proxies[freeProxyId];


      //Get page
      const page = this.updateDatabaseGetNextPage();
      if(page === false) {
        if(this.updateDatabaseInfo.pagesFetched == this.updateDatabaseInfo.pages) {
          //all pages were fetched
          this.updateDatabaseFinish();
        }

        return;
      }



      this.updateDatabaseInfo.pagesInfo[page] = 1;

      try {
        this.updateDatabaseInfo.proxyBusy[freeProxyId] = true;
        const result = await this.fetchSinglePage(page + 1, proxy);
        this.updateDatabaseInfo.pagesInfo[page] = 2;
        this.updateDatabaseInfo.pagesFetched++;
        el.text(`Updating database... ${this.updateDatabaseInfo.pagesFetched} / ${this.updateDatabaseInfo.pages}`);
        this.updateDatabaseInfo.playerPages[page] = result.items;
      } catch(e) {
        console.log('Error with fetchSinglePage', e);
        this.updateDatabaseInfo.pagesInfo[page] = 0;
      }



      await wait(500);
      this.updateDatabaseInfo.proxyBusy[freeProxyId] = false;
      this.fetchNextPage();


    }
  }

  updateDatabaseFinish() {
    this.updateDatabaseInfo.finished = true;
    console.log('Fetched all pages');
    let players = [];
    const existingPlayerIds = this.players.map(player => {return player.id});
    for(let i = 0; i < this.updateDatabaseInfo.playerPages.length; i++) {
      let newPlayers = this.updateDatabaseInfo.playerPages[i];
      players = players.concat(newPlayers.filter(player => {
        return !existingPlayerIds.includes(player.id);
      }));
    }

    this.players = this.players.concat(this.formatPlayers(players));
    const el = $(`[data-role='playersUpdateDatabase']`);
    el.attr('data-disabled', 0);
    el.text('Update database');
  }

  updateDatabaseGetNextPage() {
    for(let i = 0; i < this.updateDatabaseInfo.pages; i++) {
      if(!this.updateDatabaseInfo.pagesInfo[i]) {
        return i;
      }
    }
    return false;
  }

  getFreeProxyId() {
    for(let i = 0; i < database.proxies.length; i++) {
      if(!this.updateDatabaseInfo.proxyBusy[i]) {
        return i;
      }
    }
    return false;
  }

  async updateDatabaseOld() {
    if(!this.playersLoaded) {
      alert('Players did not load yet')
      return;
    }
    let fetchedAllPages = false;
    let allPages;
    let currentPage = 1;
    let players = [];

    let el = $(`[data-role='playersUpdateDatabase']`);
    el.attr('data-disabled', 1);
    el.text('Updating database...');
    const existingPlayerIds = this.players.map(player => {return player.id});
    try {
      while(!fetchedAllPages) {
        let proxy;
        let proxyUrl = false;
        if(database.proxies.length > 0) {
          proxy = database.proxies[(currentPage - 1) % database.proxies.length];
          if(proxy.username && proxy.password) {
            proxyUrl = `http://${proxy.username}:${proxy.password}@${proxy.ip}:${proxy.port || 80}`;
          } else {
            if(proxy.ip && proxy.port) {
              proxyUrl = `http://${proxy.ip}:${proxy.port || 80}`;
            }
          }
        }


        const result = await this.fetchSinglePage(currentPage, proxyUrl);
        allPages = result.totalPages;
        players = players.concat(result.items.filter(player => {
          return !existingPlayerIds.includes(player.id);
        }));

        el.text(`Updating database... (${currentPage}/${allPages})`)
        if(currentPage >= allPages) {
          fetchedAllPages = true;
        } else {
          currentPage++;
          await wait(500 / database.proxies.length);
        }
      }
      console.log('fetched all players', players)
      console.log('old players', this.players);
      console.log('new players', this.formatPlayers(players));
      this.players = this.players.concat(this.formatPlayers(players));
      el.text('Database updated!')
    } catch(e) {
      alert('Error while updating database. See log for more details...');
      console.error('Error with database update', e)
      el.text('Error')
    }
    await this.savePlayers();
    this.emit('playersUpdate');
    await wait(3000);
    el.text('Update database')
    el.attr('data-disabled', 0);
  }
  fetchSinglePage(page, proxy) {
    let proxyUrl;
    if(proxy) {
      if(proxy.username && proxy.password) {
        proxyUrl = `http://${proxy.username}:${proxy.password}@${proxy.ip}:${proxy.port || 80}`;
      } else {
        if(proxy.ip && proxy.port) {
          proxyUrl = `http://${proxy.ip}:${proxy.port || 80}`;
        }
      }
    }

    console.log(`get page ${page} from proxy ${proxyUrl}`);

    return new Promise((resolve, reject) => {
      const url = util.format(CONFIG.URL_DATABASE, page);
      let requestOptions = {
        url,
        json: true
      };
      if(proxyUrl) {
        requestOptions.proxy = proxyUrl;
      }
      request(requestOptions, (err, res, body) => {
        if(!err) {
          resolve(body)
        } else {
          reject(err)
        }

      })
    });

  }
}
