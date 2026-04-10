import { apiRequest } from './api';

export const login = (credentials) => {
  return apiRequest({
    url: '/auth/login',
    method: 'POST',
    data: credentials
  });
};

export const register = (userData) => {
  return apiRequest({
    url: '/auth/register',
    method: 'POST',
    data: userData
  });
};

export const getProfile = () => {
  return apiRequest({
    url: '/users/profile',
    method: 'GET'
  });
};
