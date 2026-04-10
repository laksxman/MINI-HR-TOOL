import { apiRequest } from './api';

export const markAttendance = (attendanceData) => {
  return apiRequest({
    url: '/attendance/mark',
    method: 'POST',
    data: attendanceData
  });
};

export const getMyAttendance = () => {
  return apiRequest({
    url: '/attendance/my',
    method: 'GET'
  });
};

export const getAllAttendance = (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  return apiRequest({
    url: `/attendance/all?${params}`,
    method: 'GET'
  });
};
