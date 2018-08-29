class AutoBuyer {
  constructor() {
    this.accounts = [];
    this.listeners = [];
    this.players = [];
    this.tasks = [];
    let that = this;

    //Toggle account state
    $(document).on('click', `[data-role='toggleAccountState']`, function() {
      const id = $(this).attr('data-account-id');
      that.toggleAccountState(that.accounts[id]);
    });

    this.work();
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

  work() {
    clearTimeout(this.timeoutWork);
    this.accounts.forEach(account => {
      this.workSingle(account);
    });

    this.timeoutWork = setTimeout(() => {
      this.work();
    }, CONFIG.AUTOBUYER_TICK);
  }

  async workSingle(account) {
    let platform = account.options.platform;
    //Check if accounts are on globally
    if(!power.state) {
      return;
    }

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
    if(account.enabled && !account.logged) {
      //But make sure no other account on this proxy was logged less than X seconds before
      if(this.lastLoginDate) {
        if((new Date() - this.lastLoginDate) < CONFIG.ACCOUNT_LOGIN_DELAY) {
          return;
        }
      }
      this.lastLoginDate = new Date();
      return this.login(account);
    }

    //Check for custom tasks
    for(let task of this.tasks) {
      const handledTask = await this.handleTask(account, task);
      if(handledTask) {
        return handledTask;
      }
    }


    //Pricecheck co 30 minut
    //TODO: Check if there is no other task for this player & platform
    const playersPlatform = this.players.filter(player => {
      return player.current ? player.current[platform] : false;
    })
    for(let player of playersPlatform) {
      if(!player.lastPriceCheck || !player.lastPriceCheck[platform] || (new Date() - player.lastPriceCheck[platform].date) >= CONFIG.PRICE_CHECK_INTERVAL) {
        this.addTask({
          type: 'priceCheck',
          baseId: player.id,
          pageMax: CONFIG.PRICE_CHECK_PAGES,
          cheapestItemsQuantity: CONFIG.PRICE_CHECK_CHEAPEST_ITEMS_QUANTITY,
          platform: platform,
          account: account,
          onComplete: (res) => {
            if(!player.lastPriceCheck) {
              player.lastPriceCheck = {};
            }
            player.lastPriceCheck[platform] = {
              priceBuyNowAverage: res.buyNowPriceAverage,
              date: new Date()
            }
          },
          //priority: -1
        });
        return this.workSingle(account);
      }
    };

    //Get tradepile every 2 minutes



    //Clear sold cards



    //Buy cards --> //Move card to tradepile --> //Sell cards



    //Check for automatic tasks

    //Price check every 10 seconds for example



  }

  async handleTask(account, task) {
    if(task.finished) {
      return false;
    }

    if(typeof(task.account) !== 'undefined' && task.account !== account) {
      return false;
    }

    if(task.platform) {
      if(task.platform != account.options.platform) {
        return false;
      }
    }


    switch(task.type) {
      case "priceCheck": {

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
          baseId: task.baseId
        });

        if(response.auctions.length > 0) {
          task.auctions.push(...response.auctions.map(e => {
            return {
              buyNowPrice: e.buyNowPrice,
              startingBid: e.startingBid
            }
          }));
        }

        if(task.page >= task.pageMax || response.auctions.length == 0) {
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
    }
    return false;
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

  addInstance(account) {
    account.instance = new Account(account.options);
  }

  async login(account) {
    console.log('logging in to account', account);
    this.busy(account);
    try {
      if(account.cookies) {
        account.instance.cookies(account.cookies)
      }
      await account.instance.login();
      account.logged = true;
      console.log('logged in', account.options.mail);
      this.emit('update');
      account.cookies = account.instance.cookies();
      await account.instance.getMassInfo();
      this.saveAccounts();
      account.coins = account.instance.coins;
      this.emit('update');
      console.log('Got money', account.coins);
    } catch(e) {
      console.log('Error with login', account, e);
    }
    this.free(account);
  }

  busy(account) {
    account.busy = true;
  }

  async free(account) {
    await wait(CONFIG.AUTOBUYER_REQUEST_DELAY);
    account.busy = false;
  }

  toggleAccountState(account) {
    account.enabled = !account.enabled;
    this.emit('update');
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
        this.accounts[i].logged = false;
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



  emit(type, data) {
    this.listeners.forEach(listener => {
      if(listener.type == type) {
        listener.f(data);
      }
    });
  }
  on(type, f) {
    this.listeners.push({
      type,
      f
    })
  }
}
