import axios from 'axios';

const baseURL = 'http://localhost:8000';

// Create axios instance with base configuration
const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    credentials: 'include'  // Importante per CORS con cookies
});

// Request interceptor
axiosInstance.interceptors.request.use(async config => {
    try {
        // Get CSRF cookie if needed
        if (!document.cookie.includes('XSRF-TOKEN')) {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
        }

        // Add CSRF token from cookie
        const token = document.cookie.match(/XSRF-TOKEN=([^;]*)/);
        if (token) {
            config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token[1]);
        }

        // Add auth token if available
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            config.headers['Authorization'] = `Bearer ${authToken}`;
        }

        return config;
    } catch (error) {
        console.error('Error in request interceptor:', error);
        return Promise.reject(error);
    }
}, error => {
    console.error('Request error:', error);
    return Promise.reject(error);
});

// Response interceptor
axiosInstance.interceptors.response.use(response => response, error => {
    if (!error.response) {
        console.error('Network error:', error);
        return Promise.reject({
            message: 'Errore di rete. Verifica la tua connessione.',
            original: error
        });
    }

    switch (error.response.status) {
        case 401:
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem('authToken');
            if (window.location.pathname !== '/user/login') {
                window.location.href = '/user/login';
            }
            break;
        case 419:
            // CSRF token mismatch - reload page
            window.location.reload();
            break;
        case 422:
            // Validation errors
            return Promise.reject(error.response.data);
        case 500:
            console.error('Server error:', error.response.data);
            break;
        case 0:
            // CORS error
            console.error('CORS error:', error);
            return Promise.reject({
                message: 'Errore di accesso al server. Verifica che il backend sia in esecuzione.',
                original: error
            });
    }

    return Promise.reject(error.response?.data || error);
});

export default axiosInstance;