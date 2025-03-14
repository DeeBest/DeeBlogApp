import './header.css';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 min-w-full bg-slate-200 dark:bg-slate-950">
      <section className="max-w-4xl p-4 flex justify-between items-center mx-auto">
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 flex justify-center items-center bg-rose-400 rounded-full"></div>
          <h1 className="text-2xl font-extrabold italic z-10 -ml-16">
            DeeBlogApp
          </h1>
        </div>
        <nav className="flex items-center p-4 gap-20">
          <ul className="hidden gap-5 sm:flex">
            <li>
              <Link className="hover:opacity-70" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:opacity-70" to="/posts">
                Posts
              </Link>
            </li>
          </ul>
          <button className="bg-slate-800 text-slate-100 p-2 rounded-md dark:bg-slate-100 dark:text-slate-800 font-bold transition-transform hover:scale-95">
            Sign In
          </button>
          <button className="inline-block sm:hidden bg-slate-800 text-slate-100 p-2 rounded-md dark:bg-slate-100 dark:text-slate-800 font-extrabold text-2xl hover:scale-95 transition-transform">
            <FaBars />
          </button>
        </nav>
      </section>
    </header>
  );
};
export default Header;
