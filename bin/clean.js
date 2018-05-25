'use strict';
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');

const {resolve} = path;
const {green, yellow} = chalk.bold;

const distPath = resolve(__dirname, '../dist');

if (fs.existsSync(distPath)) {
  try {
    rimraf.sync(distPath);
    console.log(green('✔ Cleaning up'));
  } catch (err) {
    console.error(err);
  }
} else {
  console.log(yellow('Nothing to clean-up'));
}
