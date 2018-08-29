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

class FunCaptcha {
  constructor(options) {
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

  encodeBda(string) {
    n6R = typeof n6R == "undefined" ? false : n6R;
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
    const jsMdString = this.getFromBetween(res, `https://cdn.funcaptcha.com/fc/js/`, `/standard/funcaptcha_api.js`);

    let bdaData = [{
        key: "api_type",
        value: "js"
    }];

    await this.post(`https://funcaptcha.com/fc/gt2/public_key/${publicKey}`, {
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


    await this.post(`https://funcaptcha.com/fc/gfct/`, {
      headers: {
        'X-NewRelic-Timestamp': `153509500866200`,
        'X-Requested-ID': `{"ct":"43RPIQBvveDmSSkS0qrTYQ==","iv":"c396d58b84f59673522c4c636ce56e68","s":"31cbd93dc2557280"}`
      },

    });

    //Post answer
    await this.requestCaptchaAnswer({
      imgUrl: 'asdasd'
    });
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

  post(url, options) {
    Object.assign(options, {method: 'POST'});
    return this.request(url, options);
  }

  post(url, options) {
    Object.assign(options, {method: 'GET'});
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
