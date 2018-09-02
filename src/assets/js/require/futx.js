const request = require('request');
const querystring = require('querystring');
const gotp = require('gotp');

class Account extends Emitter {
  constructor(data) {
    super();
    this.jar = request.jar();
    Object.assign(this, data);
    this.logged = false;
    this.listeners = [];
    let platforms = {
      xone: 'FFA18XBO'
    }
    this.gameSku = platforms[this.platform];
  }
  login() {
    return new Promise(async (resolve, reject) => {
      await this.getWebAppConfig();
      await this.visitFirstPage();

      if(!this.bearer) {
        await this.getFid();
        await this.getExecution();
        await this.visitLoginPage();
        await this.firstLogin();


        if(this.twoStepEnabled) {
          await this.visitAnswerPage();
          await this.requestTwoFactorCode();
          await this.visitCodePage();
          await this.loginWithCode();
        }
      }
      await this.getPids(); //required
      await this.getShards(); //required
      await this.getUtasServer(); //required
      await this.getFosServerCode(); //required
      await this.getUtSid(); //required
      await this.getSecurityQuestion(); //required
      await this.answerSecurityQuestion(); //required

      this.logged = true;
      resolve();
    });
  }


  //Login
  async visitFirstPage() {
    const url = `https://www.easports.com/pl/fifa/ultimate-team/web-app/`;
    const data = await this.get(url);
  }
  async getWebAppConfig() {
    const url = `https://www.easports.com/pl/fifa/ultimate-team/web-app/config/config.json`;
    const data = await this.get(url, {
      json: true
    });
    this.webAppConfig = data.body;
    this.authUrl = this.webAppConfig.authURL;
  }
  async getExecution() {
    const data = await this.get(this.urlGetExecution, {
      follow: false
    });
    this.execution = (data.res.headers.location.split('execution=')[1]).split('&')[0];
  }
  async visitLoginPage() {
    const url = `https://signin.ea.com/p/web2/login?execution=${this.execution}&initref=https%3A%2F%2Faccounts.ea.com%3A443%2Fconnect%2Fauth%3Fprompt%3Dlogin%26accessToken%3Dnull%26client_id%3DFIFA-18-WEBCLIENT%26response_type%3Dtoken%26display%3Dweb2%252Flogin%26locale%3Den_US%26redirect_uri%3Dhttps%253A%252F%252Fwww.easports.com%252Fpl%252Ffifa%252Fultimate-team%252Fweb-app%252Fauth.html%26scope%3Dbasic.identity%2Boffline%2Bsignin`;
    const data = await this.get(url);
  }
  async firstLogin() {
    const url = `https://signin.ea.com/p/web2/login?execution=${this.execution}&initref=https%3A%2F%2Faccounts.ea.com%3A443%2Fconnect%2Fauth%3Fprompt%3Dlogin%26accessToken%3Dnull%26client_id%3DFIFA-18-WEBCLIENT%26response_type%3Dtoken%26display%3Dweb2%252Flogin%26locale%3Den_US%26redirect_uri%3Dhttps%253A%252F%252Fwww.easports.com%252Fpl%252Ffifa%252Fultimate-team%252Fweb-app%252Fauth.html%26scope%3Dbasic.identity%2Boffline%2Bsignin`;
    const data = await this.post(url, {
      form: {
        email: this.mail,
        password: this.password,
        country: 'PL',
        phoneNumber: '',
        passwordForPhone: '',
        _rememberMe: 'on',
        rememberMe: 'on',
        _eventId: 'submit',
        gCaptchaResponse: '',
        isPhoneNumberLogin: false,
        isIncompletePhone: ''
      },
      follow: false
    });

    //Check if two factor is enabled
    if(data.res.headers.location) {
      let newExecution = (data.res.headers.location.split('execution=')[1]).split('&')[0];
      this.twoStepEnabled = true;
      //console.log('Two step is enabled but we dont know which one');
      if(newExecution == this.execution) {
        throw new Error('Invalid credentials');
      }
      this.execution = newExecution;
      //console.log('Got new execution:', this.execution);
    } else {
      //console.log('Two step is disabled');
    }
  }
  async visitAnswerPage() {
    const url = `https://signin.ea.com/p/web2/login?execution=${this.execution}&initref=https%3A%2F%2Faccounts.ea.com%3A443%2Fconnect%2Fauth%3Fprompt%3Dlogin%26accessToken%3Dnull%26client_id%3DFIFA-18-WEBCLIENT%26response_type%3Dtoken%26display%3Dweb2%252Flogin%26locale%3Den_US%26redirect_uri%3Dhttps%253A%252F%252Fwww.easports.com%252Fpl%252Ffifa%252Fultimate-team%252Fweb-app%252Fauth.html%26scope%3Dbasic.identity%2Boffline%2Bsignin&_eventId=end`;
    const data = await this.get(url, {follow: false});
    if(data.res.headers.location) {
      this.execution = (data.res.headers.location.split('execution=')[1]).split('&')[0];
      //console.log('Got execution after visiting answer page:', this.execution);

      const url2 = `https://signin.ea.com/p/web2/login?execution=${this.execution}&initref=https%3A%2F%2Faccounts.ea.com%3A443%2Fconnect%2Fauth%3Fprompt%3Dlogin%26accessToken%3Dnull%26client_id%3DFIFA-18-WEBCLIENT%26response_type%3Dtoken%26display%3Dweb2%252Flogin%26locale%3Den_US%26redirect_uri%3Dhttps%253A%252F%252Fwww.easports.com%252Fpl%252Ffifa%252Fultimate-team%252Fweb-app%252Fauth.html%26scope%3Dbasic.identity%2Boffline%2Bsignin`;
      const data2 = await this.get(url2);
    } else {
      //console.log('Visited answer page', data);
    }
  }
  async requestTwoFactorCode(resend) {
    const url = `https://signin.ea.com/p/web2/login?execution=${this.execution}&initref=https%3A%2F%2Faccounts.ea.com%3A443%2Fconnect%2Fauth%3Fprompt%3Dlogin%26accessToken%3Dnull%26client_id%3DFIFA-18-WEBCLIENT%26response_type%3Dtoken%26display%3Dweb2%252Flogin%26locale%3Den_US%26redirect_uri%3Dhttps%253A%252F%252Fwww.easports.com%252Fpl%252Ffifa%252Fultimate-team%252Fweb-app%252Fauth.html%26scope%3Dbasic.identity%2Boffline%2Bsignin`;
    const data  = await this.post(url, {
      form: {
        codeType: this.twoFactorToken ? 'APP' : 'EMAIL',
        _eventId: resend ? 'resend' : 'submit'
      },
      follow: false
    });
    this.execution = (data.res.headers.location.split('execution=')[1]).split('&')[0];
    //console.log('Two factor code requested');
  }
  async visitCodePage() {
    await this.get(`https://signin.ea.com/p/web2/login?execution=${this.execution}&initref=https%3A%2F%2Faccounts.ea.com%3A443%2Fconnect%2Fauth%3Fprompt%3Dlogin%26accessToken%3Dnull%26client_id%3DFIFA-18-WEBCLIENT%26response_type%3Dtoken%26display%3Dweb2%252Flogin%26locale%3Den_US%26redirect_uri%3Dhttps%253A%252F%252Fwww.easports.com%252Fpl%252Ffifa%252Fultimate-team%252Fweb-app%252Fauth.html%26scope%3Dbasic.identity%2Boffline%2Bsignin`);
  }
  async loginWithCode() {
    let code = '';
    if(this.twoFactorToken) {
      //console.log('Loggin in with 2 factor');
      code = gotp(this.twoFactorToken, 6, 30, Math.floor(Date.now() / 1000));
    } else {
      throw new Error('Loggin in with mail is not ready yet');
    }
    const url = `https://signin.ea.com/p/web2/login?execution=${this.execution}&initref=https%3A%2F%2Faccounts.ea.com%3A443%2Fconnect%2Fauth%3Fprompt%3Dlogin%26accessToken%3Dnull%26client_id%3DFIFA-18-WEBCLIENT%26response_type%3Dtoken%26display%3Dweb2%252Flogin%26locale%3Den_US%26redirect_uri%3Dhttps%253A%252F%252Fwww.easports.com%252Fpl%252Ffifa%252Fultimate-team%252Fweb-app%252Fauth.html%26scope%3Dbasic.identity%2Boffline%2Bsignin`;
    await this.post(url, {
      form: {
        oneTimeCode: code,
        _trustThisDevice: 'on',
        trustThisDevice: 'on',
        _eventId: 'submit'
      },
      follow: false
    });
  }
  async getFid() {
    let parameters = {
      prompt: 'login',
      accessToken: this.bearer || 'null',
      client_id: 'FIFA-18-WEBCLIENT',
      response_type: 'token',
      display: 'web2/login',
      locale: 'en_US',
      redirect_uri: 'https://www.easports.com/pl/fifa/ultimate-team/web-app/auth.html',
      scope: 'basic.identity offline signin'
    }
    const url = `https://accounts.ea.com/connect/auth${this.createGetParameters(parameters)}`;

    const data = await this.get(url, {
      follow: false
    });

    this.fid = data.res.headers.location.split('fid=')[1];
    this.urlGetExecution = data.res.headers.location;
  }
  async getBearer() {
    //const url = `https://accounts.ea.com/connect/auth?client_id=ORIGIN_JS_SDK&response_type=token&redirect_uri=nucleus:rest&prompt=none`
    let parameters = {
      prompt: this.cookies_set ? undefined : 'login',
      accessToken: this.bearer || 'null',
      client_id: 'FIFA-18-WEBCLIENT',
      response_type: 'token',
      display: 'web2/login',
      locale: 'en_US',
      redirect_uri: 'https://www.easports.com/fifa/ultimate-team/web-app/auth.html',
      scope: 'basic.identity offline signin',
      fid: this.cookies_set ? undefined : this.fid
    }

    const url = `https://accounts.ea.com/connect/auth${this.createGetParameters(parameters)}`;
    //const url = `https://accounts.ea.com/connect/auth?prompt=login&accessToken=${this.bearer || 'null'}&client_id=FIFA-18-WEBCLIENT&response_type=token&display=web2%2Flogin&locale=en_US&redirect_uri=https%3A%2F%2Fwww.easports.com%2Fpl%2Ffifa%2Fultimate-team%2Fweb-app%2Fauth.html&scope=basic.identity+offline+signin&fid=${this.fid}`;
    const data = await this.get(url, {
      follow: false
    });

    //try {
      this.bearer = (data.res.headers.location.split('access_token=')[1]).split('&')[0];
      //console.log('Got access token', this.bearer);
    //} catch(e) {
      //console.warn('login required XDDD');
      //const url = `https://accounts.ea.com/connect/auth?prompt=login&accessToken=${this.bearer ? this.bearer : 'null'}&client_id=FIFA-18-WEBCLIENT&response_type=token&display=web2%2Flogin&locale=en_US&redirect_uri=https%3A%2F%2Fwww.easports.com%2Fpl%2Ffifa%2Fultimate-team%2Fweb-app%2Fauth.html&scope=basic.identity+offline+signin&fid=${this.fid}`;
      //const data = await this.get(url, {
      //  follow: false
      //});
      //this.bearer = (data.res.headers.location.split('access_token=')[1]).split('&')[0];
    //}

    //2do
    //https://www.easports.com/pl/fifa/ultimate-team/web-app/auth.html#access_token=QVQwOjEuMDozLjA6NjA6ZmlnTml3azJRcTZnakNnMzZoZDdYbWVnOFZhZm1uMGh0MWY6NjgzNDM6b2IyN3U&token_type=Bearer&expires_in=3599
    //this.authorizationTokenExpiresAt =
  }
  async getPids() {
    const url = `https://gateway.ea.com/proxy/identity/pids/me`;
    const data = await this.get(url, {
      json: true,
      headers: {
        'Accept': '*/*'
      }
    });
    if(data.body.error) {
      await this.getBearer();
      await this.getPids();
      return;
    }
    this.pids = data.body.pid;
    this.nucleusId = this.pids.externalRefValue;

    return true;
  }
  async getShards() {
    const url = `https://${this.authUrl}/ut/shards/v2`;
    const data = await this.get(url, {
      json: true
    });
    this.shards = data.body.shardInfo;
  }
  async getUtasServer() {
    let finalShard;
    let finalData;
    for(let i = 0; i < this.shards.length; i++) {
      let shard = this.shards[i];
      let shardUrl = `${shard.clientProtocol}://${shard.clientFacingIpPort}/ut/game/fifa18/user/accountinfo?filterConsoleLogin=true&sku=FUT18WEB&returningUserGameYear=2017`;
      try {
        let data = await this.get(shardUrl, {
          json: true
        });
        finalShard = shard;
        finalData = data;
        break;
      } catch(e) {
        //console.log(`Shard ${shard.clientFacingIpPort} doesn't work, it should be ok`);
      }
    }
    if(!finalShard) {
      throw new Error('No working shards');
    }
    this.utas = `${finalShard.clientProtocol}://${finalShard.clientFacingIpPort}`;
    this.persona = finalData.body.userAccountInfo.personas[0];
  }
  async getFosServerCode() {
    const url = `https://accounts.ea.com/connect/auth?client_id=FOS-SERVER&redirect_uri=nucleus:rest&response_type=code&access_token=${this.bearer}`;
    const data = await this.get(url, {
      json: true
    });
    this.fosCode = data.body.code;
  }
  async getUtSid() {
    const url = `${this.utas}/ut/auth?sku_b=FFT18`;
    const data = await this.post(url, {
      form: {
        clientVersion: 1,
        gameSku: this.gameSku,
        identification: {
          authCode: this.fosCode,
          redirectUrl: 'nucleus:rest'
        },
        isReadOnly: false,
        locale: 'en-US',
        method: 'authcode',
        nucleusPersonaId: this.persona.personaId,
        priorityLevel: 4,
        sku: 'FUT18WEB'
      },
      json: true,
      sendJson: true
    });
    this.utSid = data.body.sid;
    this.utas = `${data.body.protocol}://${data.body.ipPort}`;
  }
  async getSecurityQuestion() {
    const url = `${this.utas}/ut/game/fifa18/phishing/question`;
    const data = await this.get(url, {
      json: true
    });

    if(data.body.code == 458) {
      console.log('Captcha is pending, try to solve :)', data.body);
      await this.solveCaptcha();
    }
    //console.log('Got security question info', data.body);

  }
  async answerSecurityQuestion() {
    const answerHashed = eaHasher(this.answer);
    //console.log('answerHashed', answerHashed);
    const url = `${this.utas}/ut/game/fifa18/phishing/validate?answer=${answerHashed}`;
    const data = await this.post(url, {
      form: answerHashed,
      json: true
    });
    if(data.body.code != 200) {
      throw new Error('Could not answer question');
    }
    this.phishingToken = data.body.token;
    //console.log('secret hash data', data);
  }

