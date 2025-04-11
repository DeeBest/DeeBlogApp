import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Logo from './Logo';

import placeholderImg from '../assets/placeholder-img.png';

import useAuth from '../hooks/useAuth';
import useGlobal from '../hooks/useGlobal';
import useTheme from '../hooks/useTheme';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { auth } = useAuth();
  const { toggleTheme, theme } = useTheme();
  const { linkClass, handleLogout } = useGlobal();
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const toggleMobileMenu = () => {
    const toggleMobileMenuBtn = document.getElementById(
      'toggle-mobile-menu-btn'
    );
    toggleMobileMenuBtn.classList.toggle(
      'animate-rotate-mobile-nav-toggle-btn'
    );

    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <header
      className={`sticky top-0 z-[100000] min-w-full ${
        theme === 'dark' ? 'bg-slate-800' : 'bg-slate-300'
      } shadow-sm shadow-gray-400`}
    >
      <section className="relative flex items-center justify-between max-w-4xl gap-3 p-4 mx-auto">
        <Logo />
        <form onSubmit={handleSearch}>
          <label htmlFor="posts-search-input" className="hidden">
            Search Posts
          </label>
          <input
            id="posts-search-input"
            type="text"
            minLength={5}
            maxLength={100}
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[100px] md:w-[200px] rounded-md bg-slate-50 text-slate-500 dark:bg-slate-500 dark:text-slate-50 p-1 font-semibold border-none outline-none shadow-md focus:outline-[1px] focus:outline-cyan-500"
          />
        </form>
        <button
          onClick={toggleTheme}
          className="flex justify-center items-center bg-slate-50 text-slate-500 dark:bg-slate-500 dark:text-slate-50 p-1 w-8 h-8 rounded-full text-xl border-[1px] border-cyan-500 hover:animate-pulse"
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
        <nav className="flex items-center justify-between gap-3 ml-4">
          <div className="items-center justify-end flex-1 hidden gap-3 p-1 ml-auto sm:flex">
            <NavLink className={linkClass} to="/">
              Home
            </NavLink>
            <NavLink className={linkClass} to="/posts">
              Posts
            </NavLink>

            {auth?.accessToken && (
              <NavLink className={linkClass} to="/dashboard/profile">
                Dashboard
              </NavLink>
            )}

            {auth?.accessToken ? (
              <button
                onClick={handleLogout}
                className="w-20 duration-300 hover:opacity-85"
              >
                Sign Out
              </button>
            ) : (
              <NavLink className={linkClass} to="/sign-in">
                Sign In
              </NavLink>
            )}
          </div>
          <div
            id="toggle-mobile-menu-btn"
            className="inline-block ml-auto sm:hidden"
          >
            {isMobileMenuOpen ? (
              <button
                className="bg-slate-800 text-slate-100 p-2 rounded-md dark:bg-slate-100 dark:text-slate-800 font-extrabold text-xs sm:text-2xl hover:scale-95 border-[1px] border-cyan-500 animate-rotate-close-mobile-nav-toggle-btn"
                onClick={toggleMobileMenu}
              >
                <FaTimes />
              </button>
            ) : (
              <button
                className="bg-slate-800 text-slate-100 p-2 rounded-md dark:bg-slate-100 dark:text-slate-800 font-extrabold text-xs sm:text-2xl hover:scale-95 border-[1px] border-cyan-500 animate-rotate-open-mobile-nav-toggle-btn"
                onClick={toggleMobileMenu}
              >
                <FaBars />
              </button>
            )}
          </div>
        </nav>
        <nav
          id="mobile-menu"
          className={`
            ${
              isMobileMenuOpen
                ? 'h-screen z-20 top-[75px] p-4'
                : 'h-0 -z-10 top-[80px] p-0'
            } w-full flex flex-col items-center justify-start gap-4 absolute left-0 ${
            theme === 'dark' ? 'bg-slate-800' : 'bg-slate-300'
          } overflow-hidden sm:hidden transition-[height, z-index, top, padding] duration-300 ease-in-out
          `}
          onClick={toggleMobileMenu}
        >
          <div className="flex flex-col items-center min-w-full gap-2 overflow-hidden">
            <NavLink className={linkClass} to="/">
              Home
            </NavLink>
            <NavLink className={linkClass} to="/posts">
              Posts
            </NavLink>

            {auth?.accessToken && (
              <NavLink className={linkClass} to="/dashboard/profile">
                Dashboard
              </NavLink>
            )}

            {auth?.accessToken ? (
              <button
                onClick={handleLogout}
                className="w-20 duration-300 hover:opacity-85"
              >
                Sign Out
              </button>
            ) : (
              <NavLink className={linkClass} to="/sign-in">
                Sign In
              </NavLink>
            )}
          </div>
        </nav>
      </section>
    </header>
  );
};
export default Header;
