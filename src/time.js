'use strict';

class Time {
  hours() {
    return new Date().getHours();
  }

  isDaytime() {
    const hs = this.hours();
    return hs < 18 && hs > 6;
  }

  ms(hours) {
    return 1000 * 60 * 60 * parseInt(hours, 10);
  }

  transitionSpan() {
    const hs = this.hours();
    return this.isDaytime() ? 18 - hs : (hs < 6 ? 6 - hs : 30 - hs);
  }
}

module.exports = new Time();
