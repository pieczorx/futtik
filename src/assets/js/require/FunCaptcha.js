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
  decodeImage(data, key) {
    let v3 = '';
    v3 = CryptoJS.AES.decrypt(data , key, {format: CryptoJSAesJson})
    v3 = v3.toString(CryptoJS.enc.Base64);
    v3 = atob(v3)
    v3 = btoa(v3)
    v3 = "data:image/jpeg;base64," + v3;
    return v3;
  }

  async trigger({publicKey, siteUrl}) {
    const resGetJsMdString  = await this.post(`https://funcaptcha.com/fc/api/?onload=loadFunCaptcha`)
    const jsMdString = this.getFromBetween(res, `https://cdn.funcaptcha.com/fc/js/`, `/standard/funcaptcha_api.js`);

    await this.post(`https://funcaptcha.com/fc/gt2/public_key/${publicKey}`, {
      json: true,
      form: {
        bda: ???,
        public_key: publicKey,
        site: 'https://www.easports.com',
        userbrowser: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
        simulate_rate_limit: 0,
        language: 'en',
        rnd: 0.22997980742632196,
        `data[blob]`: `Dp6Aou2HnQ0mfNbi.HGnsamuXSHt6cQD/t2RNx5dyBgBqkmQ4s+HnTEEx8I7RW9qv7vTEeqwjsj9haUzUNsMUMKRJbJEvvmi24cmNKZlvIVocJp3jtNlAr9BXA3TntxIrzHxnBHFq4ccNKL9mLBpKPlsPsDV6wwn6DQ4bsgXaBe8nFQB18xUy5WHJfHysc0ywVvLszYhRrPgwmBDSeM/zAZo3LDyAdQBMqnfIXHowhLy6JzhaV7JpYWeNXYiq0s/IKkTOtRj2UVAlb5k=`
      }
    });


    await this.post(`https://funcaptcha.com/fc/gfct/`, {
      headers: {
        `X-NewRelic-Timestamp`: `153509500866200`,
        `X-Requested-ID`: `{"ct":"43RPIQBvveDmSSkS0qrTYQ==","iv":"c396d58b84f59673522c4c636ce56e68","s":"31cbd93dc2557280"}`
      },

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

const funCaptcha = new FunCaptcha();
