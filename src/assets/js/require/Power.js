class Power {
  constructor() {
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
    a.reload();
  }

  updateTime() {
    if(this.state) {
      const currentTime = new Date();
      let timeString = currentTime - this.startTime
      timeString = timeString / 1000;
      timeString = timeString.toFixed(1) + 's';
      $(`[data-role='powerText']`).text(timeString)
    } else {
      $(`[data-role='powerText']`).text('Bots off')
    }
  }
}
