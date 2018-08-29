class Table {
  constructor(info) {
    this.filters = {}
    Object.assign(this, info);
    this.filters.page = 1;
    console.log('filterxds', this.filters)
    let that = this;

    $(document).on(`click`, `[data-table='${this.name}'] [data-table-role='loadMore']`, () => {
      this.filters.page++;
      this.changeFilters({isPage: true});
    });

    $(document).on(`click`, `[data-table='${this.name}'] [data-table-role='pagingPrevious'], [data-table-name='${this.name}'][data-table-role='pagingPrevious']`, () => {
      if(this.filters.page == 1){
        return;
      }
      this.filters.page--;
      this.changeFilters({isPage: true});
    });

    $(document).on(`click`, `[data-table='${this.name}'] [data-table-role='pagingNext'], [data-table-name='${this.name}'][data-table-role='pagingNext']`, () => {
      if(this.paging.next == false){
        return;
      }
      this.filters.page++;
      this.changeFilters({isPage: true});
    });

    $(document).on(`keyup`, `[data-table='${this.name}'] [data-table-role='filter'][data-type='text'] input`, function() {
      const name = $(this).closest(`[data-table-role='filter']`).attr('data-name');
      const value = $(this).val();
      that.filters[name] = value;
      that.changeFilters();
    });

    $(document).on(`keyup mouseup change`, `[data-table='${this.name}'] [data-table-role='filter'][data-type='numericFromTo'] input`, function() {
      const name = $(this).closest(`[data-table-role='filter']`).attr('data-name');
      const valueFrom = $(this).closest(`[data-table-role='filter']`).find(`input[data-type='from']`).val();
      const valueTo = $(this).closest(`[data-table-role='filter']`).find(`input[data-type='to']`).val();

      const value = [valueFrom, valueTo];
      console.log(value)
      that.filters[name] = value;
      that.changeFilters();
    });
  }

  getParamsFromFilters() {
    let values = [];

    Object.keys(this.filters).forEach(key => {
      if(typeof(this.filters[key]) == 'undefined' || this.filters[key] == ''){
        return;
      }
      values[values.length] = `${key}=${encodeURIComponent(this.filters[key])}`;
    });
    let params = values.join('&');
    console.log('params',params);

    return params;
  }

  setFiltersFromParams(params) {
    // console.log(params);
    let values = params.split('&');
    let filters = {}
    values.forEach(value => {
      let exValue = value.split('=')
      filters[exValue[0]] = decodeURIComponent(exValue[1]);
    });
    console.log('filters', filters);
    Object.assign(this.filters, filters);
    this.changeFilters({
      dontChangeURL: true
    });
  }

  changeFilters(options) {
    if(!options){
      options = {}
    }

    let params = this.getParamsFromFilters();

    if(!options.dontChangeURL){
      //a.go(`/users/${params}/`);
    }

    if(!options.isPage){
      this.filters.page = 1;
    }
    if(typeof(this.onFilterChange) == 'function'){
      this.toggleLoadingState(true);
      this.onFilterChange();
      //this.emit('filterChange');
    }
  }

  toggleLoadingState(state) {
    let el = $(`[data-table='${this.name}']`);
    el.attr('data-loading', state << false);
  }

  init() {
    this.update();

  }

  update() {
    let el = $(`[data-table='${this.name}']`);
    if(!el.has("table:has(thead)").length){
      el.html(`
        <table${this.hideBorders ? ` cellspacing="0" cellpadding="0"` : ''}></table>
        <div class="paging">
          <div data-table-role="pagingPrevious">Previous</div>
          <div data-table-role="pagingNext">Next</div>
          <div data-table-role="count"></div>
        </div>
        <div class="empty">${this.htmlEmpty}</div>
        <!--<div data-table-role="loadMore">${this.htmlLoadMore}</div>-->
      `);
    }

    this._getData();

    $(`[data-table='${this.name}'] [data-table-role='pagingPrevious'], [data-table-name='${this.name}'][data-table-role='pagingPrevious']`).attr(`data-disabled`, !this.paging.previous << false).prop(`disabled`, !this.paging.previous << false);
    $(`[data-table='${this.name}'] [data-table-role='pagingNext'], [data-table-name='${this.name}'][data-table-role='pagingNext']`).attr(`data-disabled`, !this.paging.next << false).prop(`disabled`, !this.paging.next << false);

    $(`[data-table='${this.name}'] [data-table-role='count']`).html(`${this.rows.length * this.filters.page} / ${this.count}`);
    $(`[data-table-name='${this.name}'][data-table-role='countAll']`).html(this.countAll);
    $(`[data-table-name='${this.name}'][data-table-role='countAllSelected']`).html(this.countAllSelected);
    el.attr('data-empty', !(this.rows.length > 0) << false)
    if(this.rows.length > 0) {

      $(`[data-table='${this.name}'] > table > tbody`).remove();
      if(!el.has("table:has(thead)").length){
        this.appendRow(this.fields.map(field => field.title), true);
        this.appendSearchRow();
        $(`[data-table='${this.name}'] tr:has(th)`).wrapAll('<thead></thead>');
      }

      this.appendData();
      $(`[data-table='${this.name}'] tr:has(td)`).wrapAll('<tbody></tbody>');


    } else {

      //TODO
      $(`[data-table='${this.name}'] > table > tbody`).remove();
      if(!el.has("table:has(thead)").length){
        this.appendRow(this.fields.map(field => field.title), true);
        this.appendSearchRow();
        $(`[data-table='${this.name}'] tr:has(th)`).wrapAll('<thead></thead>');
      }

      // this.setEmpty();
    }

    this.toggleLoadingState(false);
  }

  // updateNoHeader() {
  //   let table = $(`[data-table='${this.name}']`);
  //
  // }

  appendSearchRow() {
    this.appendRow(this.fields.map(field => {
      let fieldType = field.search;
      let inputHTML;

      if(typeof(field.search) == 'object'){
        fieldType = field.search.type;
      }
      console.log(field)
      switch(fieldType){
        case 'text':
          inputHTML = `<input placeholder="Search ${field.title}"/>`
          break;
        case 'numericFromTo': {
          inputHTML = `
          <input type="number" placeholder="From" data-type="from" min="${field.search.min}" max="${field.search.max}"/>
          <input type="number" placeholder="To" data-type="to" min="${field.search.min}" max="${field.search.max}"/>
          `;
          break;
        }
        case 'date': {
          inputHTML = `<input type="date" id="start"/> <input type="date" id="end"/>`
          break;
        }

        case 'select': {
          let fieldsHTML = ``;
          for (var i = 0; i < field.search.fields.length; i++) {
            fieldsHTML += `<option>${field.search.fields[i]}</option>`
          }
          inputHTML = `<select>${fieldsHTML}</select>`
          break;
        }
        default: {
          return '';
        }
      }

      return `<div data-table-role="filter" data-name="${field.name}" data-type="${fieldType}">${inputHTML}</div>`;
    }), true);
  }

  setEmpty() {
    // let el = $(`[data-table='${this.name}']`);
    // el.html(`${this.empty}`);
    $(`[data-table='${this.name}'] > table > tbody`).empty();
  }

  _getData() {
    Object.assign(this, this.getData());
  }

  appendData() {
    this.rows.forEach((row, id) => {
      let values = this.getValuesFromRow(row, id);
      this.appendRow(values);
    });
  }

  getValuesFromRow(row, id) {
    let values = [];
    this.fields.forEach((field) => {
      let value = '-';
      if(typeof(row[field.name]) != 'undefined') {
        value = row[field.name];
      }
      if(typeof(field.format) === 'function') {
        value = field.format(row, id);
      }
      values[values.length] = value;
    });
    return values;
  }

  appendRow(values, isHeader) {
    let el = $(`[data-table='${this.name}']`);
    let elTable = $(`[data-table='${this.name}'] table`);
    let htmlValues = '';
    const divTag = isHeader ? 'th' : 'td';
    values.forEach(value => {
      htmlValues += `<${divTag}>${value}</${divTag}>`
    });

    elTable.append(`
      <tr>${htmlValues}</tr>
    `);
    el.attr('data-status', 1);

  }
}
