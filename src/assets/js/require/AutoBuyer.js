class AutoBuyer extends Emitter {
  constructor() {
    super();
    this.accounts = [];
    this.players = [];
    this.tasks = [];

    let that = this;

    //Toggle account state
    $(document).on('click', `[data-role='toggleAccountState']`, function() {
      const id = $(this).attr('data-account-id');
      that.toggleAccountState(that.accounts[id]);
    });
    setInterval(() => {
      this.work();
    }, CONFIG.AUTOBUYER_TICK)
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
      if(await this.workTaskGetTradePile(account)) {return;}

      //No tasks :)

    } catch(e) {
      logger.logAccount('Account unexpected error', account, {
        error: e
      });
      account.enabled = false;
      this.free(account, 0);
      this.emit('accountUpdate');
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
          baseId: player.id,
          platform: platform,
          taskSource: 'defaultPriceCheck',
        })
        if(!taskAlreadyAdded) {
          this.addTask({
            type: 'priceCheck',
            baseId: player.id,
            pageMax: CONFIG.PRICE_CHECK_PAGES,
            cheapestItemsQuantity: CONFIG.PRICE_CHECK_CHEAPEST_ITEMS_QUANTITY,
            platform: platform,
            account: account,
            taskSource: 'defaultPriceCheck',
            onComplete: (res) => {
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
        const resDeleteAuctions = await account.instance.deleteSoldAuctions();
        logger.logAccount('Deleted sold auctions');
      }

      //Update tradepile to show real results
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
  async taskSearchAndBuy(account) {
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
        player.buyCheckBusy = true;
        this.busy(account)
        try {
          const priceBuyNowMax = Utils.calculateValidPrice(CONFIG.AUTOBUYER_BUY_FACTOR * player.lastPriceCheck[platform].priceBuyNowAverage); //TODO: performance
          const playersFound = await account.instance.searchTransferMarket({
            baseId: player.id,
            num: CONFIG.TRANSFERMARKET_LIMIT,
            page: 1,
            priceBuyNowMax: priceBuyNowMax
          });
          if(playersFound.auctions.length === 0) {
            return this.free(account);
          }

          //Buy player
          playersFound.auctions.sort((a, b) => {
            return a.buyNowPrice - b.buyNowPrice;
          });

          const cheapestTrade = playersFound.auctions[0];
          await account.instance.bid({
            coins: cheapestTrade.buyNowPrice,
            tradeId: cheapestTrade.tradeId
          });
          logger.logAccount(`Bought ${player.commonName} for ${formatCoins(priceBuyNow)}`, account);


          //Put to tradepile
          await account.instance.putToTradepile({
            itemId: playerBought[0].itemData.id
          });
          logger.logAccount(`Moved ${player.commonName} to trade pile`, account);

          //Sell player
          const priceBuyNow = Utils.calculateValidPrice(CONFIG.AUTOBUYER_SELL_FACTOR * player.lastPriceCheck[platform].priceBuyNowAverage);
          const priceBid = Utils.calculateNextLowerPrice(CONFIG.AUTOBUYER_SELL_FACTOR * player.lastPriceCheck[platform].priceBuyNowAverage);
          await account.instance.sell({
            itemId: playerBought[0].itemData.id,
            priceBuyNow: priceBuyNow,
            priceBid: priceBid,
            duration: 3600
          });
          logger.logAccount(`Listed ${player.commonName} for ${formatCoins(priceBuyNow)}`, account);

          player.lastBuyCheckDate = new Date();
          player.buyCheckBusy = false;

          return this.free(account);

        } catch(e) {
          player.lastBuyCheckDate = new Date();
          player.buyCheckBusy = false;
        }

        this.free(account)
        return true;
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

    const response = await account.instance.searchTransferMarket({
      page: task.page,
      baseId: task.baseId,
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
    await account.instance.login();
    //account.logged = true;
    logger.logAccount('Logged in to an account', account);
    this.emit('accountUpdate');
    account.cookies = account.instance.cookies();
    await account.instance.getMassInfo();
    this.saveAccounts();

    this.free(account);
  }

  busy(account) {
    account.busy = true;
  }
  async free(account, time) {
    await wait(time || CONFIG.AUTOBUYER_REQUEST_DELAY);
    account.busy = false;
  }

  toggleAccountState(account) {
    account.enabled = !account.enabled;
    this.emit('accountUpdate');
    this.saveAccounts();
  }

  init() {
    return new Promise(async (resolve, reject) => {
      await this.loadAccounts();
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
        coins: account.coins
      };
    }));
  }
}
