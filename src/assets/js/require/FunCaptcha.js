const CryptoJSAesJson = {
  stringify: function (cipherParams) {
    let j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
    if (cipherParams.iv) j.iv = cipherParams.iv.toString();
    if (cipherParams.salt) j.s = cipherParams.salt.toString();
    return JSON.stringify(j);
  },
  parse: function (jsonStr) {
    let j = JSON.parse(jsonStr);
    let cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)});
    if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
    if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
    return cipherParams;
  }
}

class FunCaptcha extends Emitter {
  constructor(options) {
    super();
    this.captchas = [];
    Object.assign(this, options)
  }
  decodeImage(data, key) {
    let v3 = '';
    v3 = CryptoJS.AES.decrypt(data , key, {format: CryptoJSAesJson})
    v3 = v3.toString(CryptoJS.enc.Base64);
    v3 = atob(v3)
    v3 = btoa(v3)
    v3 = "data:image/jpeg;base64," + v3;
    return v3;
  }

  decodeAnswer() {

  }

  encodeBda(P6R) {
    let g1P = "join";
    let g4R = "";
    let n4R = "slice";
    let n6R = false;
    let R5P = "charCodeAt";
    let E8R = 16;
    let x8R = 63;
    let e8P = "charAt";
    let d6R, y6R, W6R, Z6R, j6R, b6R, N6R, D6R, p6R = [],
        t6R = g4R,
        s6R, T6R, x6R;

    let L6R = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    T6R = n6R ? Z5R.encode(P6R) : P6R;

    s6R = T6R.length % 3;
    if (s6R > 0)
        while (s6R++ < 3) {
            t6R += "=";
            T6R += "\x00";
        }
    for (s6R = 0; s6R < T6R.length; s6R += 3) {
        d6R = T6R[R5P](s6R);
        y6R = T6R[R5P](s6R + 1);
        W6R = T6R[R5P](s6R + 2);
        Z6R = d6R << E8R | y6R << 8 | W6R;
        j6R = Z6R >> 18 & x8R;
        b6R = Z6R >> 12 & x8R;
        N6R = Z6R >> 6 & x8R;
        D6R = Z6R & x8R;
        p6R[s6R / 3] = L6R[e8P](j6R) + L6R[e8P](b6R) + L6R[e8P](N6R) + L6R[e8P](D6R);
    }
    x6R = p6R[g1P](g4R);
    x6R = x6R[n4R](0, x6R["length"] - t6R["length"]) + t6R;
    return x6R;
  }


