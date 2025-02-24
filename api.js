import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// Authentication APIs
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);
