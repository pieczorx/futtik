class PopupAddAccount {
  constructor() {
    $(document).on('click', `[data-role='showPopup'][data-popup-name='addAccount']`, () => {
      this.show();
    });
  }
  show() {
    $(`[data-popup='addAccount']`).attr('data-show', 1);
    $(`body`).attr('data-blur', 1);
  }
  hide() {
    $(`[data-popup='addAccount']`).attr('data-show', 0);
    $(`body`).attr('data-blur', 0);
  }
}
const popupAddAccount = new PopupAddAccount();
