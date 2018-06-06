'use strict';
const path = require('path');
const electron = require('electron');
const os = require('os');
const ms = require('ms');
const config = require('./config');

const {join} = path;
const {ipcRenderer: ipc, shell, webFrame} = electron;

ipc.on('search', () => {
  document.querySelector('.search').click();
});

ipc.on('new-list', () => {
  document.querySelector('.addList').click();
});

ipc.on('delete-list', () => {
  document.querySelector('.toolbarButton.more').click();
  document.querySelector('.popoverMenuItem-destructive').click();
});

ipc.on('rename-list', () => {
  document.querySelector('.listTitle').click();
});

ipc.on('hide-todo', () => {
  document.querySelector('.toolbarButton.more').click();
  document.querySelector('.checkbox-completed-18').click();
});

ipc.on('new-todo', () => {
  document.querySelector('.addTask-icon').click();
});

ipc.on('rename-todo', () => {
  doubleClick('.taskItem.selected.active');
  document.querySelector('.editableContent-editButton').click();
});

ipc.on('delete-todo', () => {
  doubleClick('.taskItem.selected.active');
  document.querySelector('.detailFooter-trash').click();
});

ipc.on('add-my-day', () => {
  doubleClick('.taskItem.selected.active');
  document.querySelector('.detail-body').children[0].children[0].firstChild.click();
  document.querySelector('.detailFooter-close').click();
});

ipc.on('complete-todo', () => {
  document.querySelector('.taskItem.selected.active .checkBox').click();
});

ipc.on('my-day', () => {
  document.querySelector('.todayToolbar-item').click();
});

ipc.on('set-reminder', () => {
  doubleClick('.taskItem.selected.active');
  document.querySelector('.detail-body').children[1].children[0].firstChild.click();
});

ipc.on('add-due-date', () => {
  doubleClick('.taskItem.selected.active');
  document.querySelector('.detail-body').children[1].children[1].firstChild.click();
});

ipc.on('toggle-cortana', () => {
  document.querySelector('.cortanaButton').click();
});

ipc.on('settings', () => {
  document.querySelector('.userToolbar-avatar').click();
  document.querySelector('.popoverMenu').children[0].click();
});

ipc.on('sign-out', () => {
  document.querySelector('.userToolbar-avatar').click();
  document.querySelector('.popoverMenu').children[3].click();
});

function toggleSideBar() {
  document.documentElement.classList.toggle('side-bar-hidden', config.get('sideBarHidden'));
}

ipc.on('toggle-sidebar', () => {
  config.set('sideBarHidden', !config.get('sideBarHidden'));
  toggleSideBar();
});

ipc.on('return', () => {
  document.querySelector('.detailFooter-close').click();
});

ipc.on('edit-shortcuts', () => {
  // Toggle config file
  const homeConfig = join(os.homedir(), '.ao.json');
  shell.openExternal(homeConfig);
});

function doubleClick(classSelector) {
  const doubleClicked = document.createEvent('MouseEvents');
  doubleClicked.initEvent('dblclick', true, true);
  const classToClick = document.querySelector(classSelector);
  classToClick.dispatchEvent(doubleClicked);
}

function toggleMode(name) {
  const {mode} = config.getAll();
  config.set('autoNightMode', false);

  Object.keys(mode).forEach(mode => {
    const status = mode === name ? !config.get(`mode.${mode}`) : false;
    config.set(`mode.${mode}`, status);
    document.documentElement.classList.toggle(`${mode}-mode`, config.get(`mode.${mode}`));
  });

  if (name !== null && name.includes('vibrant')) {
    ipc.send('activate-vibrant');
    document.documentElement.style.backgroundColor = 'transparent';
  }
}

function restoreMode() {
  const {mode} = config.getAll();

  Object.keys(mode).forEach(mode => {
    document.documentElement.classList.toggle(`${mode}-mode`, config.get(`mode.${mode}`));

    if (mode.includes('vibrant')) {
      ipc.send('activate-vibrant');
      document.documentElement.style.backgroundColor = 'transparent';
    }
  });
}

ipc.on('toggle-black-mode', () => {
  toggleMode('black');
});

ipc.on('toggle-dark-mode', () => {
  toggleMode('dark');
});

ipc.on('toggle-sepia-mode', () => {
  toggleMode('sepia');
});

ipc.on('toggle-vibrant-mode', () => {
  toggleMode('vibrant');
});

ipc.on('toggle-vibrant-dark-mode', () => {
  toggleMode('vibrantDark');
});

function enableAutoNightMode() {
  const now = new Date().getHours();
  const isDayTime = hours => hours < 18 && hours > 6;

  const mode = isDayTime(now) ? null : 'dark';
  toggleMode(mode);

  const span = isDayTime(now) ? 18 - now : (now < 6 ? 6 - now : 30 - now);

  if (config.get('autoNightMode')) {
    setTimeout(() => {
      enableAutoNightMode();
    }, ms(`${span}h`));
  }
}

