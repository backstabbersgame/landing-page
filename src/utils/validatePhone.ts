export const validatePhone = (phone: string): boolean => {
  const regex = /^\(\d{2}\) 9\d{4}-\d{4}$/;
  return regex.test(phone);
};
