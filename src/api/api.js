import axios from 'axios';
import { getToken, removeToken } from '../redux/authStorage';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Attaches JWT token on every request automatically
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handler — auto-logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.message || 'Something went wrong';
    if (err.response?.status === 401) {
      removeToken();
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(new Error(msg));
  },
);

// ─── Auth ────────────────────────────────────────────────
export const login = (formData) => api.post('/auth/login', formData);
export const register = (formData) => api.post('/auth/register', formData);
export const me = () => api.get('/auth/me');

// ─── Foods (CRUD) ────────────────────────────────────────
export const getFoodsApi = (params) => api.get('/foods', { params });
export const addFoodApi = (formData) => api.post('/foods', formData);
export const updateFoodApi = (id, formData) => api.put(`/foods/${id}`, formData);
export const deleteFoodApi = (id) => api.delete(`/foods/${id}`);

// ─── Orders ──────────────────────────────────────────────
export const getOrdersApi = (params) => api.get('/orders', { params });
export const updateOrderStatusApi = (id, status) =>
  api.put(`/orders/${id}/status`, { status });
