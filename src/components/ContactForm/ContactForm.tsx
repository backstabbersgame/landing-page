'use client';
import React, { useEffect, useState } from 'react';
import { useController, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';
import axios from 'axios';

import {
  Button,
  InputSelect,
  InputText,
  InputTextArea,
  Upload,
} from '@backstabbersgame/design-system';
import styles from './ContactForm.module.scss';
import contactContent from 'src/content/contact.json';
import { contactSchema } from 'src/constants/contactSchema';
import { sendContactForm } from 'src/store/contactThunk';
// import { ContactForm } from 'src/types/contact';

const contact = contactContent;

type FormData = {
  name: string;
  email: string;
  type?: string;
  subject?: string;
  file: FileList | null;
  message: string;
};

const ContactForm = () => {
  // const dispatch: AppDispatch = useDispatch();
  const options = contact.selectOptions;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  // const {
  //   control,
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   setValue,
  //   setError,
  //   clearErrors,
  //   watch,
  //   getValues,
  //   reset,
  // } = useForm<ContactForm>({
  //   resolver: yupResolver(contactSchema),
  //   mode: 'all',
  //   // defaultValues: {
  //   //   file: null,
  //   // },
  // });

  // const {
  //   field: { value, onChange },
  //   fieldState: { error },
  // } = useController({
  //   name: 'file',
  //   control,
  // });

  // useEffect(() => {
  //   console.log('Estado contactForm atualizado:', contactForm);
  // }, [contactForm]);

  useEffect(() => {
    const subscription = watch((value) => {
      console.log('📦 Dados atuais do formulário:', value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // const onSubmit = (data: ContactForm) => {
  //   // console.log('Dados data:', data);
  //   console.log('Dados enviados pelo formulário:', { data });
  //   dispatch(sendContactForm(data)).then((res) => {
  //     if (res.meta.requestStatus === 'fulfilled') {
  //       reset(); // limpa o form após sucesso
  //     } else {
  //       console.log('erro no dispatch');
  //     }
  //   });
  // };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('type', data.type || '');
      formData.append('subject', data.subject || '');
      formData.append('message', data.message);
      if (data.file?.[0]) formData.append('file', data.file[0]);

      await axios.post('/api/contact', formData);
      setSubmitStatus({ success: true, message: 'Enviado com sucesso!' });
      reset();
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Erro ao enviar' });
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log('errors:', errors);
  return (
    <>
      {console.log('montou')}
      <form
        className={styles['contact-form']}
        onSubmit={() => {
          alert('submit!');
        }}
        // onSubmit={handleSubmit(onSubmit, (formErrors) => {
        //   console.log('❌ Erros de validação:', formErrors);
        // })}
        noValidate
      >
        <div className={styles['contact-inputs']}>
          <div className={styles['contact-inputs-1']}>
            <InputText
              key='name'
              placeholder={contact.placeholders.name}
              className={styles.nome}
              required
              error={errors.name?.message}
              {...register('name', { required: 'Obrigatório' })}
            />
            <InputText
              key='email'
              placeholder={contact.placeholders.email}
              className={styles.email}
              required
              error={errors.email?.message}
              {...register('email', { required: 'Obrigatório' })}
            />
          </div>
          <div className={styles['contact-inputs-2']}>
            <InputSelect
              key='type'
              options={options}
              className={styles.eusou}
              error={errors.type?.message}
              {...register('type')}
            />
            <InputText
              key='subject'
              placeholder={contact.placeholders.subject}
              className={styles.assunto}
              error={errors.subject?.message}
              {...register('subject')}
            />
          </div>
        </div>
        <InputTextArea
          key='message'
          placeholder={contact.placeholders.message}
          className={styles.mensagem}
          required
          error={errors.message?.message}
          {...register('message', { required: 'Obrigatório' })}
        />
        {submitStatus.message && (
          <div style={{ color: submitStatus.success ? 'green' : 'red' }}>
            Mesagem aq:{submitStatus.message}
          </div>
        )}
        {/* <Upload
        key='file'
        className={styles.upload}
        value={value}
        onChange={onChange}
        error={error?.message}
      /> */}
        <input
          type='file'
          {...register('file')}
        />
        <div className={styles['submit-container']}>
          <button
            type='submit'
            onClick={() => console.log('oi oi')}
          >
            envia carai
          </button>
          {/* <Button
          type='submit'
          className={styles.submit}
          arrowRight
        >
          {contact.submitLabel}
        </Button> */}
        </div>
      </form>
    </>
  );
};

export default ContactForm;
