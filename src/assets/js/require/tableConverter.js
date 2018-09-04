class TableConverter {
  constructor() {

  }
  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
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
          let fieldType = field.search;


          if(typeof(field.search) == 'object'){
            fieldType = field.search.type;

          }
          if(data.filters[field.name]) {
            let value;
            if(typeof(field.search) == 'object' && typeof(field.search.format) === 'function') {
              value = field.search.format(row);
            } else {
              value = row[field.name];
            }

            let filter = data.filters[field.name]
            switch(fieldType) {
              case 'text': {
                value = value.toString();
                value = value.toLowerCase();
                const search = filter.toLowerCase();
                if(value.indexOf(search) < 0) {
                  matches = false;
                }
                break;
              }
              case 'numericFromTo': {
                value = parseInt(value);
                if(this.isNumber(filter[0]) && value < parseInt(filter[0])) {
                  matches = false;
                }
                if(this.isNumber(filter[1]) && value > parseInt(filter[1])) {
                  matches = false;
                }
                break;
              }
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
