/**
 * @description Check string is a number
 */
export const containsOnlyDigits = (str: string) => {
  return /^\d*$/.test(str);
};

/**
 * @description Return only digits from string
 */
export const onlyDigits = (value: string) => {
  return value.replace(/\D/g, '');
};
