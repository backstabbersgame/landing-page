import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Address } from 'src/types/address';

interface AddressState {
  address: Address;
  apiAddress: Address;
  errors: Record<string, string>;
  loading: boolean;
}

const createEmptyAddress = (): Address => ({
  cep: '',
  uf: '',
  city: '',
  neighborhood: '',
  address: '',
  number: '',
  additionalAddress: '',
});

const initialState: AddressState = {
  address: createEmptyAddress(),
  apiAddress: createEmptyAddress(),
  errors: {},
  loading: false,
};

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddressField: (
      state,
      action: PayloadAction<{ field: keyof Address; value: string }>
    ) => {
      const { field, value } = action.payload;
      state.address[field] = value;
    },
    setApiAddress: (
      state,
      action: PayloadAction<{ field: keyof Address; value: string }>
    ) => {
      const { field, value } = action.payload;
      state.apiAddress[field] = value;
    },
    setErrors: (state, action: PayloadAction<Record<string, string>>) => {
      state.errors = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    resetAddress: (state) => {
      state.address = initialState.address;
      state.apiAddress = initialState.apiAddress;
      state.errors = initialState.errors;
      state.loading = initialState.loading;
    },
  },
});

export const {
  setAddressField,
  setApiAddress,
  setErrors,
  setLoading,
  resetAddress,
  clearErrors,
} = addressSlice.actions;

export default addressSlice.reducer;

export type { AddressState };
