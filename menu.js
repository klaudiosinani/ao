'use strict';
const path = require('path');
const electron = require('electron');

const app = electron.app;
const shell = electron.shell;
const BrowserWindow = electron.BrowserWindow;
const appName = app.getName();
const sourceURL = 'https://github.com/klauscfhq/ao';
const homepageURL = 'https://github.com/klauscfhq/ao';
const issueURL = 'https://github.com/klauscfhq/ao/issues/new';
const releaseURL = 'https://github.com/klauscfhq/ao/releases/latest';

function activate(command) {
  const appWindow = BrowserWindow.getAllWindows()[0];
  // Extra measure in order to be shown
  appWindow.show();
  appWindow.webContents.send(command);
}

const helpSubmenu = [{
  label: `Ao Homepage`,
  click() {
    shell.openExternal(homepageURL);
  }
}, {
  type: 'separator'
}, {
  label: 'Fork Source',
  click() {
    shell.openExternal(sourceURL);
  }
}, {
  label: `Report Issue`,
  click() {
    shell.openExternal(issueURL);
  }
}, {
  label: `Latest Release`,
  click() {
    shell.openExternal(releaseURL);
  }
}];

if (process.platform !== 'darwin') {
  helpSubmenu.push({
    type: 'separator'
  }, {
    role: 'about',
    click() {
      electron.dialog.showMessageBox({
        title: `About Ao`,
        message: `Ao ${app.getVersion()}`,
        detail: 'Coded with love by Klaus Sinani',
        icon: path.join(__dirname, 'static/Icon.png'),
        buttons: []
      });
    }
  });
}

const darwinTpl = [{
  label: appName,
  submenu: [{
    role: 'about'
  }, {
    type: 'separator'
  }, {
    label: 'Navigate to Next List',
    accelerator: 'CmdorCtrl+Tab',
    click() {
      activate('next-list');
    }
  }, {
    label: 'Navigate to Previous List',
    accelerator: 'CmdorCtrl+Shift+Tab',
    click() {
      activate('previous-list');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Sign out',
    accelerator: 'CmdorCtrl+Alt+Q',
    click() {
      activate('sign-out');
    }
  }, {
    type: 'separator'
  }, {
    role: 'services',
    submenu: []
  }, {
    type: 'separator'
  }, {
    role: 'hide'
  }, {
    role: 'hideothers'
  }, {
    role: 'unhide'
  }, {
    type: 'separator'
  }, {
    role: 'quit'
  }]
}, {
  label: 'File',
  submenu: [{
    label: 'Search',
    accelerator: 'CmdorCtrl+F',
    click() {
      activate('search');
    }
  }, {
    type: 'separator'
  }, {
    label: 'New Todo',
    accelerator: 'CmdorCtrl+N',
    click() {
      activate('new-todo');
    }
  }, {
    label: 'Toggle My Day',
    accelerator: 'CmdorCtrl+M',
    click() {
      activate('my-day');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Toggle Cortana',
    accelerator: 'CmdorCtrl+E',
    click() {
      activate('toggle-cortana');
    }
  }, {
    label: 'Complete Todo',
    accelerator: 'CmdorCtrl+Shift+N',
    click() {
      activate('complete-todo');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Add to My Day',
    accelerator: 'CmdorCtrl+Shift+T',
    click() {
      activate('add-to-day');
    }
  }, {
    label: 'Set Reminder',
    accelerator: 'CmdorCtrl+Shift+E',
    click() {
      activate('set-reminder');
    }
  }, {
    label: 'Add Due Date',
    accelerator: 'CmdorCtrl+Alt+S',
    click() {
      activate('add-due-date');
    }
  }]
}, {
  label: 'Edit',
  submenu: [{
    type: 'separator'
  }, {
    role: 'undo'
  }, {
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    role: 'cut'
  }, {
    role: 'copy'
  }, {
    role: 'paste'
  }, {
    role: 'pasteandmatchstyle'
  }, {
    role: 'delete'
  }, {
    role: 'selectall'
  }]
}, {
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+Shift+R',
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.reload();
      }
    }
  }, {
    type: 'separator'
  }, {
    label: 'Make Text Larger',
    accelerator: 'CmdOrCtrl+Plus',
    click() {
      activate('zoom-in');
    }
  }, {
    label: 'Make Text Smaller',
    accelerator: 'CmdOrCtrl+-',
    click() {
      activate('zoom-out');
    }
  }, {
    label: 'Reset Zoom Level',
    accelerator: 'CmdOrCtrl+0',
    click() {
      activate('zoom-reset');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Toggle Sepia Mode',
    accelerator: 'CmdOrCtrl+G',
    click() {
      activate('toggle-sepia-mode');
    }
  }, {
    label: 'Toggle Dark Mode',
    accelerator: 'CmdOrCtrl+D',
    click() {
      activate('toggle-dark-mode');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Settings',
    accelerator: 'CmdorCtrl+,',
    click() {
      activate('settings');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Toggle Full Screen',
    accelerator: 'Ctrl+Command+F',
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        focusedWindow.send('window:fullscreen', {state: focusedWindow.isFullScreen()});
      }
    }
  }, {
    label: 'Toggle Developer Tools',
    accelerator: 'Alt+Command+I',
    click: (item, focusedWindow) => {
      focusedWindow.toggleDevTools();
    }
  }]
}, {
  role: 'window',
  submenu: [{
    role: 'minimize'
  }, {
    role: 'close'
  }, {
    type: 'separator'
  }, {
    type: 'separator'
  }, {
    role: 'front'
  }, {
    role: 'togglefullscreen'
  }]
}, {
  role: 'help',
  submenu: helpSubmenu
}];

