import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import

const RequireAuth = ({ allowedRoles }) => {
  const { auth, setIsLoading, isLoading } = useAuth();
  const location = useLocation();

  const 

  const getToken = async () => {
    setIsLoading(true)

    try {
      const newToken = await refresh
    } catch (error) {
      
    }
  }

  if (!auth?.accessToken) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
