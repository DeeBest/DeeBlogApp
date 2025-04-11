import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full h-full gap-6 animate-slideFromLeft">
      <FaExclamationTriangle className="text-5xl text-red-700" />
      <h1 className="text-3xl">
        You are unauthorized to visit this page.{' '}
        <button onClick={goBack} className="italic text-red-400">
          Go Back
        </button>
      </h1>
    </div>
  );
};
export default Unauthorized;
