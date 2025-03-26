// hooks/useAxiosInterceptor.js
import { useContext, useEffect, useRef } from 'react';
import refreshToken from '../utils/refreshToken';
import AuthContext from '../context/authContext';
import customAxios from '../api/axios';

const useAxiosInterceptor = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const interceptorId = useRef({ request: null, response: null });

  useEffect(() => {
    // Cleanup old interceptors first
    if (interceptorId.current.request !== null) {
      customAxios.interceptors.request.eject(interceptorId.current.request);
    }
    if (interceptorId.current.response !== null) {
      customAxios.interceptors.response.eject(interceptorId.current.response);
    }

    const requestInterceptor = customAxios.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization'] && auth?.accessToken) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
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
          try {
            prevRequest.sent = true;
            const newAccessToken = await refreshToken();

            // Update auth context with new token
            setAuth((prev) => ({ ...prev, accessToken: newAccessToken }));

            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return customAxios(prevRequest);
          } catch (refreshError) {
            // Force logout on refresh failure
            setAuth(null);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    interceptorId.current = {
      request: requestInterceptor,
      response: responseInterceptor,
    };

    return () => {
      customAxios.interceptors.request.eject(requestInterceptor);
      customAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [auth?.accessToken, setAuth]); // Only track accessToken changes

  return customAxios;
};
export default useAxiosInterceptor;
