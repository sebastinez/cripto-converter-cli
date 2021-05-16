import { keccak256 } from "ethereum-cryptography/keccak";
import chalk from "chalk";
import { stripHexPrefix } from "./utils";

const toChecksumAddress = (address: string, chainId: null | number = null) => {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    console.log(
      chalk.underline("\nError:\n\n") +
        `Given address "${address}" is not a valid Ethereum address.`
    );
    return;
  }

  const stripAddress = stripHexPrefix(address).toLowerCase();
  const prefix = chainId != null ? `${chainId.toString()}0x` : "";
  const keccakHash = keccak256(Buffer.from(prefix + stripAddress))
    .toString()
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

export { toChecksumAddress };
