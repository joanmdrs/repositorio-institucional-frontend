import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development';
const baseURL = isDevelopment
    ? import.meta.env.VITE_API_BASE_URL_LOCAL
    : import.meta.env.VITE_API_BASE_URL_DEPLOY;
    
const api = axios.create({
    baseURL: baseURL,
})

api.interceptors.request.use(
    (config) => {
        const access = localStorage.getItem("access");
        if (access && config.headers) {
            config.headers.Authorization = `Bearer ${access}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api
