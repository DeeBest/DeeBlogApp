import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaExclamationTriangle } from 'react-icons/fa';

const FeaturedUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/users');
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const displayedUsers = users.length ? users.slice(0, 5) : [];

  return (
    <section className="bg-indigo-200 p-1 flex flex-col gap-2 items-center rounded-md row-span-2">
      <h1 className="text-2xl text-slate-400 font-semibold">Featured Users</h1>
      <hr className="w-1/3 h-[4px] bg-rose-400 rounded-md" />
      {displayedUsers.length > 0 ? (
        <div className="flex flex-col gap-1 w-full mt-4">
          {displayedUsers.map((user) => {
            return (
              <section
                key={user._id}
                className="bg-indigo-50 p-1 rounded-md flex items-center justify-between hover:scale-95 duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center p-1">
                  <span className="text-xl text-rose-400 font-bold hover:rotate-90 duration-300">
                    {user.username.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <Link
                  to={`/users/user-profile/${user._id}`}
                  className="text-md font-semibold text-slate-400 border-b-2 border-b-rose-400 rounded-b-sm"
                >
                  {user.username}
                </Link>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center flex-1 gap-2 text-medium font-bold w-full">
          <FaExclamationTriangle className="text-orange-600 text-4xl" />
          <h1 className="text-slate-400">No users to display</h1>
        </div>
      )}
    </section>
  );
};
export default FeaturedUsers;
