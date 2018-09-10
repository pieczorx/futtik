class PopupChooseColors {
  constructor() {
    this.name = 'addProxy';
    $(document).on('click', `[data-role='showPopup'][data-popup-name='${this.name}']`, () => {
      this.show();
    });
    $(document).on('click', `[data-role='hidePopup'][data-popup-name='${this.name}']`, () => {
      this.hide();
    });
  }
  show(options) {
    $(`[data-popup='${this.name}']`).attr('data-show', 1);
    //$(`body`).attr('data-blur', 1);
  }
  hide() {
    $(`[data-popup='${this.name}']`).attr('data-show', 0);
    //$(`body`).attr('data-blur', 0);
  }
}

const popupChooseColors = new PopupChooseColors();
