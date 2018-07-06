'use strict'

const {app, BrowserWindow, Tray, nativeImage} = require('electron')
const path = require('path')

let win
let tray
let trayImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABY0lEQVR42s3UOUsDURSG4ZlgQLJYuG8BxUIsVBSbgOACghB7G1v/gBbp7AMunYpaiI0iYuVSqH9AJWoVFBTtRLGxtPKd+I2MY2YiM40HHkJC7peTe88dw/iqCqQwhIzLhOt1ACZi6Ear3n+XFdaEWZzhCtc+DhVWgwVkEXcGphT2iGOsY81HTg30IY8ddDlDh9XZEXqQKKMOy9jFC+4UmlXnxX3J69cTRvmyvnOKG7zjVdu0ZHeZ0d78NdDQQaS1bg/9qLUPJ0igVS04wQqa7b8bJtB07GlOZ1BtaL6CBDr3dFUZjWE69Az8/x2O4RIbSAYITGqtNcsN1gcdmvQCplDlWlCpEWkroV1rCsooDnYUI+ryDfu6q1HdV/uKPfu4wCgizidOWnf6HIOYxi0esIXFEuYxg15l/Kh6bOJJTx2r2wNM6haYHjzLDvzAPebQaYSouB5B2xgPeOK/Kqa5igQN+ARltWEE8MTgLQAAAABJRU5ErkJggg=="

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "DroidMessage",
    darkTheme: true,
    titleBarStyle: "hidden"
  })

  win.loadURL('https://messages.android.com')

  win.on('closed', function () {
    win = null
  })
}

function createTray() {
  tray = new Tray(nativeImage.createFromDataURL(trayImage))

  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  })
}



app.on('ready', () => {
  createTray()
  createWindow()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
})
