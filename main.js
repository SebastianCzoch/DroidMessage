const {app, BrowserWindow, Tray} = require('electron')

let win
let tray

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
  tray = new Tray('./images/icon2.png')

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
