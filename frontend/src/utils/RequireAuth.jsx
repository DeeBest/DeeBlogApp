import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/authContext';

const RequireAuth = () => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default RequireAuth;
