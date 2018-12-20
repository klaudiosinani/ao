'use strict';
const {join} = require('path');
const {homedir} = require('os');

module.exports = {
  icon: join(__dirname, '../static/Icon.png'),
  localConfig: join(homedir(), '.ao.json'),
  preload: join(__dirname, './browser.js'),
  style: join(__dirname, './style'),
  trayIcon: join(__dirname, '../static/IconTray.png')
};
