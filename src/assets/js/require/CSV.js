class CSV {
  constructor() {

  }

  loadFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        resolve(this.convertCsvToArray(e.target.result))
      }
      reader.onerror = (e) => {
        reject(e)
      }
    });
  }

  convertCsvToArray(content) {
    let allRows = content.split("\n");
    let rowsName = allRows[0].split(';');
    let finalRes = [];
    allRows.shift();
    for(let row of allRows) {
      let fields = row.split(';');
      let singleRes = {};
      for(let i = 0; i < fields.length; i++) {
        let field = fields[i];
        singleRes[rowsName[i]] = field;
      }
      finalRes.push(singleRes);
    }
    return finalRes;
  }
}
