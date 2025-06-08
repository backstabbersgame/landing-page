// 'use client';

// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { contactSchema } from 'src/constants/contactSchema';
// import * as yup from 'yup';
// import axios from 'axios';

// type ContactFormData = yup.InferType<typeof contactSchema>;

// export const sendContactForm = createAsyncThunk(
//   'contact/sendContactForm',
//   async (data: ContactFormData, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();

//       formData.append('name', data.name);
//       formData.append('email', data.email);
//       formData.append('message', data.message);
//       if (data.subject) formData.append('subject', data.subject);
//       if (data.type) formData.append('type', data.type);
//       // if (data.file) formData.append('file', data.file);

//       const response = await axios.post('/api/contact', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return await response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Erro ao enviar formulário'
//       );
//     }

//     // return await res.json();
//   }
// );
