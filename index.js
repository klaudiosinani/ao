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
const ipcMain = electron.ipcMain;

require('electron-debug')({enabled: true});
require('electron-dl')();
require('electron-context-menu')();

let mainWindow;
let exiting = false;
let aoTray;
const defaultAppIcon = path.join(__dirname, 'static/Icon.png');
const notifyAppIcon = path.join(__dirname, 'static/NotifyIcon.png');

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
  const darkModeFlag = config.get('darkMode') || config.get('blackMode');
  const lastURL = config.get('lastURL');

  const aoWindow = new electron.BrowserWindow({
    title: app.getName(),
    x: lastWindowState.x,
    y: lastWindowState.y,
    width: lastWindowState.width,
    height: lastWindowState.height,
    minWidth: 400,
    minHeight: 200,
    icon: (process.platform === 'win32' || process.platform === 'linux') && defaultAppIcon,
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

  aoWindow.on('unresponsive', e => {
    console.log('Unresponsive Ao window. ', e);
  });

  aoWindow.webContents.on('did-navigate-in-page', (e, url) => {
    config.set('lastURL', url);
  });

  aoWindow.on('show', () => {
    setDefaultAppImages();
  });

  aoWindow.on('restore', () => {
    setDefaultAppImages();
  });

  return aoWindow;
}

app.on('ready', () => {
  electron.Menu.setApplicationMenu(appMenu);
  mainWindow = createMainWindow();
  if (!config.get('hideTray')) {
    // Check whether or not the tray
    // icon is set to be hidden
    aoTray = tray.create(mainWindow);
  }
  const windowContent = mainWindow.webContents;

  windowContent.on('dom-ready', () => {
    windowContent.insertCSS(fs.readFileSync(path.join(__dirname, 'style/browser.css'), 'utf8'));
    if (process.platform === 'darwin') {
      // Make room for the traffic-lights on macos
      windowContent.insertCSS(fs.readFileSync(path.join(__dirname, 'style/macos.css'), 'utf8'));
    }
    windowContent.insertCSS(fs.readFileSync(path.join(__dirname, 'style/black-mode.css'), 'utf8'));
    windowContent.insertCSS(fs.readFileSync(path.join(__dirname, 'style/dark-mode.css'), 'utf8'));
    windowContent.insertCSS(fs.readFileSync(path.join(__dirname, 'style/sepia-mode.css'), 'utf8'));
    windowContent.insertCSS(fs.readFileSync(path.join(__dirname, 'style/vibrant-mode.css'), 'utf8'));
    windowContent.insertCSS(fs.readFileSync(path.join(__dirname, 'style/vibrant-dark-mode.css'), 'utf8'));

    if (config.get('launchMinimized')) {
      // Check whether to launch the main window minimized
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  windowContent.on('new-window', (e, url) => {
    e.preventDefault();
    electron.shell.openExternal(url);
  });

  windowContent.on('crashed', e => {
    console.log('Ao window crashed. ', e);
  });

  update.init(electron.Menu.getApplicationMenu());

  if (!isDevMode) {
    setTimeout(() => {
      update.checkUpdate();
    }, ms('2m'));

    setInterval(() => {
      update.checkUpdate();
    }, ms('1h'));
  }
});

ipcMain.on('activate-vibrant', () => {
  // Check if the vibrant theme was activated
  if (config.get('vibrantMode')) {
    // Set the app's background vibrant light
    mainWindow.setVibrancy('light');
  } else if (config.get('vibrantDarkMode')) {
    // Set the app's background vibrant ultra dark
    mainWindow.setVibrancy('ultra-dark');
  } else {
    // Remove background vibrancy
    mainWindow.setVibrancy(null);
  }
});

ipcMain.on('activate-menu-bar', () => {
  // Check if the menu bar was activated
  if (config.get('menuBarVisible')) {
    // Make the menu bar persistently visible
    mainWindow.setMenuBarVisibility(true);
    // Disable ALT key toggling
    mainWindow.setAutoHideMenuBar(false);
  } else {
    // Hide the menu bar
    mainWindow.setMenuBarVisibility(false);
    // Restore ALT key toggling
    mainWindow.setAutoHideMenuBar(true);
  }
});

ipcMain.on('notification-shown', () => {
  if (aoTray && (mainWindow.isMinimized() || !mainWindow.isVisible())) {
    mainWindow.flashFrame(true);
    aoTray.setNotifyTrayImage();
    mainWindow.setIcon(notifyAppIcon);
  }
});

ipcMain.on('notification-hidden', () => {
  setDefaultAppImages();
});

function setDefaultAppImages() {
  if (aoTray) {
    aoTray.setDefaultTrayImage();
  }
  mainWindow.setIcon(defaultAppIcon);
}

process.on('uncaughtException', error => {
  // Report uncaught exceptions
  console.log(error);
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
