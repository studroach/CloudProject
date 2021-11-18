// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://<usr>:<pwd>@<cluster>.bgs0y.mongodb.net/<db>?retryWrites=true&w=majority";
const client = new MongoClient(uri);

let mainWindow, win;

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

});

ipcMain.on("addSubmit", (event, args) => {

  //close windows
  win.close();
  //add data to database

  //send update to index

});

ipcMain.on("dataRequest", (event, args) => {

  //aqire data from DB
  getData(args).then((responseObj) => {
    // Send result back to renderer process
    event.reply("dataReturn", responseObj);
  });
});

//mongodb connecction and retrieval function
async function getData(classifier){
  try {

    await client.connect();
    const collection = client.db("DoorDashTweets").collection("Tweets");

    const cursor = collection.find({Classifer: `${classifier}`});
    const result = await cursor.toArray();

    if (result.length > 0) {

      return result;

    }else{console.log("none returned :(");}

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
