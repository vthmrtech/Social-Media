// apiClient.js

import axios from "axios";


// Create Axios instance with a base URL
const axiosClient = axios.create({
    baseURL: 'http://localhost:4000/socialmedia/',
});

// Request interceptor
axiosClient.interceptors.request.use(
    config => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.error('Response Error:', error);
        return Promise.reject(error);
    }
);

export const getApiResource = async (endpoint,data) => {
    try {
        console.log(data)
        const response = await axiosClient.get(endpoint,data);
        return response.data;
    } catch (error) {
        console.error('GET Error:', error);
        throw error;
    }
};

// Function for making POST request
export const postApiData = async (endpoint, data) => {
    try {
        const response = await axiosClient.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('POST Error:', error);
        throw error;
    }
};
