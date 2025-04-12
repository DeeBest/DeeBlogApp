import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="flex flex-col w-full gap-5 py-6 mt-10 rounded-lg sm:flex-row-reverse">
      <div className="flex items-center justify-center flex-1">
        <h1 className="mb-8 font-serif text-4xl italic font-extrabold text-center text-rose-400">
          Welcome To <span className="text-slate-400">D</span>ee
          <span className="text-slate-400">B</span>log
          <span className="text-slate-400">A</span>pp
        </h1>
      </div>
      <div className="flex flex-col items-center flex-1 gap-5">
        <p className="text-2xl text-start text-slate-400">
          This is your one stop for all the{' '}
          <span className="font-semibold text-rose-400">MERN</span> (Mongo,
          ExpressJS, React and NodeJS) Stack topics.
        </p>
        <Link
          to="/posts"
          className="text-lg hover:text-rose-400 hover:border-b-slate-400 duration-300 ease-in-out text-center italic border-b-[1px] border-b-rose-400 sm:self-end"
        >
          View All Posts
        </Link>
      </div>
    </div>
  );
};
export default Hero;
