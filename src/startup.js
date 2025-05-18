'use strict';
const settings = require('./settings');
const AutoLauncherLib = require('auto-launch');
const config = require('./AutoLaunchConfig');
const { app, remote } = require('electron');
const { is } = require('./util');

const appPath = is.darwin
  ? (app || remote.app).getPath('exe').replace(/\.app\/Content.*/, '.app')
  : undefined;

class StartupManager {
  constructor() {
    this.launcher = new AutoLauncher(config);
  }

  autoLaunch() {
    if (settings.get('autoLaunch')) {
      this.launcher.enable();
    } else {
      this.launcher.disable();
    }
  }
}

class AutoLauncher {
  constructor(settings) {
    this._launcher = new AutoLauncherLib(settings);
  }

  async enable() {
    const enabled = await this._launcher.isEnabled();
    if (!enabled) {
      return this._launcher.enable();
    }
  }

  async disable() {
    const enabled = await this._launcher.isEnabled();
    if (enabled) {
      return this._launcher.disable();
    }
  }
}


module.exports = {
  name: 'Ao',
  path: appPath,
  isHidden: true,
  StartupManager,
  AutoLauncher
};
