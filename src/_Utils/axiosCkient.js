import axios from 'axios';

const apiUrl = 'https://clinic.telast.tech/api/v1';

const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in all requests
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Attach token to Authorization header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosClient;