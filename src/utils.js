const isNumber = require('lodash/isNumber');
const isString = require('lodash/isString');

function stripHexPrefix(string) {
  return string.startsWith('0x') || string.startsWith('0X') ? string.slice(2) : string;
}
function isHexStrict(hex) {
  return (isString(hex) || isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex);
}

function rightPad(string, chars, sign) {
  const hasPrefix = /^0x/i.test(string) || typeof string === 'number';
  const hexString = string.toString(16).replace(/^0x/i, '');

  const padding = chars - hexString.length + 1 >= 0 ? chars - hexString.length + 1 : 0;

  return (hasPrefix ? '0x' : '') + hexString + new Array(padding).join(sign || '0');
}

module.exports = { stripHexPrefix, isHexStrict, rightPad };