  //Captcha
  async solveCaptcha() {
    const data = await this.get(`${this.utas}/ut/game/fifa18/captcha/fun/data`, {
      json: true
    });
    await this.captcha.trigger({
      publicKey: data.body.pk,
      blob: data.body.blob,
      siteUrl: 'https://www.easports.com'
    });
  }

  //Fifa functions
  async getMassInfo() {
    const url = `${this.utas}/ut/game/fifa18/usermassinfo`
    const data = await this.get(url, {
      json: true,
      ut: true
    });
    //console.log('Fetched mass info', data);
    this.getCoinsFromCurrencies(data.body.userInfo.currencies);
    return data.body;
  }
  async searchTransferMarket(p) {
    const limit = p.limit || 36;
    const parameters = {
      start: (p.page - 1) * limit,
      num: limit,
      type: 'player',
      maskedDefId: p.baseId,
      //lev: 'bronze',
      //micr: 150,
      //macr: 350,
      minb: p.priceBuyNowMin || undefined,
      maxb: p.priceBuyNowMax || undefined
    }

    const url = `${this.utas}/ut/game/fifa18/transfermarket?${querystring.stringify(parameters)}`
    const data = await this.get(url, {
      json: true,
      ut: true
    });
    //console.log('Searched transfer market :)', data.body);
    return {
      auctions: data.body.auctionInfo
    };
  }
  async putToTradepile(p) {
    const url = `${this.utas}/ut/game/fifa18/item`;
    const data = await this.put(url, {
      form: {
        itemData: [
          {
            id: p.itemId,
            pile: 'trade'
          }
        ]
      },
      sendJson: true,
      json: true,
      ut: true
    });
  }
  async bid(p) {
    const url = `${this.utas}/ut/game/fifa18/trade/${p.tradeId}/bid?sku_b=FFT18`
    try {
      const data = await this.put(url, {
        form: {
          bid: p.coins,
        },
        sendJson: true,
        json: true,
        ut: true
      })
    } catch(e) {
      if(e.message === 'PERMISSION_DENIED') {
        throw new Error('PLAYER_ALREADY_BOUGHT');
      } else {
        throw e;
      }
    }

    this.getCoinsFromCurrencies(data.body.currencies);
    return data.body.auctionInfo;
  }
  async relistAuctions() {
    const url = `${this.utas}/ut/game/fifa18/auctionhouse/relist`
    const data = await this.put(url, {
      json: true,
      ut: true
    })
    return data.tradeIdList;
    /*
    {"tradeIdList":[
      {
        "id":21239961928,
        "idStr":"21239961928"
      }
    ]}
    */
  }
  async getTradePile() {
    const url = `${this.utas}/ut/game/fifa18/tradepile`
    const data = await this.get(url, {
      json: true,
      ut: true
    })

    this.updateCoins(data.body.credits);
    return data.body.auctionInfo;
    /*
    {"credits":2629,"auctionInfo":[{"tradeId":21239961928,"itemData":{"id":126899379879,"timestamp":1534004938,"formation":"f433","untradeable":false,"assetId":215368,"rating":63,"itemType":"player","resourceId":215368,"owners":2,"discardValue":19,"itemState":"forSale","cardsubtypeid":1,"lastSalePrice":200,"morale":50,"fitness":99,"injuryType":"none","injuryGames":0,"preferredPosition":"RB","statsList":[{"value":0,"index":0},{"value":0,"index":1},{"value":0,"index":2},{"value":0,"index":3},{"value":0,"index":4}],"lifetimeStats":[{"value":0,"index":0},{"value":0,"index":1},{"value":0,"index":2},{"value":0,"index":3},{"value":0,"index":4}],"training":0,"contract":7,"suspension":0,"attributeList":[{"value":73,"index":0},{"value":44,"index":1},{"value":53,"index":2},{"value":60,"index":3},{"value":60,"index":4},{"value":59,"index":5}],"teamid":252,"rareflag":0,"playStyle":250,"leagueId":80,"assists":0,"lifetimeAssists":0,"loyaltyBonus":0,"pile":5,"nation":4,"marketDataMinPrice":150,"marketDataMaxPrice":10000,"resourceGameYear":2018},"tradeState":"active","buyNowPrice":200,"currentBid":0,"offers":0,"watched":true,"bidState":"none","startingBid":150,"confidenceValue":100,"expires":3600,"sellerName":null,"sellerEstablished":0,"sellerId":0,"tradeOwner":true,"tradeIdStr":"21239961928"}],"bidTokens":{}}
    */
  }
  async sell(p) {
    const url = `${this.utas}/ut/game/fifa18/auctionhouse?sku_b=FFT18`
    const data = await this.post(url, {
      form: {
        buyNowPrice: p.priceBuyNow,
        duration: p.duration,
        itemData: {
          id: p.itemId /*itemData.id */
        },
        startingBid: p.priceBid
      },
      sendJson: true,
      json: true,
      ut: true
    });
    /* REQUEST
    {"itemData":{"id":121088671531},"startingBid":150,"duration":3600,"buyNowPrice":200}
    */
  }

