import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import themeReducer from './themeSlice';
import foodSlice from './foodSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    foods: foodSlice,
  },
});

export default store;
