import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // If using cookies
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout');
    }
    if (!error.response) {
      throw new Error('Network error - could not reach server');
    }
    return Promise.reject(error);
  }
);

export default api;