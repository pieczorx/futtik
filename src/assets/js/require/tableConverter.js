class TableConverter {
  constructor() {

  }

  convert(data, options) {
    if(!options) {
      options = {};
    }
    let rows = [];
    let filters = data.filters;
    let fields = data.fields;
    const countAll = data.rows.length;

    data.rows.forEach(row => {
      let matches = true;

      //Search for fields
      data.fields.forEach(field => {
        if(field.search) {
          if(data.filters[field.name]) {
            let value = row[field.name];
            value = value.toString();
            value = value.toLowerCase();
            const search = data.filters[field.name].toLowerCase();
            if(value.indexOf(search) < 0) {
              matches = false;
            }
          }
        }

      });

      if(matches) {
        rows.push(row)
      }
    });

    const countAllSelected = rows.length;

    let paging = {next: false, previous: false}
    if(filters.limit && !options.ignoreLimit) {
      if(filters.page > 1) {
        paging.previous = true;
      }
      if((filters.page * filters.limit) < rows.length) {
        paging.next = true;
      }
      const INDEX_FROM = (filters.page - 1) * filters.limit
      const INDEX_TO = filters.page * filters.limit
      rows = rows.slice(INDEX_FROM, INDEX_TO)
    }

    return {
      rows: rows,
      paging: paging,
      countAllSelected: countAllSelected,
      countAll: countAll
    }
  }
  getAllData(data) {
    return this.convert(data, {ignoreLimit: true}).rows;
  }
}
const tableConverter = new TableConverter();
