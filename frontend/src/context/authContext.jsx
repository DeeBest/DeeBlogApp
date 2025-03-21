import { createContext, useEffect, useState } from 'react';
import refreshToken from '../utils/refreshToken';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // Use `null` to differentiate between "loading" and "no user"
  const [isLoading, setIsLoading] = useState(true); // Start as `true`

  useEffect(() => {
    const getToken = async () => {
      try {
        const newToken = await refreshToken();
        setAuth((prevAuth) => ({
          ...prevAuth, // Preserve any existing auth info
          accessToken: newToken,
        }));
      } catch (error) {
        console.error('Error refreshing token:', error);
        setAuth(null); // Explicitly set `null` when there's no valid session
      } finally {
        setIsLoading(false);
      }
    };

    getToken();
  }, []); // No `auth` dependency to prevent infinite loops

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoading }}>
      {isLoading ? <h1>Loading...</h1> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
