import pkg from "src/../package.json";

export const shortenText = (str = "", numberOfLetters = 7) => {
  return str?.length > numberOfLetters + 3
    ? str.substring(0, numberOfLetters).trim() + "..."
    : str;
};

export function lsSet(key: string, value: any) {
  return localStorage.setItem(`${pkg.name}.${key}`, JSON.stringify(value));
}

export function lsGet(key: string, fallback?: any) {
  const item = localStorage.getItem(`${pkg.name}.${key}`);
  return jsonParse(item, fallback);
}

export function lsRemove(key: string) {
  return localStorage.removeItem(`${pkg.name}.${key}`);
}

export function jsonParse(input: any, fallback?: any) {
  if (typeof input !== "string") {
    return fallback || {};
  }
  try {
    return JSON.parse(input);
  } catch (err) {
    return fallback || {};
  }
}

export function shortEVMAddress(account: string) {
  return `${account.substring(0, 6)}...${account.substring(
    account.length - 4
  )}`;
}

export function shortIPFS(account: string) {
  return `#${account.substring(0, 6)}`;
}

const defaultObj = {
  shortenText,
  lsSet,
  lsGet,
  lsRemove,
  shortEVMAddress,
  shortIPFS,
};

export default defaultObj;
