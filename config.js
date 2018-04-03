'use strict';
const settings = require('electron-settings');

settings.setAll({
  zoomFactor: settings.get('zoomFactor', 1),
  lastWindowState: {
    x: settings.get('lastWindowState.x'),
    y: settings.get('lastWindowState.y'),
    width: settings.get('lastWindowState.width', 900),
    height: settings.get('lastWindowState.height', 500)
  },
  lastURL: settings.get('lastURL', 'https://todo.microsoft.com/?app'),
  menuBarVisible: settings.get('menuBarVisible', true),
  sideBarHidden: settings.get('sideBarHidden', false),
  launchMinimized: settings.get('launchMinimized', false),
  autoNightMode: settings.get('autoNightMode', false),
  autoLaunch: settings.get('autoLaunch', false),
  hideTray: settings.get('hideTray', false),
  blackMode: settings.get('blackMode', false),
  darkMode: settings.get('darkMode', false),
  sepiaMode: settings.get('sepiaMode', false),
  vibrantMode: settings.get('vibrantMode', false),
  vibrantDarkMode: settings.get('vibrantDarkMode', false),
  alwaysOnTop: settings.get('alwaysOnTop', false),
  updateCheckPeriod: settings.get('updateCheckPeriod', '2h'),
  useGlobalShortcuts: settings.get('useGlobalShortcuts', false)
});

module.exports = settings;
