const { contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  dataRequest: (channel, data) => {
    // whitelist channels
    let validChannels = ["dataRequest"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  dataReturn: (channel, func) => {
    let validChannels = ["dataReturn"];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  windowRequest: (channel, data) => {
    // whitelist channels
    let validChannels = ["windowRequest"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  }
});
