import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaUser, FaArrowRight } from 'react-icons/fa';
import { HiDocumentText, HiOutlineExclamationCircle } from 'react-icons/hi';

import toggleOverlay from '../utils/toggleOverlay';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';
import useGlobal from '../hooks/useGlobal';

const Dashboard = () => {
  const { auth, setAuth, setIsLoading } = useAuth();

  const { theme } = useTheme();
  const { linkClass, handleLogout, successToast, errorToast } = useGlobal();

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
      <div className="overlay z-9 absolute top-[-100%] left-0 h-full w-full bg-[#000000ca] flex justify-center items-center transition-all -translate-y-full duration-500 rounded-md">
        <div className="bg-white flex flex-col gap-3 p-2 text-slate-700 rounded-lg">
          <HiOutlineExclamationCircle className="text-5xl self-center font-bold" />
          <p>are you sure you want delete your account?</p>
          <button
            className="bg-red-500 p-1 rounded-md mt-3 font-bold hover:opacity-80 hover:scale-95 duration-300"
            onClick={handleDeleteUser}
          >
            Yes, I am sure
          </button>
          <button
            className="bg-green-500 p-1 rounded-md font-bold hover:opacity-80 hover:scale-95 duration-300"
            onClick={toggleOverlay}
          >
            Cancel
          </button>
        </div>
      </div>
      <div
        className={`sm:w-1/4 w-full min-h-full flex flex-col p-2 gap-3 ${
          theme === 'light' ? 'bg-indigo-100' : 'dark:bg-slate-700'
        } rounded-md shadow-sm`}
      >
        <NavLink to="/dashboard/profile" className={linkClass}>
          <div className="flex items-center gap-2 p-1 font-semibold">
            <FaUser className="text-xl" />
            <div className="flex-1 flex gap-1 items-center justify-between">
              <h3 className="font-semibold text-slate-500">Profile</h3>
              <p
                className={`text-[10px] font-semibold bg-slate-400 text-slate-700
                } p-[1px] rounded`}
              >
                {auth.currentUser.roles.includes(2001) ? 'Admin' : 'User'}
              </p>
            </div>
          </div>
        </NavLink>
        {auth.currentUser.roles.includes(2001) && (
          <NavLink to="/dashboard/posts" className={linkClass}>
            <div className="flex items-center p-1 gap-2 font-semibold">
              <HiDocumentText className="text-xl" />
              <p>Posts</p>
            </div>
          </NavLink>
        )}
        <button
          className="sm:w-full w-1/3 max-w-32 p-1 rounded font-semibold shadow-sm hover:opacity-80 duration-300 self-center flex gap-2 items-center"
          onClick={handleLogout}
        >
          <FaArrowRight />
          Sign out
        </button>
      </div>
      <Outlet />
    </div>
  );
};
export default Dashboard;
