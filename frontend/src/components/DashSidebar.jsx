import useTheme from '../hooks/useTheme';
import useGlobal from '../hooks/useGlobal';
import useAuth from '../hooks/useAuth';
import { FaUser, FaArrowRight, FaUsers, FaComments } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

const DashSidebar = () => {
  const { theme } = useTheme();
  const { linkClass, handleLogout } = useGlobal();
  const { auth } = useAuth();

  return (
    <div
      className={`${
        theme === 'light' ? 'bg-indigo-100' : 'bg-slate-700'
      } sm:w-1/4 w-full sm:min-h-full h-auto flex flex-col p-2 gap-3 rounded-md shadow-sm`}
    >
      <NavLink to="/dashboard/profile" className={linkClass}>
        <div className="flex items-center gap-2 p-1 font-semibold">
          <FaUser className="text-xl" />
          <div className="flex items-center justify-between flex-1 gap-1">
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
      <NavLink to="/dashboard/posts" className={linkClass}>
        <div className="flex items-center gap-2 p-1 font-semibold">
          <HiDocumentText className="text-xl" />
          <p>Posts</p>
        </div>
      </NavLink>
      {auth.currentUser.roles.includes(2001) && (
        <>
          <NavLink to="/dashboard/users" className={linkClass}>
            <div className="flex items-center gap-2 p-1 font-semibold">
              <FaUsers className="text-xl" />
              <p>Users</p>
            </div>
          </NavLink>
          <NavLink to="/dashboard/comments" className={linkClass}>
            <div className="flex items-center gap-2 p-1 font-semibold">
              <FaComments className="text-xl" />
              <p>Comments</p>
            </div>
          </NavLink>
        </>
      )}
      <button
        className="flex items-center self-center w-1/3 gap-2 p-1 font-semibold duration-300 rounded shadow-sm sm:w-full max-w-32 hover:opacity-80"
        onClick={handleLogout}
      >
        <FaArrowRight />
        Sign out
      </button>
    </div>
  );
};
export default DashSidebar;
