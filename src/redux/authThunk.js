import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  login,
  register,
  me,
  getFoodsApi,
  addFoodApi,
  updateFoodApi,
  deleteFoodApi,
  getOrdersApi,
  updateOrderStatusApi,
} from '../api/api';
import { setToken, setUser } from './authStorage';

// ─── Auth Thunks ─────────────────────────────────────────

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkAPI) => {
    try {
      const response = await login(formData);
      setToken(response.data.data.token);
      setUser(response.data.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Login Failed');
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
      return thunkAPI.rejectWithValue(error.message || 'Registration Failed');
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
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// ─── Food Thunks (CRUD) ─────────────────────────────────

export const getFoods = createAsyncThunk(
  'foods/getFoods',
  async (params, thunkAPI) => {
    try {
      const response = await getFoodsApi(params);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Fetch foods failed');
    }
  },
);

export const addFood = createAsyncThunk(
  'foods/addFood',
  async (formData, thunkAPI) => {
    try {
      const response = await addFoodApi(formData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Add food failed');
    }
  },
);

export const updateFood = createAsyncThunk(
  'foods/updateFood',
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await updateFoodApi(id, formData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Update food failed');
    }
  },
);

export const deleteFood = createAsyncThunk(
  'foods/deleteFood',
  async (id, thunkAPI) => {
    try {
      await deleteFoodApi(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Delete food failed');
    }
  },
);

// ─── Order Thunks ────────────────────────────────────────

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (params, thunkAPI) => {
    try {
      const response = await getOrdersApi(params);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Fetch orders failed');
    }
  },
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await updateOrderStatusApi(id, status);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Update order failed');
    }
  },
);
