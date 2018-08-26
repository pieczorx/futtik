class PageCaptcha {
  constructor() {

  }


  updateCaptchas() {
    let eList = $(`[data-role='captchaList']`);
    eList.empty();
    funCaptcha.captchas.forEach(captcha => {
      eList.append(html.captchaListElement(captcha))
    });
  }
}
