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
      try {
        this.workSingle(account);
      } catch(e) {
        console.warn('Account could not work');
        console.log(e);
      }
    });
  }
  async workSingle(account) {
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
      this.login(account);
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
      console.log('Got tradepile', tradePile);
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
        console.log('Delete sold auctions');
        const resDeleteAuctions = await account.instance.deleteSoldAuctions();
        console.log('Auctions deleted');
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
          if(playersFound.auctions.length > 0) {
            playersFound.auctions.sort((a, b) => {
              return a.buyNowPrice - b.buyNowPrice;
            });
            const cheapestTrade = playersFound.auctions[0];

            console.warn('kupujemy najtanszego gracza', cheapestTrade);


            //Buy player
            const playerBought = await account.instance.bid({
              coins: cheapestTrade.buyNowPrice,
              tradeId: cheapestTrade.tradeId
            });
            if(!playerBought) {
              console.warn('Player already bought');
              return this.free(account);
            }

            if(playerBought.length != 1) {
              throw new Error('Invalid player length');
            }
            console.log('Player bought');

            //await wait(CONFIG.AUTOBUYER_REQUEST_DELAY);


            //Put to tradepile
            const playerMoved = await account.instance.putToTradepile({
              itemId: playerBought[0].itemData.id
            });

            if(!playerMoved) {
              console.warn('Player was not moved to tradepile');
              return this.free(account);
            }

            console.log('OK PLAYER WAS MOVED TO TRADEPILE, WAIT 5 SECONDS');

            //Sell player
            const playerSold = await account.instance.sell({
              itemId: playerBought[0].itemData.id, //Here we can put id from playerMoved info
              priceBuyNow: Utils.calculateValidPrice(CONFIG.AUTOBUYER_SELL_FACTOR * player.lastPriceCheck[platform].priceBuyNowAverage),
              priceBid: Utils.calculateNextLowerPrice(CONFIG.AUTOBUYER_SELL_FACTOR * player.lastPriceCheck[platform].priceBuyNowAverage),
              duration: 3600
            });
            if(playerSold) {
              console.log('player sold');
            } else {
              console.log('could not sell player');
            }
            return this.free(account);
          }
        } catch(e) {
          player.lastBuyCheckDate = new Date();
          player.buyCheckBusy = false;
          console.warn(e);
        }
        player.lastBuyCheckDate = new Date();
        player.buyCheckBusy = false;
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
      this.emit('playersUpdate');
    });
  }

  async login(account) {
    console.log('logging in to account', account);
    this.busy(account);
    try {
      if(account.cookies) {
        account.instance.cookies(account.cookies)
      }
      await account.instance.login();
      //account.logged = true;
      console.log('logged in', account.options.mail);
      this.emit('accountUpdate');
      account.cookies = account.instance.cookies();
      await account.instance.getMassInfo();
      this.saveAccounts();
      account.coins = account.instance.coins;
      this.emit('accountUpdate');
      console.log('Got money', account.coins);
    } catch(e) {
      console.log('Error with login', account, e);
    }
    this.free(account);
  }

  busy(account) {
    console.log(`[${account.options.mail}] >>>> Busy`);
    account.busy = true;
  }
  async free(account) {
    await wait(CONFIG.AUTOBUYER_REQUEST_DELAY);
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
      this.accounts = await fse.readJson(CONFIG.PATH_ACCOUNTS);
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
      };
    }));
    console.log('save accounts', this.accounts);
  }
}
