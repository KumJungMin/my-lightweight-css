#!/usr/bin/env node
const path = require('path');
const { generateUtilitiesCss } = require('./index');

const args = process.argv.slice(2);
const outputFileArg = args.find(arg => arg.startsWith('--output=')) || '--output=./dist/my-utilities.css';
const configFileArg = args.find(arg => arg.startsWith('--config='));
const purgeFlag = args.includes('--purge');

const outputFile = outputFileArg.split('=')[1];
let userConfig = {};

if (configFileArg) {
  const configPath = configFileArg.split('=')[1];
  try {
    userConfig = require(path.resolve(process.cwd(), configPath));
  } catch (e) {
    console.error(`Error loading config file: ${configPath}`, e);
    process.exit(1);
  }
}

generateUtilitiesCss({
  outputFile: path.resolve(process.cwd(), outputFile),
  userConfig,
  purge: purgeFlag,
}).catch(error => {
  console.error('CLI Error:', error);
  process.exit(1);
});