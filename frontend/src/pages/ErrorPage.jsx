import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full gap-3 text-xl animate-slideFromLeft">
      <FaExclamationTriangle className="text-6xl text-red-500" />
      <h2>404 Page Not Found!</h2>
      <p>
        Go back{' '}
        <Link
          className="italic duration-300 text-rose-400 hover:text-slate-500"
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
