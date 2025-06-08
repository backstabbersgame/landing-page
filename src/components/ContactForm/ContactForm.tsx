// 'use client';
// import React, { useEffect, useState } from 'react';
// // import { useController, SubmitHandler, useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from 'src/store';
// import axios from 'axios';

// import {
//   Button,
//   InputSelect,
//   InputText,
//   InputTextArea,
//   Upload,
// } from '@backstabbersgame/design-system';
// import styles from './ContactForm.module.scss';
// import contactContent from '../../content/contact.json';
// import { contactSchema, ContactFormValues } from '../../constants/contactSchema';
// import { sendContact } from 'src/store/contactThunk';
// const ContactForm = () => {
//   const dispatch = useDispatch();
//   const [form, setForm] = useState<ContactFormValues>({
//     name: '',
//     email: '',
//     contactType: '',
//     subject: '',
//     file: null,
//     message: '',
//   });
//   const [errors, setErrors] = useState<Partial<ContactFormValues>>({});
//   const { loading, error, success } = useSelector(
//     (state: RootState) => state.contact
//   );
//   const options = contact.selectOptions;

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value, files } = e.target as any;
//     setForm((prev) =>
//       name === 'file'
//         ? { ...prev, file: files && files[0] ? files[0] : null }
//         : { ...prev, [name]: value }
//     );
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setErrors((prev) => ({ ...prev, [name]: undefined }));
//   };

//   const handleBlur = async (
//     e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     try {
//       await contactSchema.validateAt(name, { ...form, [name]: value });
//       setErrors((prev) => ({ ...prev, [name]: undefined }));
//     } catch (err: any) {
//       setErrors((prev) => ({ ...prev, [name]: err.message }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("entrou no handle");
//     try {
//       await contactSchema.validate(form, { abortEarly: false });
//       setErrors({});
//       dispatch(sendContact(form) as any);
//     } catch (err: any) {
//       const formErrors: Partial<ContactFormValues> = {};
//       if (err.inner) {
//         err.inner.forEach((validationError: any) => {
//           formErrors[validationError.path as keyof ContactFormValues] =
//             validationError.message;
//         });
//       }
//       setErrors(formErrors);
//     }
//   };


//   return (
//     <>
//       <form
//         className={styles['contact-form']}
//         onSubmit={handleSubmit}
//         noValidate
//       >
//         <div className={styles['contact-inputs']}>
//           <div className={styles['contact-inputs-1']}>
//             <InputText
//               key='name'
//               placeholder={contact.placeholders.name}
//               className={styles.nome}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//               required
//               error={errors.name}
//             />
//             <InputText
//               key='email'
//               placeholder={contact.placeholders.email}
//               className={styles.email}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//               required
//               error={errors.email}
//             />
//           </div>
//           <div className={styles['contact-inputs-2']}>
//             <InputSelect
//               key='contactType'
//               options={options}
//               className={styles.eusou}
//               // onChange={handleInputChange}
//               // onBlur={handleBlur}
//               error={errors.contactType}
//             />
//             <InputText
//               key='subject'
//               placeholder={contact.placeholders.subject}
//               className={styles.assunto}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//               error={errors.subject}
//             />
//           </div>
//         </div>
//         <InputTextArea
//           key='message'
//           placeholder={contact.placeholders.message}
//           className={styles.mensagem}
//           onChange={handleInputChange}
//           onBlur={handleBlur}
//           required
//           error={errors.message}
//         />

//         <Upload
//           key='file'
//           className={styles.upload}
//           // onChange={handleChange}
//           // error={errors.file}
//         />

//         <div className={styles['submit-container']}>
//           <Button
//             type='submit'
//             className={styles.submit}
//             disabled={loading}
//             arrowRight
//           >
//             {contact.submitLabel}
//           </Button>
//         </div>
//         {success && <div>Mensagem enviada!</div>}
//         {error && <div>{error}</div>}
//       </form>
//     </>
//   );
// };

// export default ContactForm;
