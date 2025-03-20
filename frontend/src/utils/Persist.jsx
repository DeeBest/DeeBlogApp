import { useContext, useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../context/authContext';
import refreshToken from './refreshToken';

const Persist = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const persist = true;

  useEffect(() => {
    const getToken = async () => {
      setIsLoading(true);
      try {
        const newToken = await refreshToken();

        setAuth({ ...auth, accessToken: newToken });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? getToken() : setIsLoading(false);
  }, []);

  return !persist ? <Outlet /> : isLoading ? <h1>Loading...</h1> : <Outlet />;
};
export default Persist;
