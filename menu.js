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
      accelerator: 'CmdorCtrl+L',
      click() {
        activate('new-list');
      }
    }, {
      label: 'Delete List',
      accelerator: 'CmdorCtrl+Shift+D',
      click() {
        activate('delete-list');
      }
    }, {
      label: 'Rename List',
      accelerator: 'CmdorCtrl+Y',
      click() {
        activate('rename-list');
      }
    }, {
      label: 'Hide Completed Todos',
      accelerator: 'CmdorCtrl+Shift+H',
      click() {
        activate('hide-todo');
      }
    }]
  }, {
    label: 'Todo',
    submenu: [{
      label: 'New Todo',
      accelerator: 'CmdorCtrl+N',
      click() {
        activate('new-todo');
      }
    }, {
      label: 'Delete Todo',
      accelerator: 'CmdorCtrl+D',
      click() {
        activate('delete-todo');
      }
    }, {
      label: 'Rename Todo',
      accelerator: 'CmdorCtrl+T',
      click() {
        activate('rename-todo');
      }
    }, {
      label: 'Add to My Day',
      accelerator: 'CmdorCtrl+K',
      click() {
        activate('add-my-day');
      }
    }, {
      label: 'Complete Todo',
      accelerator: 'CmdorCtrl+Shift+N',
      click() {
        activate('complete-todo');
      }
    }]
  }, {
    type: 'separator'
  }, {
    label: 'My Day',
    accelerator: 'CmdorCtrl+M',
    click() {
      activate('my-day');
    }
  }, {
    label: 'Set Reminder',
    accelerator: 'CmdorCtrl+Shift+E',
    click() {
      activate('set-reminder');
    }
  }, {
    label: 'Add Due Date',
    accelerator: 'CmdorCtrl+Shift+T',
    click() {
      activate('add-due-date');
    }
  }, {
    label: 'Toggle Cortana',
    accelerator: 'CmdorCtrl+E',
    click() {
      activate('toggle-cortana');
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
    label: 'Sign out',
    accelerator: 'CmdorCtrl+Alt+Q',
    click() {
      activate('sign-out');
    }
  }, {
    label: 'Toggle Sidebar',
    accelerator: 'CmdorCtrl+O',
    click() {
      activate('toggle-sidebar');
    }
  }, {
    label: 'Return to Todos',
    accelerator: 'Esc',
    click() {
      activate('return');
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
    accelerator: 'CmdorCtrl+H',
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
      accelerator: 'CmdorCtrl+L',
      click() {
        activate('new-list');
      }
    }, {
      label: 'Delete List',
      accelerator: 'CmdorCtrl+Shift+D',
      click() {
        activate('delete-list');
      }
    }, {
      label: 'Rename List',
      accelerator: 'CmdorCtrl+Y',
      click() {
        activate('rename-list');
      }
    }, {
      label: 'Hide Completed Todos',
      accelerator: 'CmdorCtrl+Shift+H',
      click() {
        activate('hide-todo');
      }
    }]
  }, {
    label: 'Todo',
    submenu: [{
      label: 'New Todo',
      accelerator: 'CmdorCtrl+N',
      click() {
        activate('new-todo');
      }
    }, {
      label: 'Delete Todo',
      accelerator: 'CmdorCtrl+D',
      click() {
        activate('delete-todo');
      }
    }, {
      label: 'Rename Todo',
      accelerator: 'CmdorCtrl+T',
      click() {
        activate('rename-todo');
      }
    }, {
      label: 'Add to My Day',
      accelerator: 'CmdorCtrl+K',
      click() {
        activate('add-my-day');
      }
    }, {
      label: 'Complete Todo',
      accelerator: 'CmdorCtrl+Shift+N',
      click() {
        activate('complete-todo');
      }
    }]
  }, {
    type: 'separator'
  }, {
    label: 'My Day',
    accelerator: 'CmdorCtrl+M',
    click() {
      activate('my-day');
    }
  }, {
    label: 'Set Reminder',
    accelerator: 'CmdorCtrl+Shift+E',
    click() {
      activate('set-reminder');
    }
  }, {
    label: 'Add Due Date',
    accelerator: 'CmdorCtrl+Shift+T',
    click() {
      activate('add-due-date');
    }
  }, {
    label: 'Toggle Cortana',
    accelerator: 'CmdorCtrl+E',
    click() {
      activate('toggle-cortana');
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
    label: 'Sign out',
    accelerator: 'CmdorCtrl+Alt+Q',
    click() {
      activate('sign-out');
    }
  }, {
    label: 'Toggle Sidebar',
    accelerator: 'CmdorCtrl+O',
    click() {
      activate('toggle-sidebar');
    }
  }, {
    label: 'Return to Todos',
    accelerator: 'Esc',
    click() {
      activate('return');
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
    accelerator: 'CmdorCtrl+H',
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
