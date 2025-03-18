import axios from 'axios';

const BACKEND_URL = 'http://localhost:3000/api';

const customAxios = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default customAxios;
