import { createHash } from "crypto";
import chalk from "chalk";
import fs from "fs";

const hash = (algorithm: string, string?: string, path?: string) => {
  if (path && string) {
    console.log(chalk.underline("\nWarning:\n\n") + "Double input, File or String, not both..");
    return;
  }
  if (typeof path == "string") {
    const fileBuffer = fs.readFileSync(path);
    const hash = `0x${createHash(algorithm)
      .update(fileBuffer)
      .digest("hex")}`;
    console.log(
      chalk.underline(`\nCreated ${algorithm} hash from file\n\n`) +
        `Input: ${path.startsWith("./") ? "" : "./"}${path}\nOutput: ${hash}`
    );
    return;
  }
  if (typeof string == "string") {
    const hash = `0x${createHash(algorithm)
      .update(Buffer.from(string))
      .digest("hex")}`;
    console.log(chalk.underline(`\nCreated ${algorithm} hash\n\n`) + `Input: ${string}\nOutput: ${hash}`);
    return;
  } else {
    console.log(chalk.underline("\nWarning:\n\n") + "Input missing");
  }
};

export { hash };
