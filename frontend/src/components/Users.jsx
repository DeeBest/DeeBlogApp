import { useState, useEffect } from 'react';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import useGlobal from '../hooks/useGlobal';
import {
  FaCheck,
  FaExclamationTriangle,
  FaTimes,
  FaTrashAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const customAxios = useAxiosInterceptor();
  const { errorToast } = useGlobal();

  const fetchUsers = async () => {
    try {
      const res = await customAxios.get('/users');

      setUsers(res.data.users);
    } catch (error) {
      console.error(error);
      errorToast(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex-col flex-1 w-full gap-4 p-1">
      <h1 className="text-2xl font-semibold">Users</h1>
      {users.length <= 0 || !users ? (
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <FaExclamationTriangle className="text-3xl text-red-500" />
          <h3 className="text-lg font-semibold">
            No Users available for display
          </h3>
        </div>
      ) : (
        <div className="w-full overflow-scroll">
          <table>
            <thead>
              <tr className="text-base font-bold bg-slate-400 text-slate-700">
                <td>Date Created</td>
                <td>Username</td>
                <td>Email</td>
                <td>Admin</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.roles.admin ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </td>
                    <td>
                      <Link to={`/dashboard/users/delete-user/${user._id}`}>
                        <FaTrashAlt className="text-red-400 duration-300 hover:scale-90 hover:opacity-85" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default Users;
