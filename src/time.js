'use strict';

class TimeHelper {
  static isDaytime() {
    const hs = SystemClock.getHours();
    return hs < 18 && hs > 6;
  }

  static transitionSpan() {
    const hs = SystemClock.getHours();
    return this.isDaytime() ? 18 - hs : (hs < 6 ? 6 - hs : 30 - hs);
  }
}

class TimeConverter {
  static hoursToMs(hours) {
    return 1000 * 60 * 60 * parseInt(hours, 10);
  }
}

class SystemClock {
  static getHours() {
    return new Date().getHours();
  }
}


module.exports = {
  TimeHelper,
  TimeConverter,
  SystemClock
};
