'use strict';
const electron = require('electron');
const AutoLaunch = require('auto-launch');

const app = electron.app;

const launchAo = new AutoLaunch({
  name: 'Ao',
  path: (process.platform === 'darwin') ? app.getPath('exe').replace(/\.app\/Content.*/, '.app') : undefined,
  isHidden: true
});

function activate() {
  // Activate app launch on login
  return launchAo
    .isEnabled()
    .then(enabled => {
      if (!enabled) {
        return launchAo.enable();
      }
    });
}

function deactivate() {
  // Deactivate app launch on login
  return launchAo
    .isEnabled()
    .then(enabled => {
      if (enabled) {
        return launchAo.disable();
      }
    });
}

module.exports = {activate, deactivate};
