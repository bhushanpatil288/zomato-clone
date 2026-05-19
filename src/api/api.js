import axios from 'axios';
import { getToken } from '../redux/authStorage';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Attaches JWT token on every require automatically
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (formData) => api.post('/auth/login', formData);

export const profile = () => axios.get('/auth/me');
