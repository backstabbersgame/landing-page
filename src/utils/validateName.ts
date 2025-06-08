export const validateName = (name: string): boolean => {
  const isAlphabetic = /^[A-Za-z\s]+$/.test(name);
  const hasMinTwoWords = name.trim().split(/\s+/).length >= 2;
  const isLengthValid = name.length >= 3 && name.length <= 50;
  return isAlphabetic && hasMinTwoWords && isLengthValid;
};
