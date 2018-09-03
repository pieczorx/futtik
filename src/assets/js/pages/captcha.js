class PageCaptcha {
  constructor() {
    funCaptcha.on('');
  }


  updateCaptchas() {
    let eList = $(`[data-role='captchaList']`);
    eList.empty();
    funCaptcha.captchas.forEach(captcha => {
      eList.append(html.captchaListElement(captcha))
    });
  }

  appendImageDiv(p) {
    $(`[data-role='captchaList']`).append(html.captchaListElement(p))
  }
}
