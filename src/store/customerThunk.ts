import { createAsyncThunk } from '@reduxjs/toolkit';
import { Customer } from 'src/types/customer';
import { RootState } from '.';
import axios from 'axios';

export const addCustomerField = createAsyncThunk(
  'customer/addCustomerField',
  async (newField: Partial<Customer>, { getState }) => {
    const state = getState() as RootState;
    return { ...state.customer, ...newField };
  }
);

export const sendCustomerData = createAsyncThunk(
  'customer/sendCustomerData',
  async (customerData: Customer, { rejectWithValue }) => {
    try {
      const customer = {
        customerData: customerData,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customer`,
        JSON.stringify(customer)
      );
      
      console.log(response.statusText);
      return response.statusText;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Failed to send data to Google Sheets');
    }
  }
);
