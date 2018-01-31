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

const clearStack = () => {
  clipboardStack.clear()
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on('ready', () => {
  clipboard.on('text-changed', saveClipboard)

  globalShortcut.register('CommandOrControl+Down', popClipboard)

  globalShortcut.register('CommandOrControl+Shift+Delete', clearStack)

  clipboard.startWatching()
  console.log('Clipboard Extented ready!')
});
