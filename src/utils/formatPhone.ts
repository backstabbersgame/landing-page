export const formatPhone = (phone: string): string => {
  phone = phone.replace(/\D/g, '');

  if (phone.length === 0) {
    return '';
  } else if (phone.length <= 2) {
    return `(${phone}`;
  } else if (phone.length <= 7) {
    return `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
  } else if (phone.length <= 11) {
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
  }
  return phone;
};
