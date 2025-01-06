/**
 * Check string is a number
 */
export const containsOnlyDigits = (str: string) => {
  return /^\d*$/.test(str);
};

/**
 * Return only digits
 */
export const onlyDigits = (value: string) => {
  return value.replace(/\D/g, '');
};
