// Centralized API & Domain Configuration for Dooroomi Mediquip
// Connected to Live Render Backend: https://dooroomimediquip-com.onrender.com

export const PRODUCTION_API_URL = 'https://dooroomimediquip-com.onrender.com/api';
export const LOCAL_API_URL = 'http://localhost:5000/api';

const isProduction = 
  import.meta.env.PROD || 
  (typeof window !== 'undefined' && !['localhost', '127.0.0.1'].includes(window.location.hostname));

export const API_BASE_URL = 
  import.meta.env.VITE_API_URL || 
  (isProduction ? PRODUCTION_API_URL : LOCAL_API_URL);

export const BACKEND_SERVER_URL = API_BASE_URL.replace(/\/api\/?$/, '');

export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://www.dooroomimediquip.com';

export default API_BASE_URL;
