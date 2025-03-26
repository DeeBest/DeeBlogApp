// utils/refreshToken.js
import customAxios from '../api/axios';

const refreshToken = async () => {
  try {
    const res = await customAxios.get('/users/auth/refresh');
    return res.data.accessToken;
  } catch (error) {
    console.error('Refresh token failed:', error);
    throw error; // Critical: Propagate error to caller
  }
};
export default refreshToken;
