import { app, globalShortcut } from "electron"
import { Stack } from "./stack"
const clipboard = require('electron-clipboard-extended')
const robot = require('robotjs')
import * as path from "path"
import * as url from "url"

const clipboardStack = new Stack()
const stack: string[] = []

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

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on('ready', () => {
  console.log('Clipboard Extented ready!')
  globalShortcut.register('CommandOrControl+Shift+V', popClipboard)
});

clipboard.on('text-changed', saveClipboard).startWatching();