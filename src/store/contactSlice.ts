'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sendContact } from './contactThunk';

interface ContactState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ContactState = {
  loading: false,
  error: null,
  success: false,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetStatus(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendContact.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetStatus } = contactSlice.actions;
export default contactSlice.reducer;