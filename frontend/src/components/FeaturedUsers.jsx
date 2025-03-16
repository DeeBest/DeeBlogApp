import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
  return (
    <section className="bg-indigo-200 p-1 flex flex-col gap-2 items-center rounded-md">
      <h1 className="text-xl text-rose-400 font-semibold">Featured Users</h1>
      <hr className="w-1/3 h-[4px] bg-slate-500 rounded-md" />
      <div className="flex flex-col gap-1 w-full mt-4">
        {users.map((user) => {
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
                className="text-md font-semibold text-slate-500 border-b-2 border-b-red-400 rounded-b-sm"
              >
                {user.username}
              </Link>
            </section>
          );
        })}
      </div>
    </section>
  );
};
export default FeaturedUsers;
