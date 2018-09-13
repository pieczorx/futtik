class PopupAddAccount {
  constructor() {
    let that = this;
    $(document).on('click', `[data-role='showPopup'][data-popup-name='addAccount']`, () => {
      this.show();
    });
    $(document).on('click', `[data-role='hidePopup'][data-popup-name='addAccount']`, () => {
      this.hide();
    });
    $(document).on('change', `[data-role='popupAddAccountImport']`, async function() {
      const file = $(this)[0].files[0];
      const rows = await csv.loadFromFile(file);
      for(let i = 0; i < rows.length; i++) {
        let row = rows[i];
        try {
          autoBuyer.addAccountValidate(row);
        } catch(e) {
          alert(`Error in row ${i + 2}: ${e.message}`);
          return;
        }
      }
      for(let i = 0; i < rows.length; i++) {
        let row = rows[i];
        autoBuyer.addAccount(row);
      }
      that.hide();
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
