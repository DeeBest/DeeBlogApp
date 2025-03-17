import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex justify-center items-center">
        <div className="w-16 h-16 flex justify-center items-center bg-rose-500 rounded-full border-[1px] border-cyan-500"></div>
        <h1 className="text-xl text-cyan-200 md:text-2xl font-extrabold italic z-10 -ml-14 p-1 bg-gradient-to-l from-rose-300 via-rose-400 to-rose-500 rounded-xl">
          DeeBlogApp
        </h1>
      </div>
    </Link>
  );
};
export default Logo;
