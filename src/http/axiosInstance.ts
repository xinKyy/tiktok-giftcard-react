// src/utils/axiosInstance.ts

import axios from 'axios';
import {message} from "antd";

export const baseHost = "http://myjx2erv5kcq.ngrok.xiaomiqiu123.top/anystarr-new"

// 创建一个 axios 实例
const axiosInstance = axios.create({
  baseURL: baseHost, // API 基础地址，根据需要修改
  timeout: 30000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    config.headers.set("token", localStorage.getItem("token"))
    config.headers.set("userId", localStorage.getItem("id"))
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

const languageMap: Map<string, string> = new Map([
    [
        "Invitation code error.", "予約コードのエラー",
    ],
    [
        "The referral code is error", "招待コードエラー",
    ],
    [
        "Please check your email for verification code.", "認証コードを取得するためにEメールをチェックしてください。",
    ],
    [
        "The verification code is incorrect", "認証コードが正しくありません",
    ],
])

const getRiyu = (str:string):string =>{
    if(languageMap.has(str)){
        return languageMap.get(str)!
    }
    return str
}


// 响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
      if(response.data.code !== "1" && response.data.message){
          message.warning(getRiyu(response.data.message))
      }
    return response.data;
  },
  error => {
    // 对响应错误做点什么
    if (error.response) {
      // 服务器返回了状态码，但状态码超出了 2xx 范围
      message.error('Please try again!');
    } else if (error.request) {
      // 请求已经发出，但没有收到响应
      message.error('Time out, please try again!');
    } else {
      // 其他错误
      message.error('Please try again!');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
