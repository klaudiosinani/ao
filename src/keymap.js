'use strict';
const { globalShortcut } = require('electron');
const ShortcutConfig = require('./ShortcutConfig');
const ShortcutAction = require('./ShortcutAction');
const win = require('./win');
const { shortcutKeys } = require('./config');

class Keymap {
  registerGlobal() {
    const toggleAo = globalShortcut.register(
      ShortcutConfig.get('global-toggle-window', 'CmdorCtrl+Alt+A'),
      ShortcutAction.toggleWindow
    );

    const searchTodo = globalShortcut.register(
      ShortcutConfig.get('global-search-todo', 'CmdorCtrl+Alt+F'),
      ShortcutAction.openSearch
    );

    const createTodo = globalShortcut.register(
      ShortcutConfig.get('global-create-todo', 'CmdorCtrl+Alt+C'),
      ShortcutAction.createTodo
    );

    const success = toggleAo && searchTodo && createTodo;

    console.log(success
      ? 'Successfully registered global shortcut keys'
      : 'Global shortcut keys registration failed');
  }
}

class ShortcutConfig {
  static get(custom, fallback) {
    return shortcutKeys.hasOwnProperty(custom) ? shortcutKeys[custom] : fallback;
  }
}


class ShortcutAction {
  static toggleWindow() {
    win.toggle();
  }

  static openSearch() {
    win.appear();
    win.activate('search');
  }

  static createTodo() {
    win.appear();
    win.activate('new-todo');
  }
}


module.exports = {
  Keymap,
  ShortcutConfig,
  ShortcutAction
};