  async deleteSoldAuctions() {
    const url = `${this.utas}/ut/game/fifa18/trade/sold`
    try {
      await this.delete(url, {
        ut: true
      });
    } catch(e) {
      throw new Error('Could not delete sold auctions');
    }
  }

  //Misc
  getCoinsFromCurrencies(currencies) {
    currencies.forEach(currency => {
      if(currency.name == 'COINS') {
        this.updateCoins(currency.finalFunds);
      }
    });
  }

  updateCoins(coins) {
    this.coins = coins;
    this.emit('coinsUpdate', coins);
  }
  cookies(json) {
    if(json) {
      this.bearer = json.bearer;
      this.fid = json.fid;

      this.jar._jar = this.jar._jar._importCookiesSync(json.jar);
      //this.jar._jar.cookies = json.jar._jar.cookies;

      this.cookies_set = true;
    } else {
      let final_json = {
        jar: this.jar._jar.serializeSync(),
        fid: this.fid,
        bearer: this.bearer
      };
      return final_json;
    }

  }
  createGetParameters(parameters) {
    let finalParameters = [];
    Object.keys(parameters).forEach(key => {
      if(typeof(parameters[key]) !== 'undefined') {
        //finalParameters[finalParameters.length] = `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`;
        finalParameters[finalParameters.length] = `${key}=${parameters[key]}`;
      }
    })
    if(finalParameters.length == 0) {
      return '';
    }
    return `?${finalParameters.join('&')}`;
  }

