'use strict';
const path = require('path');
const electron = require('electron');
const os = require('os');
const timeStamp = require('time-stamp');
const config = require('./config');

const join = path.join;
const shell = electron.shell;
const ipc = electron.ipcRenderer;
const webFrame = electron.webFrame;

const oaJSON = '.ao.json'; // Config file name
const homeDir = os.homedir();
const homeConfig = join(homeDir, oaJSON); // Config file on home directory

ipc.on('search', () => {
  // Search Todos
  document.querySelector('.search').click();
});

ipc.on('new-list', () => {
  // Create New List
  document.querySelector('.addList').click();
});

ipc.on('delete-list', () => {
  // Delete List
  document.querySelector('.toolbarButton.more').click();
  document.querySelector('.popoverMenuItem-destructive').click();
});

ipc.on('rename-list', () => {
  // Rename List
  document.querySelector('.listTitle').click();
});

ipc.on('hide-todo', () => {
  // Hide Completed Todos
  document.querySelector('.toolbarButton.more').click();
  document.querySelector('.checkbox-completed-18').click();
});

ipc.on('new-todo', () => {
  // Create New Todo
  document.querySelector('.addTask-icon').click();
});

ipc.on('rename-todo', () => {
  // Rename Todo
  doubleClick('.taskItem.selected.active');
  document.querySelector('.editableContent-editButton').click();
});

ipc.on('delete-todo', () => {
  // Delete Todo
  doubleClick('.taskItem.selected.active');
  document.querySelector('.detailFooter-trash').click();
});

ipc.on('add-my-day', () => {
  // Add Todo to My Day list
  doubleClick('.taskItem.selected.active');
  document.querySelector('.detail-body').children[0].children[0].firstChild.click();
  document.querySelector('.detailFooter-close').click();
});

ipc.on('complete-todo', () => {
  // Complete Todo
  document.querySelector('.taskItem.selected.active .checkBox').click();
});

ipc.on('my-day', () => {
  // Toggle My Day List
  document.querySelector('.todayToolbar-item').click();
});

ipc.on('set-reminder', () => {
  // Set Reminder
  doubleClick('.taskItem.selected.active');
  document.querySelector('.detail-body').children[1].children[0].firstChild.click();
});

ipc.on('add-due-date', () => {
  // Add Due Date
  doubleClick('.taskItem.selected.active');
  document.querySelector('.detail-body').children[1].children[1].firstChild.click();
});

ipc.on('toggle-cortana', () => {
  // Toggle Cortana
  document.querySelector('.cortanaButton').click();
});

ipc.on('settings', () => {
  // Toggle Settings
  document.querySelector('.userToolbar-avatar').click();
  document.querySelector('.popoverMenu').children[0].click();
});

ipc.on('sign-out', () => {
  // Sign out
  document.querySelector('.userToolbar-avatar').click();
  document.querySelector('.popoverMenu').children[3].click();
});

function toggleSideBar() {
  // Toggle the side bar & adjust the background theme
  document.documentElement.classList.toggle('side-bar-hidden', config.get('sideBarHidden'));
}

ipc.on('toggle-sidebar', () => {
  // Toggle on and off the side bar
  config.set('sideBarHidden', !config.get('sideBarHidden'));
  toggleSideBar();
});

ipc.on('return', () => {
  // Return back to Todos
  document.querySelector('.detailFooter-close').click();
});

ipc.on('edit-shortcuts', () => {
  // Toggle config file
  shell.openExternal(homeConfig);
});

function doubleClick(classSelector) {
  const doubleClicked = document.createEvent('MouseEvents');
  // Make it bubbly and cancelable
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
  document.documentElement.classList.toggle('black-mode', config.get('blackMode'));
}

function untoggleBlack() {
  // Untoggle the black theme
  untoggleTheme('blackMode', blackMode);
}

ipc.on('toggle-black-mode', () => {
  untoggleDark();
  untoggleSepia();
  untoggleVibrant();
  untoggleDarkVibrant();
  // Toggle the black theme
  config.set('blackMode', !config.get('blackMode'));
  blackMode();
});

function darkMode() {
  document.documentElement.classList.toggle('dark-mode', config.get('darkMode'));
}

function untoggleDark() {
  // Untoggle the dark theme
  untoggleTheme('darkMode', darkMode);
}

ipc.on('toggle-dark-mode', () => {
  untoggleBlack();
  untoggleSepia();
  untoggleVibrant();
  untoggleDarkVibrant();
  // Toggle the dark theme
  config.set('darkMode', !config.get('darkMode'));
  darkMode();
});

function sepiaMode() {
  document.documentElement.classList.toggle('sepia-mode', config.get('sepiaMode'));
}

