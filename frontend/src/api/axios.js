import axios from 'axios';

const BACKEND_URL = 'https://deeblogappbackend.onrender.com';

const customAxios = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default customAxios;
