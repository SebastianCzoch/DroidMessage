'use strict'

const {app, BrowserWindow, Tray, nativeImage, Menu, shell, window, protocol} = require('electron')
const path = require('path')
const assetsDirectory = path.join(__dirname, 'assets')

let win
let tray

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "DroidMessage",
    darkTheme: true,
    titleBarStyle: "hidden",
  })

  win.loadURL('https://messages.android.com')
  win.webContents.on('new-window', (event, url)=>{
    event.preventDefault()
    shell.openExternal(url)
  });

  win.on('close', (event) => {
    event.preventDefault();
    win.hide()
  })
};

function createTray() {
  tray = new Tray(
    nativeImage.createFromPath(path.join(assetsDirectory, 'iconTemplate.png'))
  )

  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  })
}

function createMenu() {
  const template = [
    {
      label: 'Edit',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'}
      ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'}
      ]
    },
    {
      role: 'window',
      submenu: [
        {role: 'minimize'},
        {role: 'close'},
      ]
    }
  ]
  
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() { console.log("dupa"); app.exit(); }
      }
      ]
    })
  
    // Edit menu
    template[1].submenu.push(
      {type: 'separator'},
      {
        label: 'Speech',
        submenu: [
          {role: 'startspeaking'},
          {role: 'stopspeaking'}
        ]
      }
    )
  
    // Window menu
    template[3].submenu = [
      {role: 'close'},
      {role: 'minimize'},
      {role: 'zoom'},
      {type: 'separator'},
      {role: 'front'},
    ]
  }
  
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

app.on('ready', () => {
  createTray()
  createWindow()
  createMenu()
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