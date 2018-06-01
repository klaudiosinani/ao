'use strict';
const electron = require('electron');
const AutoLaunch = require('auto-launch');

const {app} = electron;
const {platform} = process;

const [name, executable] = [app.getName(), app.getPath('exe')];
const path = platform === 'darwin' ? executable.replace(/\.app\/Content.*/, '.app') : undefined;

const launchAo = new AutoLaunch({path, name, isHidden: true});

function activate() {
  return launchAo
    .isEnabled()
    .then(enabled => {
      if (!enabled) {
        return launchAo.enable();
      }
    });
}

function deactivate() {
  return launchAo
    .isEnabled()
    .then(enabled => {
      if (enabled) {
        return launchAo.disable();
      }
    });
}

module.exports = {activate, deactivate};
