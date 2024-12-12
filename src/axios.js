// Function to get a precise cookie
// function getCookie(cname) {
//   let name = cname + "=";
//   let decodedCookie = decodeURIComponent(document.cookie);
//   let ca = decodedCookie.split(';');
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

import axios from 'axios';

// Create axios instance with custom config
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Add request interceptor
// axiosInstance.interceptors.request.use(
//     config => {
//         const token = getCookie('XSRF-TOKEN');
//         if (token) {
//             config.headers['X-XSRF-TOKEN'] = `${token}`;
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

// // Add response interceptor
// axiosInstance.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response?.status === 401) {
//             // Handle unauthorized access
//             localStorage.removeItem('authToken');
//             window.location.href = '/user/login';
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;