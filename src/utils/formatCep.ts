export const formatCep = (cep: string): string => {
  const cleanCep = cep.replace(/\D/g, '');

  if (cleanCep.length <= 5) {
    return cleanCep;
  }

  return `${cleanCep.slice(0, 5)}-${cleanCep.slice(5, 8)}`;
};
