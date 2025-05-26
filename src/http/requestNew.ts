import axios from 'axios';
import qs from 'qs';
import {message} from "antd";
import eventSub, {EventName} from "../util/EventSub";

export const baseHost = 'https://ttiks.shop/tk/api';

const instance = axios.create({
  baseURL: baseHost,
  timeout: 30000,
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

const handleError = <T = any>(error: any): ApiResponse<T> => {
  const msg = error?.response?.data?.message || error?.message || '请求失败';
  message.error(msg)
  return {
    code: -1,
    message: error?.response?.data?.message || error?.message || '请求失败',
    data: null as any,
  };
};

export const get = async <T = any>(
  url: string,
  params?: Record<string, any>
): Promise<ApiResponse<T>> => {
  try {
    const res = await instance.get<ApiResponse<T>>(url, { params });
    if (res?.data?.code === 401){
        eventSub.publish(EventName.NoAuth)
    }
    return res.data;
  } catch (err) {
    return handleError<T>(err);
  }
};

export const post = async <T = any>(
  url: string,
  data?: Record<string, any>,
  options?: { form?: boolean }
): Promise<ApiResponse<T>> => {
  const headers = options?.form
    ? { 'Content-Type': 'application/x-www-form-urlencoded' }
    : { 'Content-Type': 'application/json' };

  const payload = options?.form ? qs.stringify(data) : data;

  try {
    const res = await instance.post<ApiResponse<T>>(url, payload, { headers });
      if (res?.data?.code === 401){
          eventSub.publish(EventName.NoAuth)
      }
    return res.data;
  } catch (err) {
    return handleError<T>(err);
  }
};
