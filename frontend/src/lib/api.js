import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('buybee_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const loginUser = (data) => api.post('/auth/login', data);
export const signupUser = (data) => api.post('/auth/signup', data);
export const logoutUser = () => api.post('/auth/logout');

// Products
export const fetchProducts = () => api.get('/products');
export const fetchProductBySlug = (slug) => api.get(`/products/${slug}`);

// Orders
export const createOrder = (data) => api.post('/orders', data);
export const fetchOrders = () => api.get('/orders');
export const fetchOrderById = (id) => api.get(`/orders/${id}`);

export default api;
