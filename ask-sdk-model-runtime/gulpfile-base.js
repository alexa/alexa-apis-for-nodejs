'use strict';

const path = require('path');
const child_process = require('child_process');

module.exports = {
  tsc : (done) => {
    const tscPath = path.normalize('./node_modules/.bin/tsc');
    const command = `${tscPath} -p tsconfig.json`;

    exec(command, done);
  }
};

function exec(command, callback) {
  child_process.exec(command, function(err, stdout, stderr) {
    if (stdout) {
      console.log(stdout);
    }

    if (stderr) {
      console.log(stderr);
    }

    callback(err);
  });
}
