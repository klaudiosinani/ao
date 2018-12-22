'use strict';
const path = require('path');
const electron = require('electron');
const fs = require('fs-extra');
const isDevMode = require('electron-is-dev');
const ms = require('ms');
const appMenu = require('./menu');
const tray = require('./tray');
const config = require('./config');
const update = require('./update');

const {join} = path;
const {readFileSync} = fs;
const {platform} = process;
const {app, BrowserWindow, ipcMain, Menu, shell} = electron;

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
  const darkModeFlag = config.get('mode.dark') || config.get('mode.black');
  const lastURL = config.get('lastURL');

  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
  const [defaultWidth, defaultHeight] = [width, height].map(x => Math.round((x * 3) / 4));

  const aoWindow = new BrowserWindow({
    title: app.getName(),
    x: lastWindowState.x,
    y: lastWindowState.y,
    width: lastWindowState.width || defaultWidth,
    height: lastWindowState.height || defaultHeight,
    minWidth: 400,
    minHeight: 200,
    icon: platform === 'linux' && join(__dirname, 'static/Icon.png'),
    alwaysOnTop: config.get('alwaysOnTop'),
    titleBarStyle: 'hiddenInset',
    darkTheme: darkModeFlag,
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: join(__dirname, 'browser.js'),
      nodeIntegration: false,
      plugins: true
    }
  });

  aoWindow.loadURL(lastURL);

  aoWindow.on('close', e => {
    if (!exiting) {
      e.preventDefault();

      if (platform === 'darwin') {
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
    console.log('Unresponsive window', e);
  });

  aoWindow.webContents.on('did-navigate-in-page', (e, url) => {
    config.set('lastURL', url);
  });

  return aoWindow;
}

app.on('ready', () => {
  Menu.setApplicationMenu(appMenu);
  mainWindow = createMainWindow();

  if (config.get('useGlobalShortcuts')) {
    appMenu.registerGlobalShortcuts();
  }

  if (!config.get('hideTray')) {
    tray.create(mainWindow);
  }

  const windowContent = mainWindow.webContents;

  windowContent.on('dom-ready', () => {
    windowContent.insertCSS(readFileSync(join(__dirname, 'style', 'browser.css'), 'utf8'));
    if (platform === 'darwin') {
      // Make room for the traffic-lights on macos
      windowContent.insertCSS(readFileSync(join(__dirname, 'style', 'macos.css'), 'utf8'));
    }
    windowContent.insertCSS(readFileSync(join(__dirname, 'style', 'black-mode.css'), 'utf8'));
    windowContent.insertCSS(readFileSync(join(__dirname, 'style', 'dark-mode.css'), 'utf8'));
    windowContent.insertCSS(readFileSync(join(__dirname, 'style', 'sepia-mode.css'), 'utf8'));
    windowContent.insertCSS(readFileSync(join(__dirname, 'style', 'vibrant-mode.css'), 'utf8'));
    windowContent.insertCSS(readFileSync(join(__dirname, 'style', 'vibrant-dark-mode.css'), 'utf8'));

    if (config.get('launchMinimized')) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  windowContent.on('new-window', (e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  });

  windowContent.on('crashed', e => {
    console.log('Window crashed', e);
  });

  update.init(Menu.getApplicationMenu());

  if (!isDevMode) {
    if (config.get('updateCheckPeriod') !== 'never') {
      setInterval(() => {
        update.autoUpdateCheck();
      }, ms(config.get('updateCheckPeriod')));
    }
  }
});

ipcMain.on('activate-vibrant', () => {
  if (config.get('mode.vibrant')) {
    mainWindow.setVibrancy('light');
  } else if (config.get('mode.vibrantDark')) {
    mainWindow.setVibrancy('ultra-dark');
  } else {
    mainWindow.setVibrancy(null);
  }
});

ipcMain.on('activate-menu-bar', () => {
  if (config.get('menuBarVisible')) {
    mainWindow.setMenuBarVisibility(true);
    mainWindow.setAutoHideMenuBar(false);
  } else {
    mainWindow.setMenuBarVisibility(false);
    mainWindow.setAutoHideMenuBar(true);
  }
});

process.on('uncaughtException', error => {
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
