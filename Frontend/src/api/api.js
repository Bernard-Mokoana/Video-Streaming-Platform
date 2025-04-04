import axios from 'axios';
import dotenv  from 'dotenv';
import { store } from '../app/store.js';

dotenv.config({
    path: "./.env"
})


const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:800/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

API.interceptors.request.use((config) => {
    const token = store.getState().auth.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

API.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if(error.response?.status === 401) {
            store.dispatch(logout());
        }
        return Promise.reject(error.response?.data?.message || 'An error occured');
    }
);

export default API;