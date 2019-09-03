const { createHash } = require("crypto");
const chalk = require("chalk");
const fs = require("fs");

const hash = (algorithm, string, file) => {
  if (file && string) {
    console.log(chalk.underline("\nWarning:\n\n") + "Double input, File or String, not both..");
    return;
  }
  if (file) {
    const fileBuffer = fs.readFileSync(file);
    const hash = `0x${createHash(algorithm)
      .update(fileBuffer)
      .digest("hex")}`;
    console.log(
      chalk.underline(`\nCreated ${algorithm} hash from file\n\n`) +
        `Input: ${file.startsWith("./") ? "" : "./"}${file}\nOutput: ${hash}`
    );
    return;
  }
  if (string) {
    const hash = `0x${createHash(algorithm)
      .update(Buffer.from(string))
      .digest("hex")}`;
    console.log(chalk.underline(`\nCreated ${algorithm} hash\n\n`) + `Input: ${string}\nOutput: ${hash}`);
    return;
  } else {
    console.log(chalk.underline("\nWarning:\n\n") + "Input missing");
  }
};

module.exports = { hash };
