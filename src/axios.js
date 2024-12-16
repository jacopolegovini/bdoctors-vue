import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000'; // URL del tuo back-end Laravel
axios.defaults.withCredentials = true;  // Permetti l'invio dei cookie nelle richieste

export default axios;

// Create axios instance with custom config
// const axiosInstance = axios.create({
//     baseURL: 'http://127.0.0.1:8000',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//     },
//     withCredentials: true
// });

// Add request interceptor
// axiosInstance.interceptors.request.use(
//     config => {
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

// Add response interceptor
// axiosInstance.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response?.status === 401) {
             // Handle unauthorized access
//             localStorage.removeItem('authToken');
//             window.location.href = '/user/login';
//         }
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;