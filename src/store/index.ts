import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './customerSlice';
import addressReducer from './addressSlice';
// import contactReducer from './contactSlice';

export const store = configureStore({
  reducer: {
    address: addressReducer,
    customer: customerReducer,
    // contact: contactReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
