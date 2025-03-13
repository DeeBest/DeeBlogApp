import './errorPage.css';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <main id="error-page">
      <FaExclamationTriangle id="error-icon" />
      <h2>404 Page Not Found!</h2>
      <p>
        Go back <Link to="/">Home</Link>.
      </p>
    </main>
  );
};
export default ErrorPage;
