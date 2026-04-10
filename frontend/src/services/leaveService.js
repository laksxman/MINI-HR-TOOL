import { apiRequest } from './api';

export const applyLeave = (leaveData) => {
  return apiRequest({
    url: '/leaves/apply',
    method: 'POST',
    data: leaveData
  });
};

export const getMyLeaves = () => {
  return apiRequest({
    url: '/leaves/my',
    method: 'GET'
  });
};

export const getAllLeaves = () => {
  return apiRequest({
    url: '/leaves/all',
    method: 'GET'
  });
};

export const updateLeave = (id, leaveData) => {
  return apiRequest({
    url: `/leaves/${id}`,
    method: 'PUT',
    data: leaveData
  });
};

export const deleteLeave = (id) => {
  return apiRequest({
    url: `/leaves/${id}`,
    method: 'DELETE'
  });
};
