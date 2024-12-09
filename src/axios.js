import axios from 'axios';

const baseURL = 'http://localhost:8000';

// Create axios instance with custom config
const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
});

// Add request interceptor
axiosInstance.interceptors.request.use(
    async config => {
        // Get CSRF cookie before each request if not already set
        if (!document.cookie.includes('XSRF-TOKEN')) {
            await axios.get(`${baseURL}/sanctum/csrf-cookie`, {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
        }

        // Add CSRF token to headers
        const token = document.cookie.match(/XSRF-TOKEN=([^;]*)/);
        if (token) {
            config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token[1]);
        }

        // Add Bearer token if available
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            config.headers['Authorization'] = `Bearer ${authToken}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem('authToken');
                if (window.location.pathname !== '/user/login') {
                    window.location.href = '/user/login';
                }
            }
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;