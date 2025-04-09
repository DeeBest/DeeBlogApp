import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <section className="w-full flex flex-col gap-3 justify-center items-center text-xl">
      <FaExclamationTriangle className="text-6xl text-red-500" />
      <h2>404 Page Not Found!</h2>
      <p>
        Go back{' '}
        <Link
          className="italic text-rose-400 hover:text-slate-500 duration-300"
          to="/"
        >
          Home
        </Link>
        .
      </p>
    </section>
  );
};
export default ErrorPage;