  async trigger({publicKey, siteUrl, blob}) {

    const resGetJsMdString  = await this.post(`https://funcaptcha.com/fc/api/?onload=loadFunCaptcha`)
    const jsMdString = this.getFromBetween(resGetJsMdString.body, `https://cdn.funcaptcha.com/fc/js/`, `/standard/funcaptcha_api.js`);

    let bdaData = [{
        key: "api_type",
        value: "js"
    }];

    const resPublicKey = await this.post(`https://funcaptcha.com/fc/gt2/public_key/${publicKey}`, {
      json: true,
      form: {
        bda: this.encodeBda(JSON.stringify(bdaData)),
        public_key: publicKey,
        site: 'https://www.easports.com',
        userbrowser: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
        simulate_rate_limit: 0,
        language: 'en',
        rnd: Math.random(),
        data: {
          blob: blob
        }
      },
      headers: {
        'Origin': siteUrl
      }
    });

    let tokenResponse = {};
    let resPublicKeyValuesArray = resPublicKey.body.token.split('|')
    const token = resPublicKeyValuesArray[0];
    resPublicKeyValuesArray.shift();

    for(let x of resPublicKeyValuesArray) {
      let xSplitted = x.split('=');
      tokenResponse[xSplitted[0]] = xSplitted[1];
    }

    console.log(tokenResponse, token);

    /*
    token: 3785b8c9b9fce7516.7820589101
    r: us-east-1
    metabgclr: transparent
    guitextcolor: %23606060
    metaiconclr: %23606060
    meta: 6
    lang: en
    pk: A4EECF77-AC87-8C8D-5754-BF882F72063B
    injs: https://cdn.funcaptcha.com/fc/assets/graphics/ea/script/privacy_policy_fifa_2.js
    at: 40
    ht: 1
    atp: 2
    cdn_url: https://cdn.funcaptcha.com/fc
    lurl: https://audio-us-east-1.funcaptcha.com
    surl: https://funcaptcha.com
    */

    const requestId = CryptoJS.AES.encrypt(`{}`, `REQUESTED${token}ID`, {
      format: CryptoJSAesJson
    }).toString();

    const resCaptchas = await this.post(`https://funcaptcha.com/fc/gfct/`, {
      headers: this.getHeaders(requestId),
      form: {
        token: token,
        sid: tokenResponse.r,
        lang: 'en',
        render_type: 'canvas',
        analytics_tier: 40,
        data: {
          status: 'init'
        }
      },
      json: true
    });

    //Get images
    const imageUrls = resCaptchas.body.game_data.customGUI._challenge_imgs;
    let finalImages = [];
    for(let imageUrl of imageUrls) {
      let resImage = await this.get(imageUrl);
      finalImages[finalImages.length] = (resImage.body);

    }

    //Get image encryption key
    const resEncryptionKey = await this.post(`https://funcaptcha.com/fc/ekey/`, {
      headers: this.getHeaders(requestId),
      form: {
        sid: tokenResponse.r,
        session_token: token,
        game_token: resCaptchas.body.challengeID
      },
      json: true,
    })

    //Go through all images
    for(let image of finalImages) {
      let finalImage = this.decodeImage(image, resEncryptionKey.body.decryption_key);
      await this.requestCaptchaAnswer({
        imgUrl: finalImage
      });
      //$("body").append(`<img src="${finalImage}" style="width: 100px;"/>`);
    }


    //Post answer

  }

  getHeaders(requestId) {
    return {
      'X-NewRelic-Timestamp': this.getTimestamp(),
      'X-Requested-ID': requestId,
      'cache-control': `no-cache`
    }
  }
  getTimestamp() {
    const date1 = new Date().getTime().toString().substring(0, 7);
    const date2 = new Date().getTime().toString().substring(7, 13);
    return `${date1}00${date2}`
  }

  getRequestId() {

  }

  encryptAESMessage() {

  }

  decryptAESMessage() {

  }

  requestCaptchaAnswer(options) {
    return new Promise((resolve, reject) => {
      options.onAnswer = resolve;
      this.captchas[this.captchas.length] = options;
      this.onRequest();
    });
  }

  getFromBetween(str, a, b) {
    return str.substring(
      str.lastIndexOf(a) + 1,
      str.lastIndexOf(b)
    );
  }

  get(url, options) {
    if(!options) {
      options = {}
    }
    Object.assign(options, {method: 'GET'});
    return this.request(url, options);
  }
  post(url, options) {
    if(!options) {
      options = {}
    }
    Object.assign(options, {method: 'POST'});
    return this.request(url, options);
  }
  request(url, options) {
    return new Promise((resolve, reject) => {
      if(!options.headers) {
        options.headers = {};
      }
      const headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',

      };
      if(process.env.FIDDLER == 1) {
        options.rejectUnauthorized = false;
      }
      if(process.env.FIDDLER == 1) {
        options.proxy = 'http://127.0.0.1:8888'
      }
      request(url, options, (error, response, body) => {
        console.log('request done statusCode:', response.statusCode); // Print the response status code if a response was received
        if(!error) {
          resolve({response, body})
        } else {
          reject(error);
          console.log('error:', error); // Print the error if one occurred

        }
        //console.log('body:', body); // Print the HTML for the Google homepage.
      });
    });
  }
}
