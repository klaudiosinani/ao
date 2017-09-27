'use strict';
const path = require('path');
const electron = require('electron');
const os = require('os');
const fs = require('fs-extra');

const join = path.join;
const app = electron.app;
const shell = electron.shell;
const appName = app.getName();
const BrowserWindow = electron.BrowserWindow;

let configData;
const oaJSON = '.ao.json'; // Config file name
const homeDir = os.homedir();
const homeConfig = join(homeDir, oaJSON); // Config file on home directory
const defaultConfig = join(__dirname, '.', oaJSON); // Default config file directory

const sourceURL = 'https://github.com/klauscfhq/ao';
const homepageURL = 'https://github.com/klauscfhq/ao';
const issueURL = 'https://github.com/klauscfhq/ao/issues/new';
const releaseURL = 'https://github.com/klauscfhq/ao/releases/latest';

function getConfig() {
  // Create a new default config file
  // if it does not already exist
  if (!fs.existsSync(homeConfig)) {
    try {
      fs.copySync(defaultConfig, homeConfig);
      console.log('Ao config file was created successfully');
    } catch (err) {
      console.error(err);
    }
  }
  // Parse the content of the config file
  try {
    configData = JSON.parse(fs.readFileSync(homeConfig, 'utf8'));
  } catch (err) {
    console.log('Invalid JSON object');
  }
  return configData;
}

// Get the user-defined settings
const aoConfig = getConfig();

function setAcc(custom, predifined) {
  // Return the custom or predifined shortcut keys
  if (Object.prototype.hasOwnProperty.call(aoConfig.shortcutKeys, custom)) {
    return aoConfig.shortcutKeys[custom];
  }
  return predifined;
}

