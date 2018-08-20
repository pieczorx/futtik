class PopupLoadingInitial {
  constructor() {
    this.name = 'loadingInitial'
    $(document).on('click', `[data-role='showPopup'][data-popup-name='${this.name}']`, () => {
      this.show();
    });
    $(document).on('click', `[data-role='hidePopup'][data-popup-name='${this.name}']`, () => {
      this.hide();
    });
  }
  show() {
    $(`[data-popup='${this.name}']`).attr('data-show', 1);
  }
  hide() {
    $(`[data-popup='${this.name}']`).attr('data-show', 0);
    $(`body`).attr('data-loaded', 1);
  }
}
const popupLoadingInitial = new PopupLoadingInitial();
