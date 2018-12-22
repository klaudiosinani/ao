'use strict';
const electron = require('electron');
const {is} = require('./util');
const file = require('./file');
const template = require('./menu/tray');
const win = require('./win');

const {app, Menu} = electron;

class Tray {
  create() {
    if (is.darwin) {
      return;
    }

    const tray = new electron.Tray(file.trayIcon);
    tray.setToolTip(app.getName());
    tray.setContextMenu(Menu.buildFromTemplate(template));
    tray.on('click', win.toggle);
  }
}

module.exports = new Tray();
