import axios from 'axios';

/**
 * Pre-configured Axios instance for talking to the backend API.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true, // Crucial for sending/receiving HttpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept 401s globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle 401 errors that are not from the /api/auth/me endpoint (which we expect to fail sometimes)
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config.url?.includes('/auth/me') &&
      !error.config.url?.includes('/auth/login')
    ) {
      // You can dispatch a custom event here that the AuthContext listens to,
      // or directly invoke a callback if you pass it in, but a custom event is decoupled.
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }
    return Promise.reject(error);
  }
);
