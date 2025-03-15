import './header.css';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-10 min-w-full bg-slate-200 dark:bg-slate-950">
      <section className="max-w-4xl p-4 flex items-center mx-auto gap-10 relative">
        <Link to="/">
          <div className="flex justify-center items-center">
            <div className="w-16 h-16 flex justify-center items-center bg-rose-400 rounded-full"></div>
            <h1 className="text-2xl font-extrabold italic z-10 -ml-16">
              DeeBlogApp
            </h1>
          </div>
        </Link>
        <nav className="flex-1 gap-5 flex justify-between items-center p-4">
          <div className="flex-1 hidden justify-center items-center gap-4 sm:flex">
            <Link className="hover:opacity-70" to="/">
              Home
            </Link>
            <Link className="hover:opacity-70" to="/posts">
              Posts
            </Link>
            <button className="bg-slate-800 text-slate-100 p-2 rounded-md dark:bg-slate-100 dark:text-slate-800 font-bold transition-transform hover:scale-95 ml-auto">
              Sign In
            </button>
          </div>
          <button
            className="inline-block sm:hidden bg-slate-800 text-slate-100 p-2 rounded-md dark:bg-slate-100 dark:text-slate-800 font-extrabold text-2xl hover:scale-95 transition-transform ml-auto"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>
        <nav
          id="mobile-menu"
          className={
            isMobileMenuOpen
              ? 'flex flex-col p-4 absolute top-[100px] left-0 w-full bg-rose-400 items-center justify-start gap-4 overflow-hidden h-[80vh] opacity-1 sm:hidden'
              : 'hidden flex-col p-4 absolute top-[100px] left-0 w-full bg-rose-400 items-center justify-start gap-4 overflow-hidden h-0 opacity-0 sm:hidden'
          }
        >
          <div className="flex items-center gap-2 flex-col min-w-full overflow-hidden">
            <Link
              className="bg-yellow-700 min-w-full hover:opacity-70 p-2 text-center"
              to="/"
            >
              Home
            </Link>
            <Link
              className="bg-yellow-700 w-full hover:opacity-70 p-2 text-center"
              to="/posts"
            >
              Posts
            </Link>
            <button className="bg-slate-800 text-slate-100 p-2 rounded-md dark:bg-slate-100 dark:text-slate-800 font-bold transition-transform hover:scale-95">
              Sign In
            </button>
          </div>
        </nav>
      </section>
    </header>
  );
};
export default Header;
