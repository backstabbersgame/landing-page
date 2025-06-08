'use client';

import { createAsyncThunk } from '@reduxjs/toolkit';
import * as yup from 'yup';
import axios from 'axios';
import { ContactFormValues } from '../constants/contactSchema';

// Envio para uma API fictícia "/api/contact"
export const sendContact = createAsyncThunk(
  'contact/sendContact',
  async (data: ContactFormValues, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      if (data.contactType) formData.append('contactType', data.contactType);
      if (data.subject) formData.append('subject', data.subject);
      formData.append('message', data.message);
      if (data.file) {
        formData.append('file', data.file);
      }

      const response = await axios.post('/api/contact', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue(err.message || 'Erro ao enviar contato');
    }
  }
);

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
