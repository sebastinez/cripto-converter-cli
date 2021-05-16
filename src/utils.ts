const stripHexPrefix = (string: string) => {
  return string.startsWith("0x") || string.startsWith("0X")
    ? string.slice(2)
    : string;
};
const isHexStrict = (hex: string) => {
  return (
    (typeof hex == "string" || typeof hex == "number") &&
    /^(-)?0x[0-9a-f]*$/i.test(hex)
  );
};

const rightPad = (string: string, chars: number) => {
  const hasPrefix = /^0x/i.test(string) || typeof string === "number";
  const hexString = string.replace(/^0x/i, "");

  const padding =
    chars - hexString.length + 1 >= 0 ? chars - hexString.length + 1 : 0;

  return (hasPrefix ? "0x" : "") + hexString + new Array(padding).join("0");
};

export { stripHexPrefix, isHexStrict, rightPad };
