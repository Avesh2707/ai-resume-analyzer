import axios from 'axios';

/**
 * Pre-configured Axios instance for talking to the backend API.
 * Not consumed anywhere yet in Phase 1 - this is scaffolding for future phases.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
