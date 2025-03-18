import { useContext, useEffect } from 'react';
import refreshToken from '../utils/refreshToken';
import AuthContext from '../context/authContext';
import customAxios from '../api/axios';

const useAxiosInterceptor = () => {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const requestInterceptor = customAxios.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = customAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;

          const newAccessToken = await refreshToken();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return customAxios(prevRequest);
        }
        Promise.reject(error);
      }
    );
    return () => {
      customAxios.interceptors.request.eject(requestInterceptor);
      customAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refreshToken]);

  return customAxios;
};
export default useAxiosInterceptor;
