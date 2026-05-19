import { loginUser } from './authThunk';
import { createSlice } from '@reduxjs/toolkit';

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
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.errors = null;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action.payload)
        state.user = null;
        state.isLoading = false;
        state.errors = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
