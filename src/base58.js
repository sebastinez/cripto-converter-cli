const basex = require("base-x")("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
const chalk = require("chalk");
const { isHexStrict } = require("../src/utils");

const base58tohex = string => {
  try {
    const hex = basex.decode(string).toString("hex");
    console.log(chalk.underline("\nConverted Base58 string to Hex String\n\n") + `Input: ${string}\nOutput: ${hex}`);
  } catch (e) {
    console.log(chalk.underline("\nError:\n\n") + `String: [${string}]\n${e.message}`);
  }
};

const hextobase58 = string => {
  try {
    if (!isHexStrict(string)) {
      throw Error(`The input string must be a valid HEX string.`);
    }
    console.log(
      chalk.underline("\nConverted Hex string to Base58 String\n\n") +
        `Input: ${string}\nOutput: ${basex.encode(Buffer.from(string, "hex"))}`
    );
  } catch (e) {
    console.log(chalk.underline("\nError:\n\n") + `String: [${string}]\n${e.message}`);
  }
};

module.exports = { base58tohex, hextobase58 };
