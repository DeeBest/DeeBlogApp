import { useState, useEffect } from 'react';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import useGlobal from '../hooks/useGlobal';
import { FaCheck, FaTimes, FaTrashAlt } from 'react-icons/fa';
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
      <h1>Users</h1>
      <div className="w-full overflow-scroll">
        <table>
          <thead>
            <tr className="text-base font-bold bg-slate-400 text-slate-700">
              <td>Date Updated</td>
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
                  <td>{new Date(user.updatedAt).toLocaleDateString()}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.roles.admin ? <FaCheck /> : <FaTimes />}</td>
                  <td>
                    <Link to={`/dashboard/users/delete-user/${user._id}`}>
                      <FaTrashAlt className="text-red-400 hover:scale-90 hover:opacity-85 duration-300" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Users;
