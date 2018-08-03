class Table {
  constructor(info) {
    Object.assign(this, info);
  }

  init() {
    this.update();

  }

  update() {
    let el = $(`[data-table='${this.name}']`);
    el.html(`<table></table>`);
    this._getData();
    if(this.rows.length > 0) {
      this.appendRow(this.fields.map(field => field.title), true);
      this.appendData();
    } else {
      this.setEmpty();
    }
  }

  setEmpty() {
    let el = $(`[data-table='${this.name}']`);
    el.html(`${this.empty}`);
  }

  _getData() {
    this.rows = this.getData();
  }

  appendData() {
    this.rows.forEach(row => {
      let values = this.getValuesFromRow(row);
      this.appendRow(values);
    });
  }

  getValuesFromRow(row) {
    let values = [];
    this.fields.forEach(field => {
      let value = '-';
      if(typeof(row[field.name]) != 'undefined') {
        value = row[field.name];
      }
      if(typeof(field.format) === 'function') {
        value = field.format(row);
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
