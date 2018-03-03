'use strict';
const path = require('path');
const electron = require('electron');
const config = require('./config');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;
let tray = null;
const issueURL = 'https://github.com/klauscfhq/ao/issues/new';
const ipcMain = electron.ipcMain;
const defaultTrayIconPath = 'static/IconTray.png';
const notificationTrayIconPath = 'static/i.jpg';

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

  const iconPath = path.join(__dirname, defaultTrayIconPath);

  const toggleWin = () => {
    // Toggle/untoggle window
    if (win.isVisible()) {
      win.hide();
    } else {
      win.show();
    }
  };

  const showWin = () => {
    // Bring window on top if not visible
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
    label: 'Hide Tray Icon',
    type: 'checkbox',
    checked: config.get('hideTray'),
    click(item) {
      showWin();
      config.set('hideTray', item.checked);
      app.relaunch();
      app.quit();
    }
  }, {
    type: 'separator'
  }, {
    label: `Settings`,
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

  tray = new electron.Tray(iconPath);
  tray.setToolTip(`${app.getName()}`);
  tray.setContextMenu(contextMenu);
  tray.on('click', toggleWin);
};

ipcMain.on('notification-shown', (event, arg) => {
  tray.setImage(notificationTrayIconPath);
  //var nodeConsole = require('console');
  //nodecon.log('TTTest');
  //mainWindow.setMenuBarVisibility(false);
  //console.log('changed!!!!');
});

ipcMain.on('notification-hidden', (event, arg) => {
  tray.setImage(defaultTrayIconPath);
  //var nodeConsole = require('console');
  //nodecon.log('TTTest');
  //mainWindow.setMenuBarVisibility(false);
  //console.log('changed!!!!');
});