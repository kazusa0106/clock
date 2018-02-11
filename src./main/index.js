'use strict'

import { app, BrowserWindow, Menu, Tray } from 'electron'
import path from 'path'
import url from 'url';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Global reference to mainWindow
// Necessary to prevent win from being garbage collected
let mainWindow;
let settingWindow;
let tray = null;

function createMainWindow() {
  // Construct new BrowserWindow
  const window = new BrowserWindow({
    width: 200,
    height: 200,
    frame: false,
    maximizable: false,
    resizable: false,
    skipTaskbar: true,
    // transparent: true
    backgroundColor: '#EEFFFFFF'
  });

  // Path to index file in production environment
  const productionIndexPath = url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  });

  // Set url for `win`
  // points to `webpack-dev-server` in development
  // points to `index.html` in production
  const pageurl = isDevelopment
    ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
    : productionIndexPath

  if (isDevelopment) {
    window.webContents.openDevTools()
  }

  window.loadURL(pageurl)

  window.on('closed', () => {
    mainWindow = null
  });

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })
  return window
}

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore()
    myWindow.focus()
  }
})

if (isSecondInstance) {
  app.quit()
}


// Quit application when all windows are closed
app.on('window-all-closed', () => {
  // On macOS it is common for applications to stay open
  // until the user explicitly quits
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On macOS it is common to re-create a window
  // even after all windows have been closed
  if (mainWindow === null) mainWindow = createMainWindow()
})


function createAppIcon() {
  app.getFileIcon(app.getPath('exe'),
    { size: 'small' },
    (error, icon) => {
      if (!error) {
        app.iconNormal = icon;
        app.appIcon = new Tray(icon);
        const contextMenu = Menu.buildFromTemplate([{
          label: '设置',
          click: function (item, focusedWindow) {
            settingWindow = createSettingsWindow();
          }
        },
        {
          label: '退出',
          click: function (item, focusedWindow) {
            app.quit();
          }
        }
        ]);
        app.appIcon.setContextMenu(contextMenu);
        app.appIcon.on('click', (event, bounds) => {
          mainWindow.show();
        });
      }
    }
  );
}

function createSettingsWindow() {
  if (settingWindow) {
    settingWindow.focus();
    return settingWindow;
  }
  const window = new BrowserWindow({
    width: 600,
    height: 400,
    maximizable: false,
    resizable: false,
    frame: false,
    title: '设置'
  });

  const productionIndexPath = url.format({
    pathname: path.join(__dirname, 'settings.html'),
    protocol: 'file',
    slashes: true
  });

  // Set url for `win`
  // points to `webpack-dev-server` in development
  // points to `index.html` in production
  const pageurl = isDevelopment
    ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}/settings.html`
    : productionIndexPath

  if (isDevelopment) {
    window.webContents.openDevTools()
  }

  window.loadURL(pageurl)

  window.on('closed', () => {
    settingWindow = null;
  });
  return window;
}
// Create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow();
  createAppIcon();
});
