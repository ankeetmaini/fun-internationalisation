var watch = require('node-watch');
const fs = require('fs');
const execFile = require('child_process').execFile;
const spawn = require('child_process').spawn;
const path = require('path');
watch('./messages/en.json', {recursive: false}, () => {
  execFile('node', [path.resolve(__dirname, 'generate-types')]);
});
