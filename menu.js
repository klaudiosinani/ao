'use strict';
const path = require('path');
const electron = require('electron');
const os = require('os');
const fs = require('fs-extra');
const config = require('./config');

const join = path.join;
const resolve = path.resolve;
const app = electron.app;
const shell = electron.shell;
const appName = app.getName();
const BrowserWindow = electron.BrowserWindow;

let configData;
let defaultConfigPath; // Default config file directory
const oaJSON = '.ao.json'; // Config file name
const homeDir = os.homedir();
const homeConfig = join(homeDir, oaJSON); // Config file on home directory

const sourceURL = 'https://github.com/klauscfhq/ao';
const homepageURL = 'https://klauscfhq.github.io/ao';
const communityURL = 'https://gitter.im/klauscfhq/ao';
const issueURL = 'https://github.com/klauscfhq/ao/issues/new';
const searchURL = 'https://github.com/search?q=+is:issue+repo:klauscfhq/ao';
const licenseURL = 'https://github.com/klauscfhq/ao/blob/master/license.md';

function getPath(platform) {
  // Retrieve the default path of the platform-dedicated config file
  switch (platform) {
    case ('darwin'):
      defaultConfigPath = resolve('keymaps', 'darwin.json');
      break;

    case ('linux'):
      defaultConfigPath = resolve('keymaps', 'linux.json');
      break;

    case ('win32'):
      defaultConfigPath = resolve('keymaps', 'win32.json');
      break;

    default:
      defaultConfigPath = resolve('keymaps', 'linux.json');
      break;
  }
  return defaultConfigPath;
}

function getConfig() {
  const platform = process.platform;
  // Get the dedicated config file for each platform
  const defaultConfig = getPath(platform);
  // Create a new default config file if it does not already exist
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

function setAcc(custom, predefined) {
  // Return the custom or predefined shortcut keys
  if (Object.prototype.hasOwnProperty.call(aoConfig.shortcutKeys, custom)) {
    return aoConfig.shortcutKeys[custom];
  }
  return predefined;
}

function activate(custom) {
  const appWindow = BrowserWindow.getAllWindows()[0];
  // Extra measure in order to be shown
  appWindow.show();
  appWindow.webContents.send(custom);
}

const helpSubmenu = [{
  label: `View License`,
  click() {
    shell.openExternal(licenseURL);
  }
}, {
  label: 'Version ' + app.getVersion(),
  enabled: false
}, {
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
  label: `Search Issues`,
  click() {
    shell.openExternal(searchURL);
  }
}, {
  label: `Community Discussion`,
  click() {
    shell.openExternal(communityURL);
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
    label: 'Launch on Start',
    type: 'checkbox',
    checked: config.get('autoLaunch'),
    click(item) {
      config.set('autoLaunch', item.checked);
      activate('auto-launch');
    }
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
    label: 'Font Size Options',
    submenu: [{
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
    }]
  }, {
    type: 'separator'
  }, {
    label: 'Toggle Theme',
    submenu: [{
      label: 'Sepia Theme',
      accelerator: setAcc('toggle-sepia-mode', 'CmdOrCtrl+G'),
      click() {
        activate('toggle-sepia-mode');
      }
    }, {
      label: 'Black Theme',
      accelerator: setAcc('toggle-black-mode', 'CmdOrCtrl+B'),
      click() {
        activate('toggle-black-mode');
      }
    }, {
      label: 'Dark Theme',
      accelerator: setAcc('toggle-dark-mode', 'CmdorCtrl+H'),
      click() {
        activate('toggle-dark-mode');
      }
    }, {
      label: 'Vibrant Theme',
      accelerator: setAcc('toggle-vibrant-mode', 'CmdOrCtrl+Alt+U'),
      click() {
        activate('toggle-vibrant-mode');
      }
    }, {
      label: 'Vibrant Dark Theme',
      accelerator: setAcc('toggle-vibrant-dark-mode', 'CmdOrCtrl+Alt+J'),
      click() {
        activate('toggle-vibrant-dark-mode');
      }
    }]
  }, {
    label: 'Auto Night Mode',
    type: 'checkbox',
    checked: config.get('autoNightMode'),
    accelerator: 'CmdorCtrl+Alt+N',
    click(item) {
      config.set('autoNightMode', item.checked);
      activate('auto-night-mode');
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
    label: 'Always on Top',
    type: 'checkbox',
    checked: config.get('alwaysOnTop'),
    accelerator: 'CmdorCtrl+Shift+P',
    click(item, focusedWindow) {
      config.set('alwaysOnTop', item.checked);
      focusedWindow.setAlwaysOnTop(item.checked);
    }
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
    label: 'Launch on Start',
    type: 'checkbox',
    checked: config.get('autoLaunch'),
    click(item) {
      config.set('autoLaunch', item.checked);
      activate('auto-launch');
    }
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
    label: 'Font Size Options',
    submenu: [{
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
    }]
  }, {
    type: 'separator'
  }, {
    label: 'Toggle Theme',
    submenu: [{
      label: 'Sepia Theme',
      accelerator: setAcc('toggle-sepia-mode', 'CmdOrCtrl+G'),
      click() {
        activate('toggle-sepia-mode');
      }
    }, {
      label: 'Dark Theme',
      accelerator: setAcc('toggle-dark-mode', 'CmdorCtrl+H'),
      click() {
        activate('toggle-dark-mode');
      }
    }, {
      label: 'Black Theme',
      accelerator: setAcc('toggle-black-mode', 'CmdorCtrl+B'),
      click() {
        activate('toggle-black-mode');
      }
    }]
  }, {
    label: 'Auto Night Mode',
    type: 'checkbox',
    checked: config.get('autoNightMode'),
    accelerator: 'CmdorCtrl+Alt+N',
    click(item) {
      config.set('autoNightMode', item.checked);
      activate('auto-night-mode');
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
    label: 'Always on Top',
    type: 'checkbox',
    checked: config.get('alwaysOnTop'),
    accelerator: 'CmdorCtrl+Shift+P',
    click(item, focusedWindow) {
      config.set('alwaysOnTop', item.checked);
      focusedWindow.setAlwaysOnTop(item.checked);
    }
  }, {
    label: 'Hide Tray Icon',
    type: 'checkbox',
    checked: config.get('hideTray'),
    click(item) {
      config.set('hideTray', item.checked);
      app.relaunch();
      app.quit();
    }
  }, {
    type: 'separator'
  }, {
    label: 'Toggle Menu Bar',
    type: 'checkbox',
    checked: config.get('menuBarVisible'),
    click() {
      activate('toggle-menu-bar');
    }
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
