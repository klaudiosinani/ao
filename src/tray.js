'use strict';
const electron = require('electron');
const { is } = require('./util');
const TrayConfig = require('./TrayConfig');
const TrayTemplate = require('./TrayTemplate');
const TrayClickHandler = require('./TrayClickHandler');
const win = require('./win');
const { Menu } = require('electron');
const template = require('./menu/tray');
const { app } = require('electron');
const file = require('./file');

class Tray {
  constructor() {
    this._tray = null;
  }

  create() {
    if (is.darwin) return;

    this._tray = new electron.Tray(TrayConfig.getIcon());
    this._tray.setToolTip(TrayConfig.getTooltip());
    this._tray.setContextMenu(TrayTemplate.buildMenu());
    this._tray.on('click', TrayClickHandler.handleClick);
  }
}

class TrayConfig {
  static getIcon() {
    return file.trayIcon;
  }

  static getTooltip() {
    return app.getName();
  }
}


class TrayTemplate {
  static buildMenu() {
    return Menu.buildFromTemplate(template);
  }
}


class TrayClickHandler {
  static handleClick() {
    win.toggle();
  }
}

module.exports = {
  TrayTemplate,
  TrayClickHandler,
  TrayConfig,
  Tray
};
