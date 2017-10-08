'use strict';
const Config = require('electron-config');

module.exports = new Config({
  defaults: {
    zoomFactor: 1,
    lastWindowState: {
      width: 900,
      height: 500
    },
    lastURL: 'https://todo.microsoft.com/?app',
    menuBarVisible: false,
    blackMode: false,
    darkMode: false,
    sepiaMode: false,
    vibrantMode: false,
    vibrantDarkMode: false,
    alwaysOnTop: false
  }
});
