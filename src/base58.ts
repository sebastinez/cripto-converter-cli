import BaseX from "base-x";
import chalk from "chalk";
import { isHexStrict } from "./utils";

const basex = BaseX("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")

const base58tohex = (string: string) => {
  try {
    const hex = basex.decode(string).toString("hex");
    console.log(chalk.underline("\nConverted Base58 string to Hex String\n\n") + `Input: ${string}\nOutput: ${hex}`);
  } catch (e) {
    console.log(chalk.underline("\nError:\n\n") + `String: [${string}]\n${e.message}`);
  }
};

const hextobase58 = (string: string) => {
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

export { base58tohex, hextobase58 };
