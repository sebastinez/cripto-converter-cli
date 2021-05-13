#!/usr/bin/env node
import args from "yargs";
import { hash } from "./hash";
import { asciitobytes32, bytes32ToAscii } from "./asciiAndBytes32";
import { toChecksumAddress } from "./checksumAddress";
import { base58tohex, hextobase58 } from "./base58";

args
  .usage("Usage: $0 [command] <args>")
  .demandCommand()
  .recommendCommands()
  .strict()
  .command("asciitobytes32", "[-s <ascii string>]", (yargs) => {
    let option = yargs.option("string", { alias: "s", type:"string", demandOption: true })
      .argv;
    asciitobytes32(option.string);
  })
  .command("bytes32toascii", "[-s <bytes32 string>]", (yargs) => {
    let option = yargs.option("string", {
      alias: "s",
      demandOption: true,
      string: true,
    }).argv;
    bytes32ToAscii(option.string);
  })
  .command(
    "hash",
    "[-a <hash algorithm>] [-s [string] | -f [file]]",
    (yargs) => {
      let option = yargs
        .option("string", { type: "string", alias: "s" })
        .option("algorithm", { type: "string", alias: "a", demandOption: true })
        .option("file", { type:"string", alias: "f" }).argv;
      hash(option.algorithm, option.string, option.file);
    }
  )
  .command("checksumaddress", "[-a <address>] [-i [chainId]]", (yargs) => {
    let option = yargs
      .option("address", {
        alias: "a",
        demandOption: true,
        type: "string"
      })
      .option("chainId", { type:"number", alias: "i" }).argv;
    toChecksumAddress(option.address, option.chainId);
  })
  .command("base58tohex", "[-s <base85 string>]", (yargs) => {
    let option = yargs.option("string", {
      alias: "s",
      demandOption: true,
      string: true,
    }).argv;
    base58tohex(option.string);
  })
  .command("hextobase58", "[-s <hex string>]", (yargs) => {
    let option = yargs.option("string", {
      alias: "s",
      demandOption: true,
      string: true,
    }).argv;
    hextobase58(option.string);
  })
  .help("h")
  .alias("h", "help")
  .alias("v", "version").argv;
