const {app, BrowserWindow} = require('electron')

app.on('ready', () => {
  const w = new BrowserWindow({
    width: 720,
    height: 500,
    title: 'Futtik',
    //show: false
  });
  w.loadURL('file://' + __dirname + '/src/index.html');



  //w.once('ready-to-show', () => {
    //w.show();
    //w.setMenu(null);
    //w.webContents.openDevTools({mode: 'detach'});
//  })
})
