
$(document).on('input', `input`, async function() {
  const v1 = $(`[data-role='test1']`).val();
  const v2 = $(`[data-role='test2']`).val();



  const CryptoJS = require("crypto-js");

  v3 = await fse.readJson('analyze/image.json');

  console.log(v3)
  v3 = JSON.stringify(v3)
  console.log(v3)

  const CryptoJSAesJson = {
    stringify: function (cipherParams) {
    	var j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
    	if (cipherParams.iv) j.iv = cipherParams.iv.toString();
    	if (cipherParams.salt) j.s = cipherParams.salt.toString();
    	return JSON.stringify(j);
    },
    parse: function (jsonStr) {
    	var j = JSON.parse(jsonStr);
    	var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)});
    	if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
    	if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
    	return cipherParams;
    }
  }
  v3
  const decryptionKey = '2695b7fb43bb1bdf1.4566348805';

  v3 = CryptoJS.AES.decrypt(v3 , decryptionKey, {format: CryptoJSAesJson})
  v3 = v3.toString(CryptoJS.enc.Base64);
  v3 = atob(v3)
  v3 = btoa(v3)
  v3 = "data:image/jpeg;base64," + v3;

  $(`[data-role='test3']`).prop('src', v3)
});
