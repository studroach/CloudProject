// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fetch = require('electron-fetch').default;

let mainWindow = null;
let win = null;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 850,
    webPreferences: {
      preload: path.join(__dirname, 'preload/preloadMain.js'),
    },
    icon:"assets/images/calendar.png"
  })

  // and load the index.html of the app.
  mainWindow.loadFile('src/index.html');

  //disable menu bar
  //mainWindow.removeMenu();

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on("windowRequest", (event, args) => {

  //spawn new window
  if(win == null){
    win = new BrowserWindow({
      width: 500,
      height: 300,
      alwaysOnTop: true,
      frame: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload/preloadAdd.js'),
      }
    });
    win.on('close', function() { win = null });
    win.loadFile('src/add.html');
  }
});

//Inter Process Communication Bridges///////////////////////////////////////////
ipcMain.on("addSubmit", (event, args) => {

  //close windows
  win.close();
  win = null;
  if (args == "") {console.log('nothing');}
  //send data to server to be added to database
  if(args !== undefined && args !== "") {
    fetch('http://localhost:3000/save',{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(args)
    });
  }
  //send update to index
  mainWindow.webContents.send("dataReturn", args);
});

ipcMain.on("cancel", (event) => {
  //close windows
  win.close();
  win = null;
});

ipcMain.on("dataRequest", event => {
  try {
    fetch('http://localhost:3000/request')
      .then(res => res.json())
      .then(json => {
        //Send result back to renderer process
        event.reply("dataReturn", json);
      })

  } catch (e) {
    console.log(e);
  }

});
