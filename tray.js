'use strict';
const path = require('path');
const electron = require('electron');
const config = require('./config');

const {join} = path;
const {platform} = process;
const {app, BrowserWindow, Menu, shell, Tray} = electron;

let tray = null;
const issueURL = 'https://github.com/klauscfhq/ao/issues/new';

function activate(command) {
  const appWindow = BrowserWindow.getAllWindows()[0];
  appWindow.show();
  appWindow.webContents.send(command);
}

exports.create = win => {
  if (platform === 'darwin' || tray) {
    return;
  }

  const iconPath = join(__dirname, 'static/IconTray.png');

  const toggleWin = () => {
    if (win.isVisible()) {
      win.hide();
    } else {
      win.show();
    }
  };

  const showWin = () => {
    if (!win.isVisible()) {
      win.show();
    }
  };

  const contextMenu = Menu.buildFromTemplate([{
    label: 'Open Ao',
    click() {
      toggleWin();
    }
  }, {
    type: 'separator'
  }, {
    label: 'Search',
    click() {
      showWin();
      activate('search');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Create',
    submenu: [{
      label: 'New List',
      click() {
        showWin();
        activate('new-list');
      }
    }, {
      label: 'New Todo',
      click() {
        showWin();
        activate('new-todo');
      }
    }]
  }, {
    label: 'My Day',
    click() {
      showWin();
      activate('my-day');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Toggle Theme',
    submenu: [{
      label: 'Sepia Theme',
      click() {
        showWin();
        activate('toggle-sepia-mode');
      }
    }, {
      label: 'Black Theme',
      click() {
        showWin();
        activate('toggle-black-mode');
      }
    }, {
      label: 'Dark Theme',
      click() {
        showWin();
        activate('toggle-dark-mode');
      }
    }]
  }, {
    label: 'Auto Night Mode',
    type: 'checkbox',
    checked: config.get('autoNightMode'),
    click(item) {
      showWin();
      config.set('autoNightMode', item.checked);
      activate('auto-night-mode');
    }
  }, {
    type: 'separator'
  }, {
    label: `To-Do Settings`,
    click() {
      showWin();
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

  tray = new Tray(iconPath);
  tray.setToolTip(`${app.getName()}`);
  tray.setContextMenu(contextMenu);
  tray.on('click', toggleWin);
};
