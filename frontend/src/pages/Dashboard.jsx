import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import useAuth from '../hooks/useAuth';
import useGlobal from '../hooks/useGlobal';
import Overlay from '../components/Overlay';
import DashSidebar from '../components/DashSidebar';

const Dashboard = () => {
  const { auth, setAuth, setIsLoading } = useAuth();
  const { successToast, errorToast } = useGlobal();

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const customAxios = useAxiosInterceptor();

  const handleDeleteUser = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      await customAxios.delete(`/users/delete-user/${auth.currentUser.id}`);
      setAuth({});
      successToast('Successfully deleted account.');
      navigate('/');
    } catch (error) {
      console.error(error);
      errorToast('Failed to delete account');
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full min-h-full flex flex-col sm:flex-row sm:text-center gap-3 p-2 mx-auto relative">
      <Overlay handleDeleteUser={handleDeleteUser} />
      <DashSidebar />
      <Outlet />
    </div>
  );
};
export default Dashboard;
