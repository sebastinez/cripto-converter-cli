#!/usr/bin/env node
const args = require('yargs');
const chalk = require('chalk');

args
  .usage('Usage: $0 -w [num] -h [num]')
  .command('asciitobytes32', 'Convert ASCII String to Bytes32', yargs => {
    let options = yargs.option('string', { alias: 's', demandOption: true }).argv;
    asciitobytes32(options.string);
  })
  .help('h')
  .alias('h', 'help')
  .alias('v', 'version').argv;

function asciitobytes32(value, length = 32) {
  let hex = '';

  for (let i = 0; i < value.length; i += 1) {
    const code = value.charCodeAt(i);
    const n = code.toString(16);
    hex += n.length < 2 ? `0${n}` : n;
  }
  const hexString = `0x${rightPad(hex, length * 2)}`;

  if (hexString.length > 67) {
    console.log(`Error with command asciitohex
String: ${value}
Too long to be converted, does not fit in 32 bytes`);
    return;
  }
  console.log(`ASCII String converted to Hex String \n0x${rightPad(hex, length * 2)}`);
  return;
}

function rightPad(string, chars, sign) {
  const hasPrefix = /^0x/i.test(string) || typeof string === 'number';
  const hexString = string.toString(16).replace(/^0x/i, '');

  const padding = chars - hexString.length + 1 >= 0 ? chars - hexString.length + 1 : 0;

  return (hasPrefix ? '0x' : '') + hexString + new Array(padding).join(sign || '0');
}
