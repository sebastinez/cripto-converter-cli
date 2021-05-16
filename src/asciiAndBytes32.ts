import utf8 from "utf8";
import { stripHexPrefix, isHexStrict, rightPad } from "./utils";
import chalk from "chalk";

const asciitobytes32 = (value: string, length = 32) => {
  let hex = "";

  for (let i = 0; i < value.length; i += 1) {
    const code = value.charCodeAt(i);
    const n = code.toString(16);
    hex += n.length < 2 ? `0${n}` : n;
  }
  const hexString = `0x${rightPad(hex, length * 2)}`;

  if (hexString.length > 66) {
    console.log(
      chalk.underline("\nError:\n\n") +
        `String: [${value}]\nToo long to be converted, does not fit in 32 bytes`
    );
    return;
  }
  console.log(
    chalk.underline("\nConverted ASCII string to Bytes32 String\n\n") +
      `Input: ${value}\nOutput: 0x${rightPad(hex, length * 2)}`
  );
  return;
};

const bytes32ToAscii = (hex: string) => {
  let input = hex;
  if (hex.length !== 66) {
    console.log(
      chalk.underline("\nError:\n") +
        "The string is not the correct length, should be 66 digits long, including 0x prefix"
    );
    return;
  }
  if (!hex.startsWith("0x")) {
    console.log(
      chalk.underline("\nError:\n") + "The string should start with 0x"
    );
    return;
  }
  if (!isHexStrict(hex)) {
    console.log(
      chalk.underline("\nError:\n") +
        `The parameter "${hex}" must be a valid HEX string.`
    );
    return;
  }

  let string = "";
  let code = 0;
  hex = stripHexPrefix(hex);

  // remove 00 padding from either side
  hex = hex.replace(/^(?:00)*/, "");
  hex = hex.split("").reverse().join("");
  hex = hex.replace(/^(?:00)*/, "");
  hex = hex.split("").reverse().join("");

  const l = hex.length;

  for (let i = 0; i < l; i += 2) {
    code = parseInt(hex.substr(i, 2), 16);
    string += String.fromCharCode(code);
  }
  console.log(
    chalk.underline("\nConverted Bytes32 string to ASCII String\n\n") +
      `Input: ${input}\nOutput: ${utf8.decode(string)}`
  );
};

export { asciitobytes32, bytes32ToAscii };
