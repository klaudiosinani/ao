'use strict';
const settings = require('./settings');
const time = require('./time');

class Mode {
  _toggle(mode) {
    const modes = settings.get('mode');
    Object.keys(modes).forEach(x => {
      settings.set(`mode.${x}`, (x === mode) ? !modes[x] : false);
      document.documentElement.classList.toggle(`${x}-mode`, settings.get(`mode.${x}`));
    });
  }

  _enableAutoNight() {
    if (time.isDaytime()) {
      this._toggle(null);
    } else if (!settings.get('mode.dark')) {
      this._toggle('dark');
    }

    setTimeout(() => {
      if (settings.get('autoNightMode')) {
        return this._enableAutoNight();
      }
    }, time.ms(time.transitionSpan()));
  }

  _disableAutoNight() {
    this._toggle(null);
  }

  autoNight() {
    return settings.get('autoNightMode') ? this._enableAutoNight() : this._disableAutoNight();
  }

  black() {
    this._toggle('black');
  }

  dark() {
    this._toggle('dark');
  }

  restore() {
    const modes = settings.get('mode');

    Object.keys(modes).forEach(x => {
      if (modes[x]) {
        document.documentElement.classList.toggle(`${x}-mode`, modes[x]);
      }
    });
  }

  sepia() {
    this._toggle('sepia');
  }
}

module.exports = new Mode();
