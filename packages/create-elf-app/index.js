#!/usr/bin/env node

const fs = require('fs');
const { exec } = require('child_process');

// creating new dashboard for setup
if (process.argv.length < 3) {
  console.log('Error. Please provide project name.');
  process.exit(0);
}

const appName = process.argv[2];

fs.mkdir(`./${appName}`, { recursive: true }, err => {
  if (err) {
    console.log('Error. Unable to create new project.');
  } else {
    exec('cp -r ./boilerplate/* ./', (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      }
    });
  }
});
