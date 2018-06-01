'use strict';
const path = require('path');
const electron = require('electron');
const get = require('simple-get');

const {app, dialog, shell} = electron;

const installedVersion = app.getVersion();
const urls = {
  update: 'https://klauscfhq.github.io/ao/update.json',
  release: 'https://github.com/klauscfhq/ao/releases/latest'
};

function displayAvailableUpdate(latestVersion) {
  return dialog.showMessageBox({
    icon: path.join(__dirname, 'static/Icon.png'),
    title: 'Update Ao',
    message: ['Version', latestVersion, 'is now available'].join(' '),
    detail: 'Click Download to get it now',
    buttons: ['Download', 'Dismiss'],
    defaultId: 0,
    cancelId: 1
  });
}

function displayUnavailableUpdate(installedVersion) {
  return dialog.showMessageBox({
    icon: path.join(__dirname, 'static/Icon.png'),
    title: 'No Update Available',
    message: 'No update available',
    detail: ['Version', installedVersion, 'is the latest'].join(' '),
    buttons: ['OK']
  });
}

function getLatestVersion(err, res, data) {
  if (err) {
    console.log('Update error');
  } else if (res.statusCode === 200) {
    try {
      data = JSON.parse(data);
    } catch (err) {
      console.log('Invalid JSON object');
    }
    const {version: latestVersion} = data;
    return latestVersion;
  } else {
    console.log('Unexpected status code error');
  }
}

function response(result) {
  if (result === 0) {
    shell.openExternal(urls.release);
  }
}

function manualUpdateCheck(err, res, data) {
  const latestVersion = getLatestVersion(err, res, data);
  if (latestVersion === installedVersion) {
    displayUnavailableUpdate(installedVersion);
  } else {
    const result = displayAvailableUpdate(latestVersion);
    response(result);
  }
}

function autoUpdateCheck(err, res, data) {
  const latestVersion = getLatestVersion(err, res, data);
  if (latestVersion !== installedVersion) {
    const result = displayAvailableUpdate(latestVersion);
    response(result);
  }
}

module.exports.init = () => {
  if (process.platform !== 'win32') {
    return;
  }

  electron.autoUpdater.on('checking-for-update', () => {
    console.log('checking-for-update');
  });

  electron.autoUpdater.on('update-available', () => {
    console.log('update-available');
  });

  electron.autoUpdater.on('update-not-available', () => {
    console.log('update-not-available');
  });

  electron.autoUpdater.on('update-downloaded', () => {
    console.log('update-downloaded');
  });

  electron.autoUpdater.on('error', err => {
    console.log('Error fetching updates', err);
  });

  const version = electron.app.getVersion();
  const feedURL = `https://ao.now.sh/update/${process.platform}/${version}`;
  electron.autoUpdater.setFeedURL(feedURL);
};

module.exports.autoUpdateCheck = () => {
  if (process.platform === 'win32') {
    electron.autoUpdater.checkForUpdates();
  } else {
    get.concat(urls.update, autoUpdateCheck);
  }
};

module.exports.manualUpdateCheck = () => {
  get.concat(urls.update, manualUpdateCheck);
};
