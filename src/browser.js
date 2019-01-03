'use strict';
const {ipcRenderer: ipc} = require('electron');
const mode = require('./mode');
const nav = require('./nav');
const settings = require('./settings');
const startup = require('./startup');

ipc.on('search', () => {
  nav.click('.search');
});

ipc.on('new-list', () => {
  nav.click('#baseAddInput');
});

ipc.on('delete-list', () => {
  nav.click('.toolbarButton.more');
  nav.click('.popoverMenuItem-destructive');
});

ipc.on('rename-list', () => {
  nav.click('.listTitle');
});

ipc.on('hide-todo', () => {
  nav.click('.toolbarButton.more');
  nav.click('.checkbox-completed-18');
});

ipc.on('new-todo', () => {
  nav.click('#main > div.main-background > div.baseAdd.addTask > button');
});

ipc.on('rename-todo', () => {
  nav.doubleClick('.taskItem.selected.active');
  nav.click('.editableContent-editButton');
});

ipc.on('delete-todo', () => {
  nav.doubleClick('.taskItem.selected.active');
  nav.click('.detailFooter-trash');
});

ipc.on('add-my-day', () => {
  nav.doubleClick('.taskItem.selected.active');
  nav.select('.detail-body').children[0].children[0].firstChild.click();
  nav.click('.detailFooter-close');
});

ipc.on('complete-todo', () => {
  nav.click('.taskItem.selected.active .checkBox');
});

ipc.on('my-day', () => {
  nav.click('.todayToolbar-item');
});

ipc.on('set-reminder', () => {
  nav.doubleClick('.taskItem.selected.active');
  nav.select('.detail-body').children[1].children[0].firstChild.click();
});

ipc.on('add-due-date', () => {
  nav.doubleClick('.taskItem.selected.active');
  nav.select('.detail-body').children[1].children[1].firstChild.click();
});

ipc.on('settings', () => {
  nav.click('.userToolbar-avatar');
  nav.select('.popoverMenu').children[0].click();
});

ipc.on('sign-out', () => {
  nav.click('.userToolbar-avatar');
  nav.select('.popoverMenu').children[3].click();
});

ipc.on('toggle-sidebar', () => {
  settings.set('sideBarHidden', !settings.get('sideBarHidden'));
  nav.sideBar();
});

ipc.on('return', () => {
  nav.click('.detailFooter-close');
});

ipc.on('toggle-black-mode', () => mode.black());

ipc.on('toggle-dark-mode', () => mode.dark());

ipc.on('toggle-sepia-mode', () => mode.sepia());

ipc.on('auto-night-mode', () => mode.autoNight());

ipc.on('next-list', () => nav.nextList());

ipc.on('previous-list', () => nav.previousList());

ipc.on('auto-launch', () => startup.autoLaunch());

ipc.on('zoom-in', () => nav.zoomIn());

ipc.on('zoom-out', () => nav.zoomOut());

ipc.on('zoom-reset', () => nav.zoomReset());

document.addEventListener('keydown', e => nav.jumpToList(e));

document.addEventListener('DOMContentLoaded', () => {
  nav.zoomRestore();

  if (settings.get('autoNightMode')) {
    mode.autoNight();
  }

  nav.sideBar();
  mode.restore();
});
