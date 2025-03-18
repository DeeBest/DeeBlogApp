import customAxios from '../api/axios.js';

const refreshToken = async () => {
  try {
    const res = await customAxios.get('/users/auth/refresh');
    const newToken = res.data.accessToken;

    return newToken;
  } catch (error) {
    console.error(error);
  }
};

export default refreshToken;