  //Requests
  delete(url, options) {
    if(!options) {
      options = {};
    }
    options.method = 'DELETE';
    return this.request(url, options);
  }
  put(url, options) {
    if(!options) {
      options = {};
    }
    options.method = 'PUT';
    return this.request(url, options);
  }
  get(url, options) {
    if(!options) {
      options = {};
    }
    options.method = 'GET';
    return this.request(url, options);
  }
  post(url, options) {
    if(!options) {
      options = {};
    }
    options.method = 'POST';
    return this.request(url, options);
  }
  request(url, options) {
    if(!options) {
      options = {};
    }
    let that = this;
    return new Promise((resolve, reject) => {
      //Default settings
      let form = options.form || {};
      let follow = typeof(options.follow) !== 'undefined' ? options.follow : true;
      let method = options.method || 'POST';
      let body = '';
      let headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36'
      };

      //Send json or querystring
      if(options.form) {
        if(options.sendJson) {
    			body = JSON.stringify(form);
    		} else {
    			body = querystring.stringify(form);
          headers['Content-Type'] = 'application/x-www-form-urlencoded';
    		}
      }

      //Send bearer if defined
      if(this.bearer && options.useAccessToken !== false) {
        headers['Authorization'] = `Bearer ${this.bearer}`;
      }

      //Send EASW Nucleus
      if(this.nucleusId) {
        headers['Easw-Session-Data-Nucleus-Id'] = this.nucleusId;
      }

      //Send UT SID
      if(this.utSid) {
        headers['X-UT-SID'] = this.utSid;
      }

      //Use phishing token
      if(this.phishingToken) {
        headers['X-UT-PHISHING-TOKEN'] = this.phishingToken;
      }

      //Use csrf token
      if(this.csrf) {
        headers['X-CSRF-TOKEN'] = this.csrf;
      }


      //Add other headers
      if(options.headers) {
        Object.assign(headers, options.headers);
      }

      let request_options = {
        headers: headers,
        uri: url,
        body: body,
        method: method,
        followRedirect: follow,
        jar: this.jar,
      };

      if(process.env.FIDDLER == 1) {
        request_options.rejectUnauthorized = false;
      }
      if(options.replace_spaces_with_pluses_in_form) {
        request_options.body = request_options.body.replaceAll('%20', '+');
      }
      //console.log(request_options);

      //Set proxy for debugging purposes
      if(process.env.FIDDLER == 1) {
        request_options.proxy = 'http://127.0.0.1:8888'
        //console.log('Use fiddler my friend');
      } else {
        if(this.proxy) {
          //console.log('Use proxy my friend');
          if(this.proxy_user) {
            request_options.proxy = `http://${this.proxy_user}:${this.proxy_password}@${this.proxy}`;
          } else {
            request_options.proxy = `http://${this.proxy}`;
          }
        } else {
          //console.log(`Dont use proxy my friend`);
        }
      }
      if((options.unzip || url.indexOf('/cp-ui/') > -1) && process.env.FIDDLER != 1) {
        request_options.encoding = null;
      }

      //Make request
      request(request_options, async function(err, res, body) {
        if(!err) {



          if((options.unzip || url.indexOf('/cp-ui/') > -1) && process.env.FIDDLER != 1) {
            try {
              body = await that.unzip_body(body);
            } catch(e) {
              body = body.toString();
            }
          }



          if(options.ut && res.statusCode !== 200) {
            //458 - puzzle captcha
            if(res.statusCode === 358) {
              return reject(new Error('FUN_CAPTCHA_REQUIRED'));
            }

            //426 - upgrade required (? XD)
            //429 - too many requests (too many actions have been taken)
            //521 - error (unknown but it's always related with too many requests)

            if(futxErrors[res.statusCode]) {
              return reject(new Error(futxErrors[res.statusCode]));
            }
            return reject(new Error(`INVALID_RESPONSE_CODE_${res.statusCode}`));
          }

          if(options.json) {
            try {
              body = JSON.parse(body);
              if(body.code == 401) {
                this.logged = false;
                return reject(new Error('UNAUTHORIZED'));
              }
              //{"message":null,"reason":"expired session","code":401}
            } catch(e) {
              return reject(e);
            }
          }

          resolve({res: res, body: body});
        } else {
          reject(err);
        }
      });
    });
  }

}
