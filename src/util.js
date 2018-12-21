'use strict';
const {dirname, join} = require('path');
const fs = require('fs');

const {log} = console;
const {platform} = process;

class Util {
  get is() {
    return {
      darwin: platform === 'darwin',
      linux: platform === 'linux',
      undef: x => x === undefined,
      win32: platform === 'win32'
    };
  }

  ensureFileSync(path, data) {
    if (!fs.existsSync(path)) {
      try {
        fs.writeFileSync(path, data);
      } catch (error) {
        log(error);
      }
    }
  }

  readSheet(x) {
    return fs.readFileSync(join(__dirname, './style', x), 'utf8');
  }

  touchFileSync(x) {
    const dir = dirname(x);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    return fs.closeSync(fs.openSync(x, 'a'));
  }
}

module.exports = new Util();
