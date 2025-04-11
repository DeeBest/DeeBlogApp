import { Link } from 'react-router-dom';
import placeholderImg from '../assets/placeholder-img.png';

const CallToAction = () => {
  return (
    <div className="flex flex-col w-full p-4 mx-auto my-10 border sm:flex-row border-rose-400 rounded-tl-3xl rounded-br-3xl">
      <div className="flex flex-col items-center flex-1 gap-1">
        <h3>Learn All the secrets of mern stack.</h3>
        <p className="text-sm italic">ready to master the mern stack?</p>
        <Link to="/dashboard/posts">
          <button className="w-full p-1 mt-3 text-base font-semibold text-white duration-300 rounded-tr-md rounded-bl-md bg-rose-400 hover:scale-95 hover:opacity-85">
            Learn More
          </button>
        </Link>
      </div>
      <div className="flex items-center justify-center flex-1 p-3">
        <img
          src={placeholderImg}
          alt="placeholderImg"
          className="object-cover mx-auto"
        />
      </div>
    </div>
  );
};
export default CallToAction;
