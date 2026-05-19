import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Attaches JWT token on every require automatically
// api.interceptors.request.use((config) => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   if (user?.token) {
//     config.headers.Authorization = `Bearer ${user.token}`;
//   }
//   return config;
// });

export const login = (formData) => api.post('/auth/login', formData);

export const profile = () => axios.get('/auth/me');
