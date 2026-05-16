import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      //todo
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
