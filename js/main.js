import { createApp } from 'vue'
import App from '../src/App.vue'
import { router } from './router'
import 'bootstrap/dist/css/bootstrap.css'
import axios from '../src/plugins/axios'

// Configure axios defaults before making requests
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://127.0.0.1:8000/' // backend URL
axios.defaults.withXSRFToken = true
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://127.0.0.1:8000'

const baseURL = 'http://127.0.0.1:8000';
const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:8000',
        'Access-Control-Allow-Credentials': true
    },
    credentials: 'include'  // Importante per CORS con cookies
});

// Request interceptor
axiosInstance.interceptors.request.use(async config => {
    try {
        await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');
        return config;
    } catch (error) {
        console.error('Error getting CSRF cookie:', error);
        return Promise.reject(error);
    }
});

// Create and mount Vue app
createApp(App).use(router).mount('#app')
