'use strict';
const electron = require('electron');
const config = require('./config');

const ipc = electron.ipcRenderer;
const webFrame = electron.webFrame;

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

ipc.on('return', () => {
  // Return back to Todos
  document.querySelector('.detailFooter-close').click();
});

ipc.on('toggle-sidebar', () => {
  // Toggle sidebar
  const sidebar = document.querySelector('#sidebar');
  const display = sidebar.style.display;
  sidebar.style.display = display === '' ? 'none' : '';
  // Adjust background theme
  const themeBackground = document.querySelector('html[dir=ltr] .themeBackground');
  const left = themeBackground.style.left;
  themeBackground.style.left = left === '-280px' ? '280px' : '-280px';
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

function darkMode() {
  document.documentElement.classList.toggle('dark-mode', config.get('darkMode'));
}

function untoggleDark() {
  // Untoggle the dark theme
  untoggleTheme('darkMode', darkMode);
}

ipc.on('toggle-dark-mode', () => {
  untoggleSepia();
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
  untoggleDark();
  // Toggle the sepia theme
  config.set('sepiaMode', !config.get('sepiaMode'));
  sepiaMode();
});

function goToList(key) {
  const index = key;
  selectList(index);
}

const listSelector = '.listItem';
const listCollection = '.lists > span';
const listCollectionSelector = '.lists';
const selectedListSelector = '.listItem.active';

function selectList(index) {
  // Select the appropriate list based on given index
  document.querySelector(listCollection).children[index].firstChild.firstChild.firstChild.firstChild.click();
}

function goToNextList() {
  // Navigate to the next list
  const index = getCurrentIndex();
  const nextIndex = getNextIndex(index);
  console.log('Next list index is: ' + nextIndex);
  selectList(nextIndex);
}

function goToPreviewsList() {
  // Navigate to the previews list
  const index = getCurrentIndex();
  const previewsIndex = getPreviewsIndex(index);
  console.log('Previews list index is: ' + previewsIndex);
  selectList(previewsIndex);
}

// Calculate the index of the current list
function getCurrentIndex() {
  let i;
  let currentIndex; // Index of current list
  let listsArray = []; // Array of lists

  // Get the css meta of the currently selected list
  const selectedList = document.querySelector(selectedListSelector);
  // Create an array of lists relative to the currently selected list
  listsArray = document.querySelector(listCollectionSelector).querySelectorAll(listSelector);

  // Traverse the array and find the index of selected list
  for (i = 0; i < listsArray.length; i++) {
    if (listsArray[i] === selectedList) {
      currentIndex = i;
      console.log('The currently selected list has an index of: ' + currentIndex);
    }
  }
  // Return the current list index
  return currentIndex;
}

// Calculate the index of the next list
// relatively to the current list index
function getNextIndex(currentIndex) {
  const nextIndex = currentIndex + 1; // Index value of next list
  console.log('The next list will have an index of: ' + nextIndex);
  return nextIndex;
}

// Calculate the index of the previews list
// relatively to the current list index
function getPreviewsIndex(currentIndex) {
  const previewsIndex = currentIndex - 1; // Index value of previews list
  console.log('The previews list will have an index of: ' + previewsIndex);
  return previewsIndex;
}

ipc.on('next-list', goToNextList);

ipc.on('previous-list', goToPreviewsList);

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
  // Toggle sepia mode
  sepiaMode();
  // Toggle dark mode
  darkMode();
  // Prevent white flashing screen on startup
  document.documentElement.style.backgroundColor = '#212121';
});
