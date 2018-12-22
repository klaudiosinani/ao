'use strict';
const fs = require('fs-extra');
const settings = require('electron-settings');

fs.ensureFileSync(settings.file()); // Ensure creation of `Settings` file on startup

settings.setAll({
  alwaysOnTop: settings.get('alwaysOnTop', false),
  autoLaunch: settings.get('autoLaunch', false),
  autoNightMode: settings.get('autoNightMode', false),
  hideTray: settings.get('hideTray', false),
  lastURL: settings.get('lastURL', 'https://todo.microsoft.com/?app'),
  lastWindowState: {
    x: settings.get('lastWindowState.x'),
    y: settings.get('lastWindowState.y'),
    width: settings.get('lastWindowState.width'),
    height: settings.get('lastWindowState.height')
  },
  launchMinimized: settings.get('launchMinimized', false),
  menuBarVisible: settings.get('menuBarVisible', true),
  mode: {
    black: settings.get('mode.black', false),
    dark: settings.get('mode.dark', false),
    sepia: settings.get('mode.sepia', false),
    vibrant: settings.get('mode.vibrant', false),
    vibrantDark: settings.get('mode.vibrantDark', false)
  },
  sideBarHidden: settings.get('sideBarHidden', false),
  updateCheckPeriod: settings.get('updateCheckPeriod', '1w'),
  useGlobalShortcuts: settings.get('useGlobalShortcuts', false),
  zoomFactor: settings.get('zoomFactor', 1)
});

module.exports = settings;
