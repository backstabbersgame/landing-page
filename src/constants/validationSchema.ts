import * as yup from 'yup';
import { validateName } from '../utils/validateName';
import { validateCpf } from '../utils/validateCpf';
import { validateEmail } from '../utils/validateEmail';
import { validatePhone } from '../utils/validatePhone';

export const stepOneSchema = yup.object({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .test('is-valid-name', 'Nome muito curto', (value) => validateName(value)),
  cpf: yup
    .string()
    .required('CPF é obrigatório')
    .test('is-valid-cpf', 'CPF inválido', (value) => validateCpf(value)),
  email: yup
    .string()
    .required('E-mail é obrigatório')
    .test(
      'is-valid-email',
      'E-mail inválido',
      (value) => validateEmail(value)
    ),
  phone: yup
    .string()
    .required('Celular é obrigatório')
    .test('is-valid-phone', 'Telefone inválido', (value) =>
      validatePhone(value)
    ),
});

export const stepTwoSchema = yup.object({
  cep: yup
    .string()
    .matches(/^\d{5}-\d{3}$/, 'CEP inválido')
    .required('CEP é obrigatório'),
  address: yup.string().required('Endereço é obrigatório'),
  number: yup.string().optional(),
  additionalAddress: yup.string().optional(),
  city: yup.string().required('Cidade é obrigatória'),
  neighborhood: yup.string().required('Bairro é obrigatório'),
  uf: yup
    .string()
    .length(2, 'UF deve ter 2 caracteres')
    .required('UF é obrigatório'),
});

// export const validationSchema = stepOneSchema.concat(stepTwoSchema);

export const validationSchema = yup.object().shape({
  ...stepOneSchema.fields,
  ...stepTwoSchema.fields,
});
