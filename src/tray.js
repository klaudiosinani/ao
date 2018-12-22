'use strict';
const electron = require('electron');
const {is} = require('./util');
const file = require('./file');
const template = require('./menu/tray');
const win = require('./win');

const {app, Menu} = electron;

class Tray {
  constructor() {
    this._tray = null;
  }

  create() {
    if (is.darwin) {
      return;
    }

    this._tray = new electron.Tray(file.trayIcon);
    this._tray.setToolTip(app.getName());
    this._tray.setContextMenu(Menu.buildFromTemplate(template));
    this._tray.on('click', win.toggle);
  }
}

module.exports = new Tray();
