import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || '/api',
// });

const api = axios.create({
  baseURL: 'https://mini-hr-tool-backend-wurz.onrender.com/api',  // HARDCODE
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiRequest = async (config) => {
  try {
    const response = await api(config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    throw error.response?.data?.message || 'Something went wrong';
  }
};

export default api;
