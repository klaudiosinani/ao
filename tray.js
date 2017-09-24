'use strict';
const path = require('path');
const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;
let tray = null;
const issueURL = 'https://github.com/klauscfhq/ao/issues/new';

function activate(command) {
  const appWindow = BrowserWindow.getAllWindows()[0];
  // Extra measure in order to be shown
  appWindow.show();
  appWindow.webContents.send(command);
}

exports.create = win => {
  if (process.platform === 'darwin' || tray) {
    return;
  }

  const iconPath = path.join(__dirname, 'static/IconTray.png');

  const toggleWin = () => {
    if (!win.isVisible()) {
      win.show();
    }
  };

  const contextMenu = electron.Menu.buildFromTemplate([{
    label: 'Open Ao',
    click() {
      toggleWin();
    }
  }, {
    type: 'separator'
  }, {
    label: 'Search',
    click() {
      toggleWin();
      activate('search');
    }
  }, {
    label: 'New Todo',
    click() {
      toggleWin();
      activate('new-todo');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Toggle Sepia Mode',
    click() {
      toggleWin();
      activate('toggle-sepia-mode');
    }
  }, {
    label: 'Toggle Dark Mode',
    click() {
      toggleWin();
      activate('toggle-dark-mode');
    }
  }, {
    type: 'separator'
  }, {
    label: `Settings`,
    click() {
      toggleWin();
      activate('settings');
    }
  }, {
    label: `Report Issue`,
    click() {
      shell.openExternal(issueURL);
    }
  }, {
    type: 'separator'
  }, {
    role: 'quit'
  }]);

  tray = new electron.Tray(iconPath);
  tray.setToolTip(`${app.getName()}`);
  tray.setContextMenu(contextMenu);
  tray.on('click', toggleWin);
};
