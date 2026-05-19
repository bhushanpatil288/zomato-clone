import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, api } from '../api/api';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkAPI) => {
    try {
      const response = await login(formData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const getMe = createAsyncThunk(
  'auth/profile',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const response = await api.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
);

