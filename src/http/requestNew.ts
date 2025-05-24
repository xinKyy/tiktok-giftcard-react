import axios from 'axios';

export const baseHost = 'http://8.222.228.63:8099/api';

const instance = axios.create({
  baseURL: baseHost,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export const get = <T>(url: string, params?: any) =>
  instance.get<ApiResponse<T>>(url, { params }).then(res => res.data);

export const post = <T>(url: string, data?: any) =>
  instance.post<ApiResponse<T>>(url, data).then(res => res.data);

