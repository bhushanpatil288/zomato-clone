import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './authThunk';

const initialState = {
  user: null,
  isLoading: false,
  errors: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      //todo
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.errors = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
