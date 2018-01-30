import { app, globalShortcut, BrowserWindow } from "electron"
import { Stack } from "./stack"
const clipboard = require('electron-clipboard-extended')
const robot = require('robotjs')
import * as path from "path"
import * as url from "url"

const clipboardStack = new Stack()
let mainWindow: Electron.BrowserWindow = null

const saveClipboard = () => {
  clipboardStack.push(clipboard.readText())
}

const popClipboard = () => {
  clipboardStack.pop()
  // This is neeed due to some robotjs issue with globalShortcut register
  robot.keyTap('v')
  robot.typeString(clipboard.readText())
  if(!clipboardStack.isEmpty()){
    clipboard.writeText(clipboardStack.getTop())
  }
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    height: 700,
    width: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, "../html/index.html"),
      protocol: "file:",
      slashes: true,
  }));

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on('ready', () => {
  clipboard.on('text-changed', saveClipboard)

  globalShortcut.register('CommandOrControl+Shift+V', popClipboard)
  globalShortcut.register('CommandOrControl+Esc', createWindow)

  clipboard.startWatching()
  console.log('Clipboard Extented ready!')
});



app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});