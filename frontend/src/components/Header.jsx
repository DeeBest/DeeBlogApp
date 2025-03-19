import { Link } from 'react-router-dom';
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa';
import { useContext, useState } from 'react';
import Logo from './Logo';
import AuthContext from '../context/authContext';
import placeholderImg from '../assets/placeholder-img.png';
import { Context } from '../context/context';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { auth } = useContext(AuthContext);
  const { toggleTheme } = useContext(Context);

  const toggleMobileMenu = () => {
    const toggleMobileMenuBtn = document.getElementById(
      'toggle-mobile-menu-btn'
    );
    toggleMobileMenuBtn.classList.toggle(
      'animate-rotate-mobile-nav-toggle-btn'
    );

    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    toggleTheme();
  };

  return (
    <header
      className={`sticky top-0 z-10 min-w-full ${
        isDarkMode ? 'bg-slate-800' : 'bg-slate-300'
      } shadow-sm shadow-gray-400`}
    >
      <section className="max-w-4xl p-4 flex justify-between items-center gap-3 mx-auto relative">
        <Logo />
        <label htmlFor="posts-search-input" className="hidden">
          Search Posts
        </label>
        <input
          id="posts-search-input"
          type="text"
          minLength={5}
          maxLength={100}
          placeholder="Search"
          className="w-14 sm:flex-1 rounded-lg bg-slate-50 text-slate-500 dark:bg-slate-500 dark:text-slate-50 p-1 font-semibold border-none outline-none shadow-lg focus:outline-[1px] focus:outline-cyan-500"
        />
        <button
          onClick={toggleDarkMode}
          className="flex justify-center items-center bg-slate-50 text-slate-500 dark:bg-slate-500 dark:text-slate-50 p-1 w-8 h-8 rounded-full text-xl border-[1px] border-cyan-500 hover:animate-pulse"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
        <nav className="gap-3 sm:gap-5 flex justify-between items-center p-4">
          <div className="flex-1 hidden justify-center items-center gap-4 sm:flex ml-auto">
            <Link className="hover:opacity-70 duration-300" to="/">
              Home
            </Link>

            <Link className="hover:opacity-70 duration-300" to="/posts">
              Posts
            </Link>

            {auth?.username ? (
              <div className="flex justify-center items-center">
                <Link to="/profile hover:opacity-70 duration-300">
                  {auth.username}
                </Link>
              </div>
            ) : (
              <Link className="hover:opacity-70 duration-300" to="/sign-in">
                Sign In
              </Link>
            )}
          </div>
          <div
            id="toggle-mobile-menu-btn"
            className="ml-auto inline-block sm:hidden"
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
          className={
            isMobileMenuOpen
              ? 'w-full h-screen z-50 flex flex-col items-center justify-start gap-4 p-4 absolute top-[90px] left-0 bg-indigo-300 dark:bg-slate-700 overflow-hidden sm:hidden animate-open-mobile-nav'
              : 'w-full h-0 -z-10 flex flex-col items-center justify-start gap-4 absolute top-[80px] left-0 bg-indigo-300 dark:bg-slate-700 overflow-hidden sm:hidden animate-close-mobile-nav'
          }
          onClick={toggleMobileMenu}
        >
          <div className="flex items-center gap-2 flex-col min-w-full overflow-hidden">
            <Link
              className="w-full hover:bg-slate-200 dark:hover:bg-slate-600 duration-300 p-2 text-center"
              to="/"
            >
              Home
            </Link>
            <Link
              className="w-full hover:bg-slate-200 dark:hover:bg-slate-600 duration-300 p-2 text-center"
              to="/posts"
            >
              Posts
            </Link>
            <Link
              className="w-full hover:bg-slate-200 dark:hover:bg-slate-600 duration-300 p-2 text-center"
              to="/sign-in"
            >
              Sign In
            </Link>
          </div>
        </nav>
      </section>
    </header>
  );
};
export default Header;
