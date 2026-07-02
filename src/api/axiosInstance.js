/**
 * Axios instance pre-configured for JSONPlaceholder.
 * Centralises base URL, headers, and error handling so that
 * individual service modules stay lean and consistent.
 */

import axios from 'axios';
import { API_BASE_URL } from '../constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 s — generous for a free API
});

// ---- Response interceptor: unwrap data & normalise errors ----
axiosInstance.interceptors.response.use(
  (response) => response, // pass successful responses through
  (error) => {
    // Build a user-friendly error message
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';

    console.error('[API Error]', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message,
    });

    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
