class AutoBuyer {
  constructor() {
    this.accounts = [];
    this.instances = [];
    this.listeners = [];

    this.tasks = [];
    let that = this;

    //Toggle account state
    $(document).on('click', `[data-role='toggleAccountState']`, function() {
      const id = $(this).attr('data-account-id');
      that.toggleAccountState(id);
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
    for(let i = 0; i < this.accounts.length; i++) {
      this.workSingle(i);
    }
    this.timeoutWork = setTimeout(() => {
      this.work();
    }, CONFIG.AUTOBUYER_TICK);
  }

  async workSingle(id) {
    //Check if accounts are on globally
    if(!power.state) {
      return;
    }

    //Check if account is not busy
    if(this.accounts[id].busy) {
      return;
    }

    //Check if account is enabled
    if(!this.accounts[id].enabled) {
      return;
    }

    //Check if instance was added
    if(!this.instances[id]) {
      this.addInstance(id);
    }

    //Check if account is logged
    if(this.accounts[id].enabled && !this.accounts[id].logged) {
      return this.login(id);
    }

    //Check for custom tasks
    for(let i = 0; i < this.tasks.length; i++) {
      const handledTask = await this.handleTask(id, this.tasks[i]);
      if(handledTask) {
        return handledTask;
      }
    }


    //Pricecheck co 30 minut

    //Get tradepile every 2 minutes



    //Clear sold cards



    //Buy cards --> //Move card to tradepile --> //Sell cards



    //Check for automatic tasks

    //Price check every 10 seconds for example



  }

  async handleTask(botId, task) {
    if(task.finished) {
      return false;
    }

    if(typeof(task.botId) !== 'undefined' && task.botId != botId) {
      return false;
    }


    switch(task.type) {
      case "priceCheck": {

        task.botId = botId;

        this.busy(botId);

        if(!task.page) {
          task.page = 1;
        }

        if(!task.auctions) {
          task.auctions = [];
        }

        const response = await this.instances[botId].searchTransferMarket({
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

        this.free(botId);

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
  }

  addInstance(id) {
    this.instances[id] = new Account(this.accounts[id].options);
  }

  async login(id) {
    console.log('login to acc', id);
    this.busy(id);
    try {
      if(this.accounts[id].cookies) {
        this.instances[id].cookies(this.accounts[id].cookies)
      }
      await this.instances[id].login();
      this.accounts[id].logged = true;
      console.log('logged in', id);
      this.emit('update');
      this.accounts[id].cookies = this.instances[id].cookies();
      await this.instances[id].getMassInfo();
      this.saveAccounts();
      this.accounts[id].coins = this.instances[id].coins;
      this.emit('update');
      console.log('Got money', this.accounts[id].coins);
    } catch(e) {
      console.log('Error with login', id, e);
    }
    this.free(id);
  }

  busy(id) {
    this.accounts[id].busy = true;
  }

  async free(id) {
    await wait(CONFIG.AUTOBUYER_REQUEST_DELAY);
    this.accounts[id].busy = false;
  }

  toggleAccountState(id) {
    this.accounts[id].enabled = !this.accounts[id].enabled;
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
    await fse.outputJson(CONFIG.PATH_ACCOUNTS, this.accounts);
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
