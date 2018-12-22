'use strict';
const {activate} = require('./../win');
const {is} = require('./../util');
const {setAcc} = require('./../keymap');
const dialog = require('./../dialog');
const settings = require('./../settings');

module.exports = {
  label: 'View',
  submenu: [
    {
      label: 'Reload',
      accelerator: 'CmdOrCtrl+Shift+R',
      click: (_, focusedWindow) => {
        if (focusedWindow) {
          focusedWindow.reload();
        }
      }
    }, {
      type: 'separator'
    }, {
      label: 'Font Size Options',
      submenu: [
        {
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
        }
      ]
    }, {
      type: 'separator'
    }, {
      label: 'Toggle Theme',
      submenu: [
        {
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
        }
      ]
    }, {
      label: 'Auto Night Mode',
      type: 'checkbox',
      checked: settings.get('autoNightMode'),
      accelerator: 'CmdorCtrl+Alt+N',
      click(item) {
        settings.set('autoNightMode', item.checked);
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
      checked: settings.get('alwaysOnTop'),
      accelerator: 'CmdorCtrl+Shift+P',
      click(item, focusedWindow) {
        settings.set('alwaysOnTop', item.checked);
        focusedWindow.setAlwaysOnTop(item.checked);
      }
    }, {
      label: 'Hide Tray Icon',
      type: 'checkbox',
      visible: !is.darwin,
      checked: settings.get('hideTray'),
      click(item) {
        settings.set('hideTray', item.checked);
        dialog.confirmRestart();
      }
    }, {
      type: 'separator'
    }, {
      label: 'Toggle Side Bar',
      type: 'checkbox',
      checked: !settings.get('sideBarHidden'),
      accelerator: setAcc('toggle-sidebar', 'CmdorCtrl+O'),
      click() {
        activate('toggle-sidebar');
      }
    }, {
      label: 'Toggle Menu Bar',
      type: 'checkbox',
      checked: !settings.get('menuBarHidden'),
      visible: !is.darwin,
      click(item, focusedWindow) {
        settings.set('menuBarHidden', !item.checked);
        focusedWindow.setMenuBarVisibility(item.checked);
        focusedWindow.setAutoHideMenuBar(!item.checked);
      }
    }, {
      label: 'Toggle Full Screen',
      accelerator: 'Ctrl+Command+F',
      click: (_, focusedWindow) => {
        if (focusedWindow) {
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          focusedWindow.send('window:fullscreen', {state: focusedWindow.isFullScreen()});
        }
      }
    }, {
      label: 'Toggle Developer Tools',
      accelerator: 'Alt+Command+I',
      click: (_, focusedWindow) => {
        focusedWindow.toggleDevTools();
      }
    }
  ]
};
