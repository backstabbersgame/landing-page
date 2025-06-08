// 'use client';

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { ContactForm } from 'src/types/contact';
// import { sendContactForm } from './contactThunk';

// interface ContactState {
//   loading: boolean;
//   success: boolean;
//   error: string | null;
// }

// const initialState: ContactState = {
//   loading: false,
//   success: false,
//   error: null,
// };

// const contactSlice = createSlice({
//   name: 'contact',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(sendContactForm.pending, (state) => {
//         state.loading = true;
//         state.success = false;
//         state.error = null;
//       })
//       .addCase(sendContactForm.fulfilled, (state) => {
//         state.loading = false;
//         state.success = true;
//       })
//       .addCase(sendContactForm.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export default contactSlice.reducer;
