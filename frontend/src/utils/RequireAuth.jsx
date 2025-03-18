import { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/authContext';

const RequireAuth = () => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  //  state={{ from: location }} replace
  return auth?.email ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};
export default RequireAuth;
