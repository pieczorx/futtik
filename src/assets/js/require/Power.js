class Power extends Emitter {
  constructor() {
    super();
    this.state = false;
    $(document).on('click', `[data-role='powerToggle']`, () => {
      this.updateState(!this.state)
    });
  }

  updateState(state) {
    this.state = state;

    clearInterval(this.intervalUpdate)

    if(state) {
      this.startTime = new Date();
      this.intervalUpdate = setInterval(() => {
        this.updateTime();
      }, 100);
    }
    this.updateTime();
    $(`[data-role='power']`).attr('data-state', this.state << false);
    this.emit('update');
  }

  convertTimeToString(diff) {
    diff = Math.floor(diff / 1000);
    const data = [
      //['MS', 1000, 1],
      ['s', 60],
      ['m', 60],
      ['h', 60],
      ['d', 24]
    ]
    const vals = data.reduce((acc, x) => {
      const val = Math.floor(acc.diff % x[1]);
      if(acc.diff >= 1 || acc.string == '') {
        acc.string = `${val.toFixed(x[2] || 0)}${x[0]} ${acc.string}`
      }
      acc.diff = acc.diff / x[1];
      return acc;
    }, {string: '', diff: diff});
    return vals.string;
  }

  updateTime() {
    if(this.state) {
      const currentTime = new Date();
      let diff = currentTime - this.startTime
      $(`[data-role='powerText']`).text(this.convertTimeToString(diff))
    } else {
      $(`[data-role='powerText']`).text('Bots off')
    }
  }
}
