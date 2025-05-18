'use strict';
const settings = require('./settings');
const time = require('./time');
const ManualMode = require('./ManualMode');

class ModeRestorer {
  restore() {
    const modes = settings.get('mode');
    Object.keys(modes).forEach(x => {
      if (modes[x]) {
        document.documentElement.classList.toggle(`${x}-mode`, modes[x]);
      }
    });
  }
}


class AutoNightMode {
  enable() {
    if (time.isDaytime()) {
      ManualMode.toggle(null);
    } else if (!settings.get('mode.dark')) {
      ManualMode.toggle('dark');
    }

    setTimeout(() => {
      if (settings.get('autoNightMode')) {
        this.enable();
      }
    }, time.ms(time.transitionSpan()));
  }

  disable() {
    ManualMode.toggle(null);
  }

  autoNight() {
    return settings.get('autoNightMode') ? this.enable() : this.disable();
  }
}

class ManualMode {
  toggle(mode) {
    const modes = settings.get('mode');
    Object.keys(modes).forEach(x => {
      settings.set(`mode.${x}`, (x === mode) ? !modes[x] : false);
      document.documentElement.classList.toggle(`${x}-mode`, settings.get(`mode.${x}`));
    });
  }

  black() {
    this.toggle('black');
  }

  dark() {
    this.toggle('dark');
  }

  sepia() {
    this.toggle('sepia');
  }
}

module.exports = {
  ManualMode,
  AutoNightMode,
  ModeRestorer
};
