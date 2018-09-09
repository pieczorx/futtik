class MenuCounter {
  constructor() {

  }
  init() {
    setInterval(() => {
      this.update();
    }, 250);
    this.update();
  }

  update() {
    let values = {}
    let active = {}

    //Bots
    const accountsMax = autoBuyer.accounts.length;
    const accountsEnabled = autoBuyer.accounts.filter(account => {return account.logged;}).length;
    values.bots = `${accountsEnabled} / ${accountsMax}`;

    //Players
    values.players = autoBuyer.players.filter(player => {
      return player.current[currentPlatform()];
    }).length

    //Captcha
    const captchaCount = funCaptcha.captchas.filter(captcha => {return !captcha.solved;}).length;
    if(captchaCount > 0) {
      values.captcha = captchaCount;
      active.captcha = true;
    }

    //Proxies
    values.proxies = database.proxies.length;
    
    $(`[data-role='menuCount']`).each(function() {
      const name = $(this).attr('data-name');
      const hasValue = typeof values[name] !== 'undefined';
      $(this).html(hasValue ? values[name] : '');
      $(this).attr('data-show', hasValue << false)
      $(this).attr('data-active', active[name] << false)

    });
  }

}
