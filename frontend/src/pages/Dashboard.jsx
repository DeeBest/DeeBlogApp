import { useContext, useState } from 'react';
import AuthContext from '../context/authContext';
import ThemeContext from '../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

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
    <div className="flex-1 w-full h-full flex flex-col sm:flex-row sm:text-center gap-3 p-2 mx-auto">
      <div
        className={`sm:w-1/4 w-full flex flex-col p-2 justify-between gap-3 ${
          theme === 'light' ? 'bg-indigo-100' : 'dark:bg-slate-700'
        } rounded-md shadow-sm`}
      >
        <div className="w-full flex justify-between items-center">
          <div className="w-10 h-10 rounded-full bg-slate-400 p-1 hidden sm:flex justify-center items-center font-semibold text-slate-700 mr-1">
            {auth?.username.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 flex gap-1 items-center justify-between">
            <h3 className="font-semibold">Profile</h3>
            <p
              className={`text-[10px] font-semibold bg-slate-400 text-slate-700
              } p-[1px] rounded`}
            >
              USER
            </p>
          </div>
        </div>
        <button
          className="sm:w-24 w-1/3 bg-slate-400 p-1 rounded font-semibold shadow-sm hover:opacity-80 duration-300 self-center"
          onClick={handleLogout}
        >
          Sign out
        </button>
      </div>
      <div
        className={`${
          theme === 'light' ? 'bg-slate-200' : 'bg-slate-800'
        } sm:w-3/4 w-full flex-1 flex flex-col justify-center items-center gap-2 p-2 rounded shadow-sm`}
      >
        <h3 className="text-xl sm:text-2xl font-semibold">{auth?.username}</h3>
        <div
          className={`${
            theme === 'light'
              ? 'bg-slate-700 text-slate-200'
              : 'bg-slate-200 text-slate-700'
          } w-14 h-14 rounded-full p-1 flex justify-center items-center font-semibold`}
        >
          {auth?.username.slice(0, 2).toUpperCase()}
        </div>
        <form className="flex-1 w-full sm:max-w-[450px] flex flex-col gap-2 p-2 rounded-md">
          <input
            className={`flex-1 ${
              theme === 'light' ? 'bg-indigo-200' : 'bg-slate-700'
            } text-sm p-2 w-full rounded-md font-semibold mt-4`}
            minLength={4}
            maxLength={24}
            placeholder="Username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value.trim().toLowerCase())}
          />
          <input
            className={`flex-1 ${
              theme === 'light' ? 'bg-indigo-200' : 'bg-slate-700'
            } text-sm p-2 w-full rounded-md font-semibold`}
            minLength={4}
            maxLength={100}
            placeholder="Username"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          <input
            className={`flex-1 ${
              theme === 'light' ? 'bg-indigo-200' : 'bg-slate-700'
            } text-sm p-2 w-full rounded-md font-semibold`}
            minLength={4}
            maxLength={100}
            placeholder="Username"
            type="password"
            required
            value={password}
            onChange={(e) => setUsername(e.target.value.trim())}
          />
          <button
            className="border-green-600 border p-1 rounded-lg w-1/2 self-center hover:opacity-85 duration-300
            mt-4"
            onClick={handleUpdate}
          >
            Update Profile
          </button>
        </form>
        <div className="flex-1 min-w-[300px] max-w-[450px] flex justify-between items-center mt-3 text-red-600 font-medium">
          <button className={``}>Delete Account</button>
          <button onClick={handleLogout}>Sign Out</button>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
