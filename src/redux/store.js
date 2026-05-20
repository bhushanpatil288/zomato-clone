import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import themeReducer from './themeSlice';
import foodReducer from './foodSlice';
import orderReducer from './orderSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    foods: foodReducer,
    orders: orderReducer,
  },
});

export default store;
