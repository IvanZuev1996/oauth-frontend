/**
 * @description Get right word by number
 */
export const formatWord = (number: number, words: [string, string, string]) => {
  const absNumber = Math.abs(number);
  if (absNumber % 100 >= 11 && absNumber % 100 <= 19) {
    return `${number} ${words[2]}`;
  }

  switch (absNumber % 10) {
    case 1:
      return `${number} ${words[0]}`;
    case 2:
    case 3:
    case 4:
      return `${number} ${words[1]}`;
    default:
      return `${number} ${words[2]}`;
  }
};
