'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';
import styles from './SignUp.module.scss';
import { Grid, Stepper } from '@backstabbersgame/design-system';
import BackButton from 'src/components/BackButton/BackButton';
import Image from 'next/image';
import useBreakpoint from 'src/hooks/useBreakpoint';
import SignUpForm from './SignUpForm';
import { resetCustomer, updateCustomer } from 'src/store/customerSlice';
import { sendCustomerData } from 'src/store/customerThunk';
import { resetAddress } from 'src/store/addressSlice';

const SignUp = () => {
  const dispatch: AppDispatch = useDispatch();
  const { customer } = useSelector((state: RootState) => state.customer);
  const { address } = useSelector((state: RootState) => state.address);
  const { currentBreakpoint } = useBreakpoint();
  const [step, setStep] = useState(1);
  const [widthLogo, setWidthLogo] = useState(0.0);
  const [heightLogo, setHeightLogo] = useState(0);
  const [submitData, setSubmitData] = useState(false);
  const [customerSince, setCustomerSince] = useState('');
  const isSubmitting = useRef(false);

  useEffect(() => {
    setCustomerSince(new Date().toLocaleDateString('pt-BR'));
  }, []);

  const submitCustomer = useCallback(async () => {
    if (isSubmitting.current) return;

    isSubmitting.current = true;

    try {
      const customerData = {
        ...customer,
        CEP: address.cep.replace('-', ''),
        Endereço: address.address,
        Número: address.number,
        Complemento: address.additionalAddress,
        Cidade: address.city,
        Bairro: address.neighborhood,
        UF: address.uf,
        'Cliente desde': customerSince,
      };

      await dispatch(updateCustomer(customerData));
      await dispatch(sendCustomerData(customerData));
      alert('Cadastro realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    } finally {
      setStep(1);
      dispatch(resetCustomer());
      dispatch(resetAddress());
      setSubmitData(false);
      isSubmitting.current = false;
    }
  }, [customer, address, customerSince, dispatch]);

  useEffect(() => {
    if (submitData && !isSubmitting.current) {
      submitCustomer();
    }
  }, [submitData, submitCustomer]);

  useEffect(() => {
    if (currentBreakpoint === 'mobile') {
      setWidthLogo(113.78);
      setHeightLogo(32);
    } else if (currentBreakpoint === 'tablet') {
      setWidthLogo(142.914);
      setHeightLogo(40);
    } else {
      setWidthLogo(200);
      setHeightLogo(56);
    }
  }, [currentBreakpoint]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleStepChange = (newStep: number) => {
    if (newStep <= step) {
      setStep(newStep);
    }
  };

  const handleBreakpoint = (): 4 | 8 | 12 => {
    if (currentBreakpoint === 'mobile') {
      return 4;
    } else if (currentBreakpoint === 'tablet') {
      return 8;
    } else {
      return 12;
    }
  };

  return (
    <Grid
      layout={handleBreakpoint()}
      className={styles.grid}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <BackButton onClick={handleBack} />
          <Image
            width={widthLogo}
            height={heightLogo}
            src='/images/solara-horizontal-dark.svg'
            alt='Solara Studios Logo with dark colors'
          />
        </div>
        <h1 className={styles.title}>Criar conta</h1>
        <Stepper
          steps={['Dados pessoais', 'Endereço']}
          currentStep={step}
          onStepChange={handleStepChange}
          minSteps={2}
          maxSteps={2}
          className={styles.steps}
          isStepClickable={(currentStep) => currentStep <= step}
        />
        <SignUpForm
          handleNext={handleNext}
          handleData={setSubmitData}
          step={step}
          className={styles.form}
        />
        <p className={styles.account}>
          Já possui uma conta? <a href='/cadastro'>Entre na sua conta</a>
        </p>
      </div>
    </Grid>
  );
};

export default SignUp;
