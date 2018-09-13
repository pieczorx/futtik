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
    let allRows = CSVParse(content, ";");
    let rowsName = allRows[0];
    allRows.shift();

    let finalRes = [];
    for(let row of allRows) {
      let fields = row;
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


function CSVParse(csvString, delimiter = ",") {

  if (!csvString || !csvString.length)
    return [];

  const pattern = new RegExp(
   ( "(\\" + delimiter + "|\\r?\\n|\\r|^)" +
     "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
     "([^\"\\" + delimiter + "\\r\\n]*))"
   ), "gi"
  );

  let rows = [[]];
  let matches = false;

  while (matches = pattern.exec(csvString)) {

    const matched_delimiter = matches[1];
    const matched_cellQuote = matches[2];
    const matched_cellNoQuote = matches[3];

    /*
     * Edge case: Data that starts with a delimiter
     */
    if (matches.index == 0 && matched_delimiter)
      rows[rows.length - 1].push("");

    /*
     * Fix empty lines
     */
    if(!matches[2] && !matches[3])
      continue;

    if (matched_delimiter.length && matched_delimiter !== delimiter)
      rows.push([]);

    const matched_value = (matched_cellQuote)
      ? matched_cellQuote.replace(
          new RegExp("\"\"", "g"), "\""
        )
      : matched_cellNoQuote;

    rows[rows.length - 1].push(matched_value);

   }

   return rows;
}
