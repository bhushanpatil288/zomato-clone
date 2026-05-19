import { loginUser, getMe } from './authThunk';
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
        state.user = null;
        state.isLoading = false;
        state.errors = action.payload;
      })

      // get me
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.errors = null;
        state.isLoading = false;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.errors = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