function activate(custom) {
  const appWindow = BrowserWindow.getAllWindows()[0];
  // Extra measure in order to be shown
  appWindow.show();
  appWindow.webContents.send(custom);
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
    label: 'List',
    submenu: [{
      label: 'New List',
      accelerator: setAcc('new-list', 'CmdorCtrl+L'),
      click() {
        activate('new-list');
      }
    }, {
      label: 'Delete List',
      accelerator: setAcc('delete-list', 'CmdorCtrl+Shift+D'),
      click() {
        activate('delete-list');
      }
    }, {
      label: 'Rename List',
      accelerator: setAcc('rename-list', 'CmdorCtrl+Y'),
      click() {
        activate('rename-list');
      }
    }, {
      type: 'separator'
    }, {
      label: 'Hide Completed Todos',
      accelerator: setAcc('hide-todo', 'CmdorCtrl+Shift+H'),
      click() {
        activate('hide-todo');
      }
    }]
  }, {
    label: 'Todo',
    submenu: [{
      label: 'New Todo',
      accelerator: setAcc('new-todo', 'CmdorCtrl+N'),
      click() {
        activate('new-todo');
      }
    }, {
      label: 'Delete Todo',
      accelerator: setAcc('delete-todo', 'CmdorCtrl+D'),
      click() {
        activate('delete-todo');
      }
    }, {
      label: 'Rename Todo',
      accelerator: setAcc('rename-todo', 'CmdorCtrl+T'),
      click() {
        activate('rename-todo');
      }
    }, {
      type: 'separator'
    }, {
      label: 'Add to My Day',
      accelerator: setAcc('add-my-day', 'CmdorCtrl+K'),
      click() {
        activate('add-my-day');
      }
    }, {
      label: 'Complete Todo',
      accelerator: setAcc('complete-todo', 'CmdorCtrl+Shift+N'),
      click() {
        activate('complete-todo');
      }
    }]
  }, {
    type: 'separator'
  }, {
    label: 'My Day',
    accelerator: setAcc('my-day', 'CmdorCtrl+M'),
    click() {
      activate('my-day');
    }
  }, {
    label: 'Set Reminder',
    accelerator: setAcc('set-reminder', 'CmdorCtrl+Shift+E'),
    click() {
      activate('set-reminder');
    }
  }, {
    label: 'Add Due Date',
    accelerator: setAcc('add-due-date', 'CmdorCtrl+Shift+T'),
    click() {
      activate('add-due-date');
    }
  }, {
    label: 'Toggle Cortana',
    accelerator: setAcc('toggle-cortana', 'CmdorCtrl+E'),
    click() {
      activate('toggle-cortana');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Settings',
    accelerator: setAcc('settings', 'CmdorCtrl+,'),
    click() {
      activate('settings');
    }
  }, {
    label: 'Sign out',
    accelerator: setAcc('sign-out', 'CmdorCtrl+Alt+Q'),
    click() {
      activate('sign-out');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Toggle Sidebar',
    accelerator: setAcc('toggle-sidebar', 'CmdorCtrl+O'),
    click() {
      activate('toggle-sidebar');
    }
  }, {
    label: 'Return to Todos',
    accelerator: setAcc('return', 'Esc'),
    click() {
      activate('return');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Edit Shortcut Keys',
    accelerator: 'CmdorCtrl+.',
    click() {
      activate('edit-shortcuts');
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
    accelerator: setAcc('toggle-sepia-mode', 'CmdOrCtrl+G'),
    click() {
      activate('toggle-sepia-mode');
    }
  }, {
    label: 'Toggle Dark Mode',
    accelerator: setAcc('toggle-dark-mode', 'CmdorCtrl+H'),
    click() {
      activate('toggle-dark-mode');
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
    label: 'List',
    submenu: [{
      label: 'New List',
      accelerator: setAcc('new-list', 'CmdorCtrl+L'),
      click() {
        activate('new-list');
      }
    }, {
      label: 'Delete List',
      accelerator: setAcc('delete-list', 'CmdorCtrl+Shift+D'),
      click() {
        activate('delete-list');
      }
    }, {
      label: 'Rename List',
      accelerator: setAcc('rename-list', 'CmdorCtrl+Y'),
      click() {
        activate('rename-list');
      }
    }, {
      type: 'separator'
    }, {
      label: 'Hide Completed Todos',
      accelerator: setAcc('hide-todo', 'CmdorCtrl+Shift+H'),
      click() {
        activate('hide-todo');
      }
    }]
  }, {
    label: 'Todo',
    submenu: [{
      label: 'New Todo',
      accelerator: setAcc('new-todo', 'CmdorCtrl+N'),
      click() {
        activate('new-todo');
      }
    }, {
      label: 'Delete Todo',
      accelerator: setAcc('delete-todo', 'CmdorCtrl+D'),
      click() {
        activate('delete-todo');
      }
    }, {
      label: 'Rename Todo',
      accelerator: setAcc('rename-todo', 'CmdorCtrl+T'),
      click() {
        activate('rename-todo');
      }
    }, {
      type: 'separator'
    }, {
      label: 'Add to My Day',
      accelerator: setAcc('add-my-day', 'CmdorCtrl+K'),
      click() {
        activate('add-my-day');
      }
    }, {
      label: 'Complete Todo',
      accelerator: setAcc('complete-todo', 'CmdorCtrl+Shift+N'),
      click() {
        activate('complete-todo');
      }
    }]
  }, {
    type: 'separator'
  }, {
    label: 'My Day',
    accelerator: setAcc('my-day', 'CmdorCtrl+M'),
    click() {
      activate('my-day');
    }
  }, {
    label: 'Set Reminder',
    accelerator: setAcc('set-reminder', 'CmdorCtrl+Shift+E'),
    click() {
      activate('set-reminder');
    }
  }, {
    label: 'Add Due Date',
    accelerator: setAcc('add-due-date', 'CmdorCtrl+Shift+T'),
    click() {
      activate('add-due-date');
    }
  }, {
    label: 'Toggle Cortana',
    accelerator: setAcc('toggle-cortana', 'CmdorCtrl+E'),
    click() {
      activate('toggle-cortana');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Settings',
    accelerator: setAcc('settings', 'CmdorCtrl+,'),
    click() {
      activate('settings');
    }
  }, {
    label: 'Sign out',
    accelerator: setAcc('sign-out', 'CmdorCtrl+Alt+Q'),
    click() {
      activate('sign-out');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Toggle Sidebar',
    accelerator: setAcc('toggle-sidebar', 'CmdorCtrl+O'),
    click() {
      activate('toggle-sidebar');
    }
  }, {
    label: 'Return to Todos',
    accelerator: setAcc('return', 'Esc'),
    click() {
      activate('return');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Edit Shortcut Keys',
    accelerator: 'CmdorCtrl+.',
    click() {
      activate('edit-shortcuts');
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
    accelerator: setAcc('toggle-sepia-mode', 'CmdOrCtrl+G'),
    click() {
      activate('toggle-sepia-mode');
    }
  }, {
    label: 'Toggle Dark Mode',
    accelerator: setAcc('toggle-dark-mode', 'CmdorCtrl+H'),
    click() {
      activate('toggle-dark-mode');
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
