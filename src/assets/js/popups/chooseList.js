class PopupChooseList {
  constructor() {
    this.name = 'chooseList';
    let that = this;
    $(document).on('click', `[data-role='hidePopup'][data-popup-name='${this.name}']`, () => {
      this.hide();
    });
    $(document).on('click', `[data-role='popupChooseListElement']`, function() {
      $(this).attr('data-selected', $(this).attr('data-selected') == 1 ? 0 : 1);
    });
    $(document).on('click', `[data-role='popupChooseListSelectAll']`, function() {
      const name = $(this).closest(`[data-role='popupChooseListCategory']`).attr('data-name');
      let isAtLeastOneSelected = false;
      $(`[data-role='popupChooseListCategory'][data-name='${name}'] [data-role='popupChooseListElement']`).each(function() {
        if($(this).attr('data-selected') == 1) {
          isAtLeastOneSelected = true;
        }
      });
      $(`[data-role='popupChooseListCategory'][data-name='${name}'] [data-role='popupChooseListElement']`).each(function() {
        $(this).attr('data-selected', !isAtLeastOneSelected << false)
      });

    });

    $(document).on('click', `[data-role='popupChooseListSave']`, () => {
      let finalArray = [];
      $(`[data-role='popupChooseListElement'][data-selected='1']`).each(function() {
        finalArray.push($(this).attr('data-name'));
      });
      if(typeof this.callback === 'function') {
        this.callback(finalArray);
      }
      this.hide();
    });



  }
  show(options) {
    return new Promise((resolve, reject) => {
      this.callback = (res) => {
        resolve(res);
      };
      const el = $(`[data-role='popupChooseListCategories']`);
      el.empty();
      for(let category of options.categories) {
        for(let categoryElement of category.list) {
          if(options.selected && options.selected.length > 0 && options.selected.includes(categoryElement.name)) {
            categoryElement.selected = true;
          }

        }
        el.append(html.popupChooseListCategory(category))
      }

      $(`[data-popup='${this.name}']`).attr('data-show', 1);
      setTimeout(() => {
        listExpandable.update();
      }, 50);
    });

    //$(`body`).attr('data-blur', 1);
  }
  hide() {
    $(`[data-popup='${this.name}']`).attr('data-show', 0);
    //$(`body`).attr('data-blur', 0);
  }
}

const popupChooseList = new PopupChooseList();
