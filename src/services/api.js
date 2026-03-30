// API Service for handling all backend communication
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { appConfig } from '../config';

const apiClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use(
  async config => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving auth token:', error);
    }
    return config;
  },
  error => Promise.reject(error)
);

// Handle response errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      SecureStore.deleteItemAsync('authToken');
    }
    return Promise.reject(error);
  }
);

// Product APIs
export const productAPI = {
  getProducts: (filters = {}) => apiClient.get('/products', { params: filters }),
  getProductDetail: id => apiClient.get(`/products/${id}`),
  searchProducts: query => apiClient.get('/products/search', { params: { q: query } }),
  getCategories: () => apiClient.get('/categories'),
};

// Auth APIs (mock implementation - replace with real API)
export const authAPI = {
  sendOTP: phoneNumber => 
    new Promise(resolve => {
      setTimeout(() => {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        resolve({ success: true, otp, sessionId: Math.random().toString() });
      }, 1000);
    }),
  
  verifyOTP: (sessionId, otp) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        // In production, verify with backend
        resolve({ success: true, token: 'sample_token' });
      }, 1000);
    }),
};

// Order APIs
export const orderAPI = {
  createOrder: orderData => apiClient.post('/orders', orderData),
  getOrders: () => apiClient.get('/orders'),
  getOrderDetail: id => apiClient.get(`/orders/${id}`),
  cancelOrder: id => apiClient.post(`/orders/${id}/cancel`),
};

// Payment APIs
export const paymentAPI = {
  initiatePayment: paymentData => apiClient.post('/payments/initiate', paymentData),
  verifyPayment: paymentId => apiClient.get(`/payments/${paymentId}/verify`),
};

// User APIs
export const userAPI = {
  getProfile: () => apiClient.get('/user/profile'),
  updateProfile: data => apiClient.put('/user/profile', data),
  getAddresses: () => apiClient.get('/user/addresses'),
  addAddress: data => apiClient.post('/user/addresses', data),
};

export default apiClient;
