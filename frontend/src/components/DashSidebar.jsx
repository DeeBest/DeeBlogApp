import useTheme from '../hooks/useTheme';
import useGlobal from '../hooks/useGlobal';
import useAuth from '../hooks/useAuth';
import { FaUser, FaArrowRight } from 'react-icons/fa';
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
  );
};
export default DashSidebar;
