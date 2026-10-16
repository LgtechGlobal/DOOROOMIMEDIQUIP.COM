// Centralized API & Domain Configuration for Dooroomi Mediquip
// Supports production https://www.dooroomimediquip.com and local development

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const BACKEND_SERVER_URL = API_BASE_URL.replace(/\/api\/?$/, '');

export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://www.dooroomimediquip.com';

export default API_BASE_URL;
