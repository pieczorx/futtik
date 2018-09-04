class SmallMenu {
  constructor() {
    this.toggleState(false)
    $(document).on('click', `[data-role='smallMenuSwitch']`, () => {
      this.toggleState()
    });
  }
  toggleState(state) {
    if(!state) {
      state = !this.state
    }
    this.state = state;
    $(`body`).attr('data-small-menu', this.state << false);
  }
}
