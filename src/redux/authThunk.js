import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, profile } from '../api/api';
import { setToken } from './authStorage';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkAPI) => {
    try {
      const response = await login(formData);
      setToken(response.data.data.token);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login Failed');
    }
  },
);

export const getMe = createAsyncThunk(
  'auth/profile',
  async (_, thunkAPI) => {
    try {
      const response = await profile();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