const otherTpl = [{
  label: 'File',
  submenu: [{
    label: 'Search',
    accelerator: 'CmdorCtrl+F',
    click() {
      activate('search');
    }
  }, {
    type: 'separator'
  }, {
    label: 'New Todo',
    accelerator: 'CmdorCtrl+N',
    click() {
      activate('new-todo');
    }
  }, {
    label: 'Toggle My Day',
    accelerator: 'CmdorCtrl+M',
    click() {
      activate('my-day');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Toggle Cortana',
    accelerator: 'CmdorCtrl+E',
    click() {
      activate('toggle-cortana');
    }
  }, {
    label: 'Complete Todo',
    accelerator: 'CmdorCtrl+Shift+N',
    click() {
      activate('complete-todo');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Set Reminder',
    accelerator: 'CmdorCtrl+Shift+E',
    click() {
      activate('set-reminder');
    }
  }, {
    label: 'Add Due Date',
    accelerator: 'CmdorCtrl+Alt+S',
    click() {
      activate('add-due-date');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Navigate to Next List',
    accelerator: 'CmdorCtrl+Tab',
    click() {
      activate('next-list');
    }
  }, {
    label: 'Navigate to Previous List',
    accelerator: 'CmdorCtrl+Shift+Tab',
    click() {
      activate('previous-list');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Sign out',
    accelerator: 'CmdorCtrl+Alt+Q',
    click() {
      activate('sign-out');
    }
  }, {
    type: 'separator'
  }, {
    role: 'quit'
  }]
}, {
  label: 'Edit',
  submenu: [{
    role: 'undo'
  }, {
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    role: 'cut'
  }, {
    role: 'copy'
  }, {
    role: 'paste'
  }, {
    role: 'pasteandmatchstyle'
  }, {
    role: 'delete'
  }, {
    type: 'separator'
  }, {
    role: 'selectall'
  }]
}, {
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+Shift+R',
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.reload();
      }
    }
  }, {
    type: 'separator'
  }, {
    label: 'Make Text Larger',
    accelerator: 'CmdOrCtrl+Plus',
    click() {
      activate('zoom-in');
    }
  }, {
    label: 'Make Text Smaller',
    accelerator: 'CmdOrCtrl+-',
    click() {
      activate('zoom-out');
    }
  }, {
    label: 'Reset Zoom Level',
    accelerator: 'CmdOrCtrl+0',
    click() {
      activate('zoom-reset');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Toggle Sepia Mode',
    accelerator: 'CmdOrCtrl+G',
    click() {
      activate('toggle-sepia-mode');
    }
  }, {
    label: 'Toggle Dark Mode',
    accelerator: 'CmdOrCtrl+D',
    click() {
      activate('toggle-dark-mode');
    }
  }, {
    label: 'Settings',
    accelerator: 'CmdorCtrl+,',
    click() {
      activate('settings');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Toggle Full Screen',
    accelerator: 'F11',
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        focusedWindow.send('window:fullscreen', {state: focusedWindow.isFullScreen()});
      }
    }
  }, {
    label: 'Toggle Developer Tools',
    accelerator: 'Ctrl+Shift+I',
    click: (item, focusedWindow) => {
      focusedWindow.toggleDevTools();
    }
  }]
}, {
  role: 'help',
  submenu: helpSubmenu
}];

const tpl = process.platform === 'darwin' ? darwinTpl : otherTpl;

module.exports = electron.Menu.buildFromTemplate(tpl);
