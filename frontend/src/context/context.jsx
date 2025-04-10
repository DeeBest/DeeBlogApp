import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';

import { toast } from 'react-toastify';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';

export const Context = createContext();

const ContextProvider = (props) => {
  const { auth, setAuth, setIsLoading } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [showMore, setShowMore] = useState(true);
  const customAxios = useAxiosInterceptor();

  const linkClass = ({ isActive }) =>
    isActive
      ? theme === 'light'
        ? 'bg-slate-700 text-slate-200 px-1 py-[1px] rounded hover:opacity-80 duration-300'
        : 'bg-slate-300 text-slate-700 px-1 py-[1px] rounded hover:opacity-80 duration-300'
      : 'hover:opacity-80 duration-300'; // Explicit empty string for !isActive

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const res = await customAxios.get(`/users/auth/logout`);

      if (res.status === 204) {
        setAuth({});
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await customAxios.get('/users');

      setUsers(res.data.users);
      setLastMonthUsers(res.data.lastMonthUsers);
      setTotalUsers(res.data.totalUsers);
    } catch (error) {
      console.error(error);
      errorToast(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await customAxios.get('/comments/get-all-comments?limit=9');
      console.log(res.data);

      setComments(res.data.comments);
      setLastMonthComments(res.data.lastMonthsComments);
      setTotalComments(res.data.totalComments);
    } catch (error) {
      console.error(error);
      errorToast(error.message);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await customAxios.get('/posts');
      console.log(res.data);

      setPosts(res.data.posts);
      setLastMonthPosts(res.data.lastMonthsPosts);
      setTotalPosts(res.data.totalPosts);

      if (res.data.posts.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    auth?.currentUser.roles.includes(2001) && (fetchUsers(), fetchComments());
  }, [auth.currentUser]);

  const successToast = (message) => toast.success(message);
  const errorToast = (message) => toast.error(message);

  const contextValue = {
    linkClass,
    handleLogout,
    successToast,
    errorToast,
    users,
    comments,
    posts,
    setPosts,
    showMore,
    setShowMore,
    totalComments,
    totalPosts,
    totalUsers,
    lastMonthComments,
    lastMonthPosts,
    lastMonthUsers,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
