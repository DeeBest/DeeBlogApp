import { createContext, useEffect, useState } from 'react';
import refreshToken from '../utils/refreshToken';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

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
        const currentUser = decoded.userInfo;

        // Verify token contains required data
        if (!decoded?.userInfo?.username) {
          throw new Error('Invalid token payload');
        }

        setAuth({
          accessToken: newToken,
          currentUser,
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
      {isLoading ? (
        <div className="flex items-center justify-center flex-1 w-full bg-slate-500">
          <Link to="/" className="animate-pulse">
            <div className="flex items-center justify-center">
              <div className="w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] flex justify-center items-center bg-rose-500 rounded-full border-[1px] border-cyan-500"></div>
              <h1 className="p-2 -ml-16 text-3xl italic font-extrabold rounded-md sm:p-4 sm:-ml-32 sm:text-6xl text-slate-50 dark:text-slate-700 bg-gradient-to-l from-rose-300 via-rose-400 to-rose-500 sm:rounded-xl">
                DeeBlogApp
              </h1>
            </div>
          </Link>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;
