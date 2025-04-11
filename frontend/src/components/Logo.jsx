import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center justify-center">
        <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 flex justify-center items-center bg-rose-500 rounded-full border-[1px] border-cyan-500"></div>
        <h1 className="p-1 -ml-10 text-xs italic font-extrabold text-slate-50 dark:text-slate-700 sm:text-xl md:text-2xl md:-ml-14 bg-gradient-to-l from-rose-300 via-rose-400 to-rose-500 rounded-xl">
          DeeBlogApp
        </h1>
      </div>
    </Link>
  );
};
export default Logo;
