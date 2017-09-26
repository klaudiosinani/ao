'use strict';
const path = require('path');
const fs = require('fs');
const electron = require('electron');
const isDevMode = require('electron-is-dev');
const ms = require('ms');
const appMenu = require('./menu');
const tray = require('./tray');
const config = require('./config');
const update = require('./update');

const app = electron.app;

require('electron-debug')({enabled: true});
require('electron-dl')();
require('electron-context-menu')();

let mainWindow;
let exiting = false;

const functioning = app.makeSingleInstance(() => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.show();
  }
});

if (functioning) {
  app.quit();
}

function createMainWindow() {
  const lastWindowState = config.get('lastWindowState');
  const maxWindowInteger = 2147483647;
  const darkModeFlag = config.get('darkMode');
  const lastURL = config.get('lastURL');

  const aoWindow = new electron.BrowserWindow({
    title: app.getName(),
    x: lastWindowState.x,
    y: lastWindowState.y,
    width: lastWindowState.width,
    height: lastWindowState.height,
    minWidth: 400,
    minHeight: 200,
    icon: process.platform === 'linux' && path.join(__dirname, 'static/Icon.png'),
    alwaysOnTop: config.get('alwaysOnTop'),
    titleBarStyle: 'hiddenInset',
    darkTheme: darkModeFlag,
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'browser.js'),
      nodeIntegration: false,
      plugins: true
    }
  });

  aoWindow.loadURL(lastURL);

  aoWindow.on('close', e => {
    if (!exiting) {
      e.preventDefault();

      if (process.platform === 'darwin') {
        app.hide();
      } else {
        aoWindow.hide();
      }
    }
  });

  aoWindow.on('enter-full-screen', () => {
    aoWindow.setMaximumSize(maxWindowInteger, maxWindowInteger);
  });

  aoWindow.on('page-title-updated', e => {
    e.preventDefault();
  });

  aoWindow.webContents.on('did-navigate-in-page', (e, url) => {
    config.set('lastURL', url);
  });

  return aoWindow;
}

app.on('ready', () => {
  electron.Menu.setApplicationMenu(appMenu);
  mainWindow = createMainWindow();
  tray.create(mainWindow);
  const windowContent = mainWindow.webContents;

  windowContent.on('dom-ready', () => {
    windowContent.insertCSS(fs.readFileSync(path.join(__dirname, 'style/browser.css'), 'utf8'));
    if (process.platform === 'darwin') {
      // Make room for the traffic-lights on macos
      windowContent.insertCSS(fs.readFileSync(path.join(__dirname, 'style/macos.css'), 'utf8'));
    }
    windowContent.insertCSS(fs.readFileSync(path.join(__dirname, 'style/dark-mode.css'), 'utf8'));
    windowContent.insertCSS(fs.readFileSync(path.join(__dirname, 'style/sepia-mode.css'), 'utf8'));
    mainWindow.show();
  });

  windowContent.on('new-window', (e, url) => {
    e.preventDefault();
    electron.shell.openExternal(url);
  });

  update.init(electron.Menu.getApplicationMenu());

  if (!isDevMode) {
    setTimeout(() => {
      update.checkUpdate();
    }, ms('2m'));
  }
});

app.on('activate', () => {
  mainWindow.show();
});

app.on('before-quit', () => {
  exiting = true;

  if (!mainWindow.isFullScreen()) {
    config.set('lastWindowState', mainWindow.getBounds());
  }
});
