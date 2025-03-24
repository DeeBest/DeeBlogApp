import { createContext, useEffect, useState } from 'react';
import refreshToken from '../utils/refreshToken';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const newToken = await refreshToken();
        const decoded = jwtDecode(newToken);

        // Verify token contains required data
        if (!decoded?.username) {
          throw new Error('Invalid token payload');
        }

        setAuth({
          accessToken: newToken,
          username: decoded.username,
          roles: decoded.roles,
          userId: decoded.userId,
        });
      } catch (error) {
        setAuth(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoading, setIsLoading }}>
      {isLoading ? <h1>Loading...</h1> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
