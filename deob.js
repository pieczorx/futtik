const fse = require('fs-extra');
const start = async () => {
  console.log('elo');
  const nodes = await fse.readJson('deob.json');
  console.log(nodes);
}

start();
