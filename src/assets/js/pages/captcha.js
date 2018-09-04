class PageCaptcha {
  constructor() {
    let that = this;
    funCaptcha.on('solveRequest', () => {
      this.updateCaptchas();
    });

    $(document).on('click', `[data-role='captchaListElement'] button`, function() {
      const el = $(this).closest(`[data-role='captchaListElement']`);
      const id = el.attr('data-id');
      console.log('solve', id);
      for(let captcha of funCaptcha.captchas) {
        if(captcha.id == id) {
          console.log('mamy');
          captcha.onAnswer(el.attr('data-spins'));
          captcha.solved = true;
        }
      }
      el.fadeOut(250);
    });

    $(document).on('click', `[data-role='captchaElementSpin']`, function() {
      const el = $(this).closest(`[data-role='captchaListElement']`);
      const direction = $(this).attr('data-direction');
      const slices = parseInt(el.attr('data-slices'));
      let spins = parseInt(el.attr('data-spins'));

      spins = spins + (direction == 'left' ? 1 : -1);
      const degrees = (spins / slices) * 360;
      console.log('final degrees: ', spins, slices, direction);
      el.attr('data-spins', spins)
      el.find('img').css('transform', `rotate(${degrees}deg)`)

    });
  }

  async _load() {
    this.updateCaptchas();
  }

  updateCaptchas() {
    let eList = $(`[data-role='captchaList']`);
    eList.empty();
    funCaptcha.captchas.forEach(captcha => {
      if(captcha.solved) {
        return;
      }
      eList.append(html.captchaListElement(captcha))
    });
  }
}