function untoggleSepia() {
  // Untoggle the sepia theme
  untoggleTheme('sepiaMode', sepiaMode);
}

ipc.on('toggle-sepia-mode', () => {
  untoggleBlack();
  untoggleDark();
  untoggleVibrant();
  untoggleDarkVibrant();
  // Toggle the sepia theme
  config.set('sepiaMode', !config.get('sepiaMode'));
  sepiaMode();
});

function vibrantMode() {
  document.documentElement.classList.toggle('vibrant-mode', config.get('vibrantMode'));
  // Activate vibrant mode on main window
  ipc.send('activate-vibrant');
  // Make app background transparent
  document.documentElement.style.backgroundColor = 'transparent';
}

function untoggleVibrant() {
  // Untoggle the vibrant theme
  untoggleTheme('vibrantMode', vibrantMode);
}

ipc.on('toggle-vibrant-mode', () => {
  untoggleBlack();
  untoggleDark();
  untoggleSepia();
  untoggleDarkVibrant();
  // Toggle the vibrant theme
  config.set('vibrantMode', !config.get('vibrantMode'));
  vibrantMode();
});

function vibrantDarkMode() {
  document.documentElement.classList.toggle('vibrant-dark-mode', config.get('vibrantDarkMode'));
  // Activate dark vibrant mode on main window
  ipc.send('activate-vibrant');
  // Make app background transparent
  document.documentElement.style.backgroundColor = 'transparent';
}

function untoggleDarkVibrant() {
  // Untoggle the dark vibrant theme
  untoggleTheme('vibrantDarkMode', vibrantDarkMode);
}

ipc.on('toggle-vibrant-dark-mode', () => {
  untoggleBlack();
  untoggleDark();
  untoggleSepia();
  untoggleVibrant();
  // Toggle the dark vibrant theme
  config.set('vibrantDarkMode', !config.get('vibrantDarkMode'));
  vibrantDarkMode();
});

function autoNightMode() {
  // Switch between light and dark themes based on daytime
  const time = timeStamp('HHmm');
  switch (time <= 1800 && time >= 600) {
    case true:
      // Switch to the light theme
      untoggleDark();
      untoggleBlack();
      untoggleSepia();
      untoggleVibrant();
      untoggleDarkVibrant();
      break;

    case false:
      // Switch to the dark theme
      untoggleBlack();
      untoggleSepia();
      untoggleVibrant();
      untoggleDarkVibrant();
      config.set('darkMode', true);
      darkMode();
      break;

    default:
      break;
  }
}

function untoggleAutoNightMode() {
  // Untoggle the auto night mode
  untoggleDark();
}

ipc.on('auto-night-mode', () => {
  // Toggle on and off the auto night mode
  if (config.get('autoNightMode')) {
    autoNightMode();
  } else {
    untoggleAutoNightMode();
  }
});

function toggleMenuBar() {
  // Activates the menu bar on the main window
  ipc.send('activate-menu-bar');
}

