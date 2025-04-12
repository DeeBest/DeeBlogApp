import { Link } from 'react-router-dom';
import callToActionImg from '../assets/callToActionImg.jpg';

const CallToAction = () => {
  return (
    <div className="flex flex-col w-full gap-5 p-4 mx-auto my-10 sm:flex-row-reverse">
      <div className="flex flex-col items-center flex-1 gap-1 sm:justify-center">
        <h3 className="font-serif text-2xl text-center">
          Learn All the secrets of mern stack.
        </h3>
        <p className="text-sm italic">ready to master the mern stack?</p>
        <Link to="/dashboard/posts">
          <button className="w-full p-1 text-base font-semibold text-white duration-300 rounded-tr-md rounded-bl-md bg-rose-400 hover:scale-95 hover:opacity-85">
            Learn More
          </button>
        </Link>
      </div>
      <div className="flex items-center justify-center flex-1 max-h-[200px] sm:mt-5 overflow-hidden rounded-md">
        <img
          src={callToActionImg}
          alt="placeholderImg"
          className="object-contain"
        />
      </div>
    </div>
  );
};
export default CallToAction;
