'use strict';
const {app, BrowserWindow, Menu, shell} = require('electron');
const fs = require('fs');
const {is, readSheet} = require('./src/util');
const file = require('./src/file');
const menu = require('./src/menu');
const settings = require('./src/settings');
const shortcut = require('./src/keymap');
const time = require('./src/time');
const tray = require('./src/tray');
const update = require('./src/update');
const url = require('./src/url');
const win = require('./src/win');

const {log} = console;

require('electron-debug')({enabled: true});
require('electron-dl')();
require('electron-context-menu')();

let exiting = false;
let mainWindow;

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.show();
  }
});

function createMainWindow() {
  const aoWindow = new BrowserWindow(win.defaultOpts);

  aoWindow.loadURL(url.app);

  aoWindow.on('close', e => {
    if (!exiting) {
      e.preventDefault();

      if (is.darwin) {
        app.hide();
      } else {
        aoWindow.hide();
      }
    }
  });

  aoWindow.on('page-title-updated', e => {
    e.preventDefault();
  });

  aoWindow.on('unresponsive', log);

  aoWindow.webContents.on('did-navigate-in-page', (_, url) => {
    settings.set('lastURL', url);
  });

  return aoWindow;
}

app.on('ready', () => {
  Menu.setApplicationMenu(menu);
  mainWindow = createMainWindow();

  if (settings.get('useGlobalShortcuts')) {
    shortcut.registerGlobal();
  }

  if (!settings.get('hideTray')) {
    tray.create();
  }

  const {webContents} = mainWindow;

  webContents.on('dom-ready', () => {
    const stylesheets = fs.readdirSync(file.style);
    stylesheets.forEach(x => webContents.insertCSS(readSheet(x)));

    if (settings.get('launchMinimized')) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  webContents.on('new-window', (e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  });

  webContents.on('crashed', log);

  if (!settings.get('disableAutoUpdateCheck')) {
    setInterval(() => update.auto(), time.ms(settings.get('updateCheckPeriod')));
  }
});

process.on('uncaughtException', log);

app.on('activate', () => mainWindow.show());

app.on('before-quit', () => {
  exiting = true;
  if (!mainWindow.isFullScreen()) {
    settings.set('lastWindowState', mainWindow.getBounds());
  }
});
