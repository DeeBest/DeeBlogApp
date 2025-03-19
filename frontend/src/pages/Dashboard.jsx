import { useContext, useState } from 'react';
import AuthContext from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [username, setUsername] = useState(auth?.username);
  const [email, setEmail] = useState(auth?.email);
  const [password, setPassword] = useState(auth?.password);

  const navigate = useNavigate();

  const handleLogout = async () => {
    setAuth({});
    navigate('/');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedDetails = {
      username,
      email,
      password,
    };

    console.log(updatedDetails);
  };

  return (
    <div className="flex-1 h-full flex">
      <div className="w-1/4 flex flex-col p-2 gap-3">
        <div className="w-full flex justify-between items-center">
          <div className="w-10 h-10 rounded-full bg-slate-200 p-1 flex justify-center items-center font-semibold text-slate-700">
            {auth?.username.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex gap-1 items-center">
            <h3 className="font-semibold">Profile</h3>
            <p className="text-[10px] bg-slate-500 p-[1px] rounded">USER</p>
          </div>
        </div>
        <button
          className="bg-slate-400 p-1 rounded font-semibold shadow-sm hover:opacity-80 duration-300"
          onClick={handleLogout}
        >
          Sign out
        </button>
      </div>
      <div className="w-3/4 flex-1 flex flex-col justify-center items-center gap-2">
        <h3>Profile</h3>
        <div className="w-14 h-14 rounded-full bg-slate-200 p-1 flex justify-center items-center font-semibold text-slate-700">
          {auth?.username.slice(0, 2).toUpperCase()}
        </div>
        <form className="flex flex-col gap-2">
          <input
            className="bg-slate-400 p-2 w-full rounded-sm"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value.trim().toLowerCase())}
          />
          <input
            className="bg-slate-400 p-2 w-full rounded-sm"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          <input
            className="bg-slate-400 p-2 w-full rounded-sm"
            type="password"
            required
            value={password}
            onChange={(e) => setUsername(e.target.value.trim())}
          />
          <button onClick={handleUpdate}>Update Profile</button>
        </form>
        <div className="flex justify-between items-center w-full">
          <button>Delete Account</button>
          <button onClick={handleLogout}>Sign Out</button>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
