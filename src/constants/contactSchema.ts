'use client';

import * as yup from 'yup';
import { validateName } from '../utils/validateName';
import { validateEmail } from '../utils/validateEmail';

const supportedTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'text/plain',
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const MAX_FILE_SIZE = 1024 * 1024;

export const contactSchema = yup.object({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .test('is-valid-name', 'Nome muito curto', (value) => validateName(value)),
  email: yup
    .string()
    .required('E-mail é obrigatório')
    .test('is-valid-email', 'E-mail inválido', (value) => validateEmail(value)),
  subject: yup.string().optional(),
  message: yup.string().required('Mensagem é obrigatória'),
  contactType: yup.string().optional(),
  file: yup
    .mixed<File>()
    .nullable()
    .optional()
    .test('file-type', 'Tipo de arquivo inválido', (file) => {
      if (!file) return true;
      return supportedTypes.includes(file.type);
    })
    .test(
      'file-size',
      `Tamanho máximo do arquivo ${(MAX_FILE_SIZE / (1024 * 1024)).toFixed(
        0
      )} MB`,
      (file) => {
        if (!file) return true;
        return file.size <= MAX_FILE_SIZE;
      }
    ),
});

export type ContactFormValues = yup.InferType<typeof contactSchema>;
