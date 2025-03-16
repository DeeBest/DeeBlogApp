import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="w-full flex flex-col items-start px-3 py-6 gap-5 border-b-2 border-b-indigo-400 rounded-lg shadow-sm shadow-gray-400 dark:shadow-white">
      <h1 className="mb-8 text-4xl font-extrabold text-rose-400 italic">
        Welcome to the <span className="text-slate-400">Dee</span>BlogApp
      </h1>
      <p className="text-2xl text-indigo-400">
        This is your one stop for all the{' '}
        <span className="text-rose-400 font-semibold">MERN</span> (Mongo,
        ExpressJS, React and NodeJS) Stack topics.
      </p>
      <Link
        to="/posts"
        className="text-xl italic border-b-[1px] border-b-rose-400"
      >
        View All Posts
      </Link>
    </div>
  );
};
export default Hero;
