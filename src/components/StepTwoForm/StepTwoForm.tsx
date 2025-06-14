'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setAddressField } from '../../store/addressSlice';
import { fetchAddressByCep } from '../../store/addressThunk';
import { formatCep } from '../../utils/formatCep';
import { InputText, Button } from '@backstabbersgame/design-system';
import { addressFields } from '../../constants/addressFields';
import { Address } from '../../types/address';
import * as yup from 'yup';
import { stepTwoSchema } from '../../constants/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './StepTwoForm.module.scss';

interface StepTwoPros {
  handleData: React.Dispatch<React.SetStateAction<boolean>>;
}

type StepTwoForm = yup.InferType<typeof stepTwoSchema>;

const StepTwoForm: React.FC<StepTwoPros> = ({ handleData }) => {
  const dispatch: AppDispatch = useDispatch();
  const { address, apiAddress } = useSelector(
    (state: RootState) => state.address
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm<StepTwoForm>({
    resolver: yupResolver(stepTwoSchema),
    defaultValues: {
      cep: address.cep || '',
      uf: address.uf || '',
      city: address.city || '',
      neighborhood: address.neighborhood || '',
      address: address.address || '',
      number: address.number || '',
      additionalAddress: address.additionalAddress || '',
    },
  });

  useEffect(() => {
    try {
      clearErrors('cep');
      if (address.cep.length === 9) {
        dispatch(fetchAddressByCep(address.cep));

        setValue('address', apiAddress.address, { shouldValidate: false });
        setValue('city', apiAddress.city, { shouldValidate: false });
        setValue('uf', apiAddress.uf, { shouldValidate: false });
      }
    } catch (error) {
      setError('cep', { message: 'CEP inválido' });
      console.log('VIA CEP: ', error);
    }
  }, [clearErrors, address.cep, dispatch, apiAddress, setValue, setError]);

  const onSubmit = (data: StepTwoForm) => {
    Object.entries(data).forEach(([field, value]) => {
      dispatch(setAddressField({ field: field as keyof Address, value }));
    });

    handleData(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
      noValidate
    >
      <InputText
        id='cep'
        label='CEP'
        placeholder='Insira o CEP'
        required
        error={errors.cep?.message}
        maxLength={9}
        className={styles.cep}
        {...register('cep', {
          onChange: (e) => {
            const cep = formatCep(e.target.value);
            e.target.value = cep;
            dispatch(
              setAddressField({
                field: 'cep',
                value: e.target.value,
              })
            );
          },
        })}
      />
      {addressFields.map((addressField) => (
        <InputText
          key={addressField.name}
          id={addressField.name}
          className={styles[`${addressField.name}`]}
          label={addressField.label}
          placeholder={addressField.placeholder}
          required={addressField.required}
          disabled={!!apiAddress[addressField.name as keyof StepTwoForm]}
          error={errors[addressField.name as keyof StepTwoForm]?.message}
          {...register(addressField.name as keyof StepTwoForm)}
        />
      ))}
      <Button
        type='submit'
        className={styles.submit}
      >
        Finalizar cadastro
      </Button>
    </form>
  );
};

export default StepTwoForm;
