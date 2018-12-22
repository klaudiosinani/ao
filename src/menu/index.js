'use strict';
const {Menu} = require('electron');
const {is} = require('./../util');
const app = require('./app');
const edit = require('./edit');
const file = require('./file');
const help = require('./help');
const view = require('./view');
const window = require('./window');

const darwin = [app, file, edit, view, window, help];
const rest = [file, edit, view, help];

module.exports = Menu.buildFromTemplate(is.darwin ? darwin : rest);