ipc.on('toggle-menu-bar', () => {
  // Toggles on and off the menu bar
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
  // Select the appropriate list based on given index
  if (index === 0) {
    // Index corresponds to `My Day` list
    document.querySelector(listCollectionSelector).children[0].firstChild.firstChild.firstChild.firstChild.click();
  } else {
    // Index corresponds to list residing inside of the list of lists
    document.querySelector(listCollectionSelector).children[1].children[index - 1].firstChild.firstChild.firstChild.firstChild.click();
  }
}

function goToNextList() {
  // Navigate to the next list
  const index = getCurrentIndex();
  if (isLastList(index)) {
    // Currently on the last list thus move to the first one
    selectList(0);
  } else {
    // Navigate to the next list
    const nextIndex = getNextIndex(index);
    selectList(nextIndex);
  }
}

function goToPreviewsList() {
  // Navigate to the previews list
  const index = getCurrentIndex();
  if (isFirstList(index)) {
    // Currently on the first list thus move to the last one
    const lastIndex = getLastListIndex();
    selectList(lastIndex);
  } else {
    // Navigate to the previews list
    const previewsIndex = getPreviewsIndex(index);
    selectList(previewsIndex);
  }
}

function getCurrentIndex() {
  // Calculate the index of the current list
  let i;
  let currentIndex;
  let listsArray = [];

  // Get the css meta of the currently selected list
  const selectedList = document.querySelector(selectedListSelector);
  // Get the css meta of the `My Day` list
  const myDayList = document.querySelector(myDayListSelector);
  // Create an array of lists relative to the currently selected list
  listsArray = document.querySelector(listCollectionSelector).querySelectorAll(listSelector);

  if (selectedList === myDayList) {
    // `My Day` list is selected thus the list index is zero
    currentIndex = 0;
  } else {
    // Traverse the array and find the index of selected list
    for (i = 0; i < listsArray.length; i++) {
      if (listsArray[i] === selectedList) {
        currentIndex = i + 1;
      }
    }
  }
  return currentIndex;
}

function getLastListIndex() {
  // Get the index of the last list item
  const listsArray = document.querySelector(listCollectionSelector).querySelectorAll(listSelector);
  const lastListIndex = listsArray.length;
  return lastListIndex;
}

function isLastList(index) {
  // Check whether the given index belongs to the last list item
  const lastListIndex = getLastListIndex();
  return (index === lastListIndex);
}

function isFirstList(index) {
  // Check whether the given index belongs to the first list item
  return (index === 0);
}

function getNextIndex(currentIndex) {
  // Calculate the index of the next list relatively to the current list index
  const nextIndex = currentIndex + 1;
  return nextIndex;
}

function getPreviewsIndex(currentIndex) {
  // Calculate the index of the previews list relatively to the current list index
  const previewsIndex = currentIndex - 1;
  return previewsIndex;
}

ipc.on('next-list', goToNextList);

ipc.on('previous-list', goToPreviewsList);

function toggleAutoLaunch() {
  // Decide whether or not the app should launch on login
  const startup = require('./startup');

  if (config.get('autoLaunch')) {
    // Activate app launching
    startup.activate();
    console.log('Activated auto-launch on startup.');
  } else {
    // Deactivate app launching
    startup.deactivate();
    console.log('Deactivated auto-launch on startup.');
  }
}

ipc.on('auto-launch', toggleAutoLaunch);

ipc.on('zoom-in', () => {
  // Get zoom factor and increase it
  const currentZoomFactor = webFrame.getZoomFactor();
  const zoomFactor = currentZoomFactor + 0.05;
  // Upper bound check
  if (zoomFactor < 1.3) {
    webFrame.setZoomFactor(zoomFactor);
    config.set('zoomFactor', zoomFactor);
  }
});

ipc.on('zoom-out', () => {
  // Get zoom factor and decrease it
  const currentZoomFactor = webFrame.getZoomFactor();
  const zoomFactor = currentZoomFactor - 0.05;
  // Lower bound check
  if (zoomFactor > 0.7) {
    webFrame.setZoomFactor(zoomFactor);
    config.set('zoomFactor', zoomFactor);
  }
});

ipc.on('zoom-reset', () => {
  // Reset zoom factor
  webFrame.setZoomFactor(1.0);
  config.set('zoomFactor', 1.0);
});

document.addEventListener('keydown', event => {
  let comboKey;

  // OS check
  if (process.platform === 'darwin') {
    comboKey = event.metaKey;
  } else {
    comboKey = event.ctrlKey;
  }

  // Validity check
  if (comboKey === false) {
    return null;
  }

  // Parse as decimal
  const givenNum = parseInt(event.key, 10);

  // Get index
  if (givenNum < 10 && givenNum > 0) {
    goToList(givenNum - 1);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Preserve zoom factor
  const zoomFactor = config.get('zoomFactor');
  webFrame.setZoomFactor(zoomFactor);
  // Toggle auto night mode
  if (config.get('autoNightMode')) {
    autoNightMode();
  }
  // Toggle the menu bar
  toggleMenuBar();
  // Toggle the side bar
  toggleSideBar();
  // Toggle black mode
  blackMode();
  // Toggle sepia mode
  sepiaMode();
  // Toggle dark mode
  darkMode();
  // Toggle vibrant mode
  vibrantMode();
  // Toggle vibrant dark mode
  vibrantDarkMode();
  // Prevent white flashing screen on startup
  if (!config.get('vibrantMode') && !config.get('vibrantDarkMode')) {
    document.documentElement.style.backgroundColor = '#212121';
  }

  // Intercept notification (reminder) block changes and throw our own event in case of any change
  addEventForChild(document.getElementsByTagName('body')[0], 'DOMSubtreeModified', '.notifications', matchingChild => {
    if (matchingChild !== null) {
      if (matchingChild.innerHTML.trim() === '') {
        ipc.send('notification-hidden');
      } else {
        ipc.send('notification-shown');
      }
    }
  });
});

// Analog of jQuery.on(...)
function addEventForChild(parent, eventName, childSelector, cb) {
  parent.addEventListener(eventName, event => {
    const clickedElement = event.target;
    if (clickedElement && clickedElement.closest) {
      const matchingChild = clickedElement.closest(childSelector);
      cb(matchingChild);
    }
  });
}
