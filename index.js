const {app, BrowserWindow, ipcMain} = require('electron')


app.on('ready', async () => {
  let packageVersion = app.getVersion();


  let windowName = 'Futtik ';
  let exVersion = packageVersion.split('.');
  if(exVersion[2] == 0) {
    windowName += exVersion.slice(0, -1).join('.');
  } else {
    windowName += packageVersion;
  }
  const w = new BrowserWindow({
    width: 720,
    height: 500,
    title: windowName,
    show: false
  });
  w.loadURL('file://' + __dirname + '/src/index.html');



  w.once('ready-to-show', () => {
    w.show();
    w.setMenu(null);
    w.webContents.openDevTools({mode: 'detach'});
  });
  let _appClose = false;
  w.on('close', () => {
    _appClose = true;
  });
  ipcMain.on('quitAppIfTriedToQuitBefore', (event, info) => {
    if(_appClose) {
      app.quit()
    } else {
      event.sender.send("quitReload");
    }
  })
})
