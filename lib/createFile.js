'use strict';
const mkdirp = require('mkdirp');
const { join } = require('path');
const { writeFile } = require('fs');
const chalk = require('chalk');
const createData = require('./createData');

function createFile(savePath, savePathArr, parsedData) {
  mkdirp(join(...savePathArr), err => {
    if (err) {
      console.error(chalk.red(err.message));
      process.exit();
    }
    let data;

    try {
      data = createData(parsedData, 'this');
    } catch (err) {
      console.error(chalk.red(err.message));
      process.exit();
    }

    writeFile(savePath, JSON.stringify(data), err => {
      if (err) {
        console.error(chalk.red(err.message));
        process.exit();
      }
      console.log(chalk.green(`${savePath} created.`));
      process.exit();
    });
  });
}

module.exports = createFile;