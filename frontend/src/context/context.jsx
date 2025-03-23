import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import customAxios from '../api/axios';

import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';

export const Context = createContext();

const ContextProvider = (props) => {
  const { setAuth, setIsLoading } = useAuth();
  const { theme } = useTheme();

  const linkClass = ({ isActive }) =>
    isActive
      ? theme === 'light'
        ? 'bg-slate-700 text-slate-200 px-1 py-[1px] rounded hover:opacity-80 duration-300'
        : 'bg-slate-300 text-slate-700 px-1 py-[1px] rounded hover:opacity-80 duration-300'
      : 'hover:opacity-80 duration-300'; // Explicit empty string for !isActive

  const navigate = useNavigate();

  const successToast = (message) => toast.success(message);
  const errorToast = (message) => toast.error(message);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const res = await customAxios.get(`/users/auth/logout`);

      if (res.status === 204) {
        setAuth({});
        successToast('Successfully logged out');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      errorToast('Failed to logout');
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue = {
    setIsLoading,
    linkClass,
    handleLogout,
    successToast,
    errorToast,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
