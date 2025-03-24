import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';

const RequireAuth = ({ allowedRoles }) => {
  const { auth, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <h1>Verifying session...</h1>;
  }

  // Check for accessToken instead of username
  if (!auth?.accessToken) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // Get fresh data from token
  const decoded = jwtDecode(auth.accessToken);
  const userRoles = decoded?.roles || [];

  if (!allowedRoles.some((role) => userRoles.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
