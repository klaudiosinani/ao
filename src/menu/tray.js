'use strict';
const {shell} = require('electron');
const dialog = require('./../dialog');
const settings = require('./../settings');
const url = require('./../url');
const win = require('./../win');

module.exports = [
  {
    label: 'Open Ao',
    click() {
      win.toggle();
    }
  }, {
    type: 'separator'
  }, {
    label: 'Search',
    click() {
      win.appear();
      win.activate('search');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Create',
    submenu: [
      {
        label: 'New List',
        click() {
          win.appear();
          win.activate('new-list');
        }
      }, {
        label: 'New Todo',
        click() {
          win.appear();
          win.activate('new-todo');
        }
      }
    ]
  }, {
    label: 'My Day',
    click() {
      win.appear();
      win.activate('my-day');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Toggle Theme',
    submenu: [
      {
        label: 'Sepia Theme',
        click() {
          win.appear();
          win.activate('toggle-sepia-mode');
        }
      }, {
        label: 'Black Theme',
        click() {
          win.appear();
          win.activate('toggle-black-mode');
        }
      }, {
        label: 'Dark Theme',
        click() {
          win.appear();
          win.activate('toggle-dark-mode');
        }
      }
    ]
  }, {
    label: 'Auto Night Mode',
    type: 'checkbox',
    checked: settings.get('autoNightMode'),
    click(item) {
      win.appear();
      settings.set('autoNightMode', item.checked);
      win.activate('auto-night-mode');
    }
  }, {
    type: 'separator'
  }, {
    label: 'To-Do Settings',
    click() {
      win.appear();
      win.activate('settings');
    }
  }, {
    label: 'Report Issue',
    click() {
      shell.openExternal(url.issue);
    }
  }, {
    type: 'separator'
  }, {
    label: 'Exit',
    click() {
      dialog.confirmExit();
    }
  }
];
