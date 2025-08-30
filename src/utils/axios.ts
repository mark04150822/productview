import axios from 'axios';

// 建立 axios 實例
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 請求攔截器
api.interceptors.request.use(
  (config) => {
    // 可以在這裡添加 token 等認證資訊
    console.log('發送請求:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 回應攔截器
api.interceptors.response.use(
  (response) => {
    // 可以在這裡處理回應資料
    console.log('收到回應:', response.status);
    return response;
  },
  (error) => {
    // 可以在這裡統一處理錯誤
    console.error('請求錯誤:', error);
    return Promise.reject(error);
  }
);

export default api;
