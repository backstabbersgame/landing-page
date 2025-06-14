'use client';

import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setCustomerField } from '../../store/customerSlice';
import { formatCpf } from '../../utils/formatCpf';
import { formatPhone } from '../../utils/formatPhone';
import { InputText, Button } from '@backstabbersgame/design-system';
import styles from './StepOneForm.module.scss';
import { stepOneSchema } from '../../constants/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';

interface StepOnePros {
  handleNext: () => void;
}

type StepOneForm = {
  name: string;
  cpf: string;
  email: string;
  phone: string;
};

export const StepOneForm: React.FC<StepOnePros> = ({ handleNext }) => {
  const dispatch = useDispatch();
  const { customer } = useSelector((state: RootState) => state.customer);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<StepOneForm>({
    resolver: yupResolver(stepOneSchema),
    mode: 'all',
    defaultValues: {
      name: customer.Nome || '',
      cpf: customer['CNPJ / CPF'] || '',
      email: customer['E-mail'] || '',
      phone: customer.Celular || '',
    },
  });
  useEffect(() => {
    const subscription = watch((value) => {
      console.log('📦 Dados atuais do formulário:', value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<StepOneForm> = (data: StepOneForm) => {
    dispatch(setCustomerField({ field: 'Nome', value: data.name }));
    dispatch(setCustomerField({ field: 'CNPJ / CPF', value: data.cpf }));
    dispatch(setCustomerField({ field: 'Celular', value: data.phone }));
    dispatch(setCustomerField({ field: 'E-mail', value: data.email }));
    dispatch(
      setCustomerField({ field: 'E-mail para envio NFe', value: data.email })
    );
    handleNext();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
      noValidate
    >
      <InputText
        id='name'
        className={styles.name}
        label='Nome completo'
        placeholder='Informe seu nome completo'
        required
        error={errors.name?.message}
        {...register('name')}
      />

      <InputText
        id='cpf'
        className={styles.cpf}
        label='CPF'
        placeholder='Insira o seu CPF'
        required
        error={errors.cpf?.message}
        {...register('cpf', {
          onChange: (e) => {
            const cpf = formatCpf(e.target.value);
            e.target.value = cpf;
          },
        })}
      />
      <InputText
        id='email'
        className={styles.email}
        label='E-mail'
        placeholder='Informe seu melhor e-mail'
        required
        error={errors.email?.message}
        {...register('email')}
      />
      <InputText
        id='phone'
        className={styles.phone}
        label='Telefone'
        placeholder='Insira o seu telefone'
        required
        error={errors.phone?.message}
        {...register('phone', {
          onChange: (e) => {
            const phone = formatPhone(e.target.value);
            e.target.value = phone;
          },
        })}
      />

      <Button
        type='submit'
        arrowRight
        className={styles.next}
      >
        Próximo
      </Button>
    </form>
  );
};

export default StepOneForm;
