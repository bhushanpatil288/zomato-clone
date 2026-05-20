import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, register, me, foods } from '../api/api';
import { setToken, setUser } from './authStorage';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkAPI) => {
    try {
      const response = await login(formData);
      setToken(response.data.data.token);
      setUser(response.data.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login Failed');
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, thunkAPI) => {
    try {
      const response = await register(formData);
      setToken(response.data.data.token);
      setUser(response.data.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration Failed');
    }
  },
);

export const getMe = createAsyncThunk(
  'auth/me',
  async (_, thunkAPI) => {
    try {
      const response = await me();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },

);

export const getFoods = createAsyncThunk(
  'foods/getFoods',
  async (params, thunkAPI) => {
    try {
      const response = await foods(params);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Fetch foods failed');
    }
  },
);

