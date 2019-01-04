'use strict';
const {webFrame} = require('electron');
const {is} = require('./util');
const settings = require('./settings');

class Nav {
  constructor() {
    this._defaultZoomFactor = 1.0;
    this._listItem = '.listItem';
    this._lists = '.lists';
    this._lowerZoomLimit = 0.7;
    this._myDayList = '.todayToolbar-item';
    this._selectedListItem = '.active';
    this._upperZoomLimit = 1.3;
    this._zoomStep = 0.05;
  }

  get _lastIdx() {
    return this._getLists().length - 1;
  }

  _currentIdx() {
    let currentIdx = 0;
    const lists = this._getLists();
    const selectedList = this.select(this._selectedListItem);

    for (let i = 0; i < lists.length; i++) {
      if (lists[i] === selectedList) {
        currentIdx += i;
      }
    }

    return currentIdx;
  }

  _getLists() {
    const myDayList = this.select(this._myDayList);
    return [myDayList, ...document.querySelector(this._lists).querySelectorAll(this._listItem)];
  }

  click(x) {
    document.querySelector(x).click();
  }

  jumpToList(event) {
    const comboKey = is.darwin ? event.metaKey : event.ctrlKey;

    if (!comboKey) {
      return null;
    }

    const n = parseInt(event.key, 10);

    if (n > 0 && n < 10) {
      this.selectList(n - 1);
    }
  }

  sideBar() {
    document.documentElement.classList.toggle('side-bar-hidden', settings.get('sideBarHidden'));
  }

  nextList() {
    const idx = this._currentIdx();
    this.selectList(idx === this._lastIdx ? 0 : idx + 1);
  }

  previousList() {
    const idx = this._currentIdx();
    return this.selectList(idx === 0 ? this._lastIdx : idx - 1);
  }

  select(x) {
    return document.querySelector(x);
  }

  selectList(idx) {
    if (idx >= 0 && idx <= this._lastIdx) {
      const lists = this._getLists();
      const {id, className} = lists[idx];
      this.click(id ? `#${id}` : `.${className}`);
    }
  }

  zoomIn() {
    const zoomFactor = webFrame.getZoomFactor() + this._zoomStep;

    if (zoomFactor < this._upperZoomLimit) {
      webFrame.setZoomFactor(zoomFactor);
      settings.set('zoomFactor', zoomFactor);
    }
  }

  zoomReset() {
    webFrame.setZoomFactor(this._defaultZoomFactor);
    settings.set('zoomFactor', this._defaultZoomFactor);
  }

  zoomRestore() {
    webFrame.setZoomFactor(settings.get('zoomFactor'));
  }

  zoomOut() {
    const zoomFactor = webFrame.getZoomFactor() - this._zoomStep;

    if (zoomFactor > this._lowerZoomLimit) {
      webFrame.setZoomFactor(zoomFactor);
      settings.set('zoomFactor', zoomFactor);
    }
  }
}

module.exports = new Nav();