function disableAutoNightMode() {
  toggleMode(null);
}

ipc.on('auto-night-mode', () => {
  if (config.get('autoNightMode')) {
    enableAutoNightMode();
  } else {
    disableAutoNightMode();
  }
});

function toggleMenuBar() {
  ipc.send('activate-menu-bar');
}

ipc.on('toggle-menu-bar', () => {
  config.set('menuBarVisible', !config.get('menuBarVisible'));
  toggleMenuBar();
});

function goToList(key) {
  const index = key;
  selectList(index);
}

const listSelector = '.listItem';
const listCollectionSelector = '.lists';
const selectedListSelector = '.active';
const myDayListSelector = '.todayToolbar-item.active';

function selectList(index) {
  if (index === 0) {
    // Index corresponds to `My Day` list
    document.querySelector(listCollectionSelector).children[0].firstChild.firstChild.firstChild.firstChild.click();
  } else {
    // Index corresponds to list residing inside of the list of lists
    const listIndex = index > 1 ? index : index - 1;
    document.querySelector(listCollectionSelector).children[1].children[listIndex].firstChild.firstChild.firstChild.firstChild.click();
  }
}

function goToNextList() {
  const index = getCurrentIndex();
  if (isLastList(index)) {
    selectList(0);
  } else {
    const nextIndex = getNextIndex(index);
    selectList(nextIndex);
  }
}

function goToPreviousList() {
  const index = getCurrentIndex();
  if (isFirstList(index)) {
    const lastIndex = getLastListIndex();
    selectList(lastIndex);
  } else {
    const previousIndex = getPreviousIndex(index);
    selectList(previousIndex);
  }
}

function getCurrentIndex() {
  let currentIndex;
  const selectedList = document.querySelector(selectedListSelector);
  const myDayList = document.querySelector(myDayListSelector);

  const lists = document.querySelector(listCollectionSelector).querySelectorAll(listSelector);

  if (selectedList === myDayList) {
    currentIndex = 0; // `My Day` list is selected thus the list index is zero
  } else {
    // Traverse the array and find the index of selected list
    for (let i = 0; i < lists.length; i++) {
      if (lists[i] === selectedList) {
        currentIndex = i + 1;
      }
    }
  }

  return currentIndex;
}

function getLastListIndex() {
  const listsArray = document.querySelector(listCollectionSelector).querySelectorAll(listSelector);
  return listsArray.length;
}

function isLastList(index) {
  const lastListIndex = getLastListIndex();
  return index === lastListIndex;
}

function isFirstList(index) {
  return index === 0;
}

function getNextIndex(currentIndex) {
  return ++currentIndex;
}

function getPreviousIndex(currentIndex) {
  return --currentIndex;
}

ipc.on('next-list', goToNextList);

ipc.on('previous-list', goToPreviousList);

function toggleAutoLaunch() {
  const startup = require('./startup');

  if (config.get('autoLaunch')) {
    startup.activate();
    console.log('Activated auto-launch on startup');
  } else {
    startup.deactivate();
    console.log('Deactivated auto-launch on startup');
  }
}

ipc.on('auto-launch', toggleAutoLaunch);

ipc.on('zoom-in', () => {
  const currentZoomFactor = webFrame.getZoomFactor();
  const zoomFactor = currentZoomFactor + 0.05;

  if (zoomFactor < 1.3) {
    webFrame.setZoomFactor(zoomFactor);
    config.set('zoomFactor', zoomFactor);
  }
});

ipc.on('zoom-out', () => {
  const currentZoomFactor = webFrame.getZoomFactor();
  const zoomFactor = currentZoomFactor - 0.05;

  if (zoomFactor > 0.7) {
    webFrame.setZoomFactor(zoomFactor);
    config.set('zoomFactor', zoomFactor);
  }
});

ipc.on('zoom-reset', () => {
  webFrame.setZoomFactor(1.0);
  config.set('zoomFactor', 1.0);
});

document.addEventListener('keydown', event => {
  let comboKey;

  if (process.platform === 'darwin') {
    comboKey = event.metaKey;
  } else {
    comboKey = event.ctrlKey;
  }

  if (comboKey === false) {
    return null;
  }

  const givenNum = parseInt(event.key, 10);

  if (givenNum < 10 && givenNum > 0) {
    goToList(givenNum - 1);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const zoomFactor = config.get('zoomFactor');
  webFrame.setZoomFactor(zoomFactor);

  if (config.get('autoNightMode')) {
    enableAutoNightMode();
  }

  toggleMenuBar();

  toggleSideBar();

  restoreMode();
});
