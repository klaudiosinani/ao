'use strict';
const fs = require('fs-extra');
const settings = require('electron-settings');

fs.ensureFileSync(settings.file()); // Ensure creation of `Settings` file on startup

settings.setAll({
  alwaysOnTop: settings.get('alwaysOnTop', false),
  autoLaunch: settings.get('autoLaunch', false),
  hideTray: settings.get('hideTray', false),
  lastURL: settings.get('lastURL', 'https://todo.microsoft.com/?app'),
  lastWindowState: {
    x: settings.get('lastWindowState.x'),
    y: settings.get('lastWindowState.y'),
    width: settings.get('lastWindowState.width', 900),
    height: settings.get('lastWindowState.height', 500)
  },
  launchMinimized: settings.get('launchMinimized', false),
  menuBarVisible: settings.get('menuBarVisible', true),
  mode: {
    autoNight: settings.get('mode.autoNight', false),
    black: settings.get('mode.black', false),
    dark: settings.get('mode.dark', false),
    sepia: settings.get('mode.sepia', false),
    vibrant: settings.get('mode.vibrant', false),
    vibrantDark: settings.get('mode.vibrantDark', false)
  },
  sideBarHidden: settings.get('sideBarHidden', false),
  updateCheckPeriod: settings.get('updateCheckPeriod', '2h'),
  useGlobalShortcuts: settings.get('useGlobalShortcuts', false),
  zoomFactor: settings.get('zoomFactor', 1)
});

module.exports = settings;
