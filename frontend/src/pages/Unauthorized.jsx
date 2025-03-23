import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate('/dashboard');
  return (
    <div className="flex flex-col gap-6 justify-center items-center w-full h-full flex-1">
      <FaExclamationTriangle className="text-5xl text-red-700" />
      <h1 className="text-3xl">
        You are unauthorized to visit this page.
        <button onClick={goBack}>Go Back</button>
      </h1>
    </div>
  );
};
export default Unauthorized;
