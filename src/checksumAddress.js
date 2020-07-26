const Hash = require("eth-lib/lib/hash");
const chalk = require("chalk");

const { stripHexPrefix } = require("../src/utils");

const toChecksumAddress = (address, chainId = null) => {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    console.log(chalk.underline("\nError:\n\n") + `Given address "${address}" is not a valid Ethereum address.`);
    return;
  }

  const stripAddress = stripHexPrefix(address).toLowerCase();
  const prefix = chainId != null ? `${chainId.toString()}0x` : "";
  const keccakHash = Hash.keccak256(prefix + stripAddress)
    .toString("hex")
    .replace(/^0x/i, "");
  let checksumAddress = "0x";

  for (let i = 0; i < stripAddress.length; i += 1)

    checksumAddress +=
      parseInt(keccakHash[i], 16) >= 8
        ? stripAddress[i].toUpperCase()
        : stripAddress[i];

  if (address === checksumAddress)
    console.log(chalk.underline("\nSupplied Address is valid\n"));
  else
    console.log(
      chalk.underline(`\nChecksummed address to chainId ${chainId}\n\n`) +
        `${checksumAddress}\n`
    );
};

module.exports = { toChecksumAddress };
