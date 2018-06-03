'use strict';
const path = require('path');
const electron = require('electron');
const os = require('os');
const timeStamp = require('time-stamp');
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

function untoggleTheme(themeName, activateFunction) {
  // Deactivate theme status if it is not already deactivated
  switch (config.get(themeName)) {
    case true:
      config.set(themeName, false);
      activateFunction();
      break;

    default:
      break;
  }
}

function blackMode() {
  document.documentElement.classList.toggle('black-mode', config.get('mode.black'));
}

function untoggleBlack() {
  untoggleTheme('mode.black', blackMode);
}

ipc.on('toggle-black-mode', () => {
  untoggleDark();
  untoggleSepia();
  untoggleVibrant();
  untoggleDarkVibrant();
  config.set('mode.black', !config.get('mode.black'));
  blackMode();
});

function darkMode() {
  document.documentElement.classList.toggle('dark-mode', config.get('mode.dark'));
}

function untoggleDark() {
  untoggleTheme('mode.dark', darkMode);
}

ipc.on('toggle-dark-mode', () => {
  untoggleBlack();
  untoggleSepia();
  untoggleVibrant();
  untoggleDarkVibrant();
  config.set('mode.dark', !config.get('mode.dark'));
  darkMode();
});

function sepiaMode() {
  document.documentElement.classList.toggle('sepia-mode', config.get('mode.sepia'));
}

function untoggleSepia() {
  untoggleTheme('mode.sepia', sepiaMode);
}

ipc.on('toggle-sepia-mode', () => {
  untoggleBlack();
  untoggleDark();
  untoggleVibrant();
  untoggleDarkVibrant();
  config.set('mode.sepia', !config.get('mode.sepia'));
  sepiaMode();
});

function vibrantMode() {
  document.documentElement.classList.toggle('vibrant-mode', config.get('mode.vibrant'));
  ipc.send('activate-vibrant');
  document.documentElement.style.backgroundColor = 'transparent';
}

function untoggleVibrant() {
  untoggleTheme('mode.vibrant', vibrantMode);
}

ipc.on('toggle-vibrant-mode', () => {
  untoggleBlack();
  untoggleDark();
  untoggleSepia();
  untoggleDarkVibrant();
  config.set('mode.vibrant', !config.get('mode.vibrant'));
  vibrantMode();
});

function vibrantDarkMode() {
  document.documentElement.classList.toggle('vibrant-dark-mode', config.get('mode.vibrantDark'));
  ipc.send('activate-vibrant');
  document.documentElement.style.backgroundColor = 'transparent';
}

function untoggleDarkVibrant() {
  untoggleTheme('mode.vibrantDark', vibrantDarkMode);
}

ipc.on('toggle-vibrant-dark-mode', () => {
  untoggleBlack();
  untoggleDark();
  untoggleSepia();
  untoggleVibrant();
  config.set('mode.vibrantDark', !config.get('mode.vibrantDark'));
  vibrantDarkMode();
});

function autoNightMode() {
  const time = timeStamp('HHmm');
  switch (time <= 1800 && time >= 600) {
    case true:
      untoggleDark();
      untoggleBlack();
      untoggleSepia();
      untoggleVibrant();
      untoggleDarkVibrant();
      break;

    case false:
      untoggleBlack();
      untoggleSepia();
      untoggleVibrant();
      untoggleDarkVibrant();
      config.set('mode.dark', true);
      darkMode();
      break;

    default:
      break;
  }
}

function untoggleAutoNightMode() {
  untoggleDark();
}

ipc.on('auto-night-mode', () => {
  if (config.get('autoNightMode')) {
    autoNightMode();
  } else {
    untoggleAutoNightMode();
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
    autoNightMode();
  }

  toggleMenuBar();

  toggleSideBar();

  blackMode();

  sepiaMode();

  darkMode();

  vibrantMode();

  vibrantDarkMode();
});
