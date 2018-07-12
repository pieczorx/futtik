const {app, BrowserWindow} = require('electron')

app.on('ready', () => {
  const w = new BrowserWindow({
    width: 720,
    height: 500,
    title: 'Futtik',
    frame: false,
    transparent: true

  });
  w.loadURL('file://' + __dirname + '/src/index.html');
})
