export const shortenText = (str = "", numberOfLetters = 7) => {
  return str?.length > numberOfLetters + 3
    ? str.substring(0, numberOfLetters).trim() + "..."
    : str;
};

export default {
  shortenText,
};
