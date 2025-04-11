import { HiOutlineExclamationCircle } from 'react-icons/hi';
import toggleOverlay from '../utils/toggleOverlay';

const Overlay = ({ paraContent, handleFunction }) => {
  return (
    <div className="overlay z-9 absolute top-[-100%] left-0 h-full w-full bg-[#000000ca] flex justify-center items-center transition-all ease-in-out inset-0 -translate-y-full duration-500 rounded-md">
      <div className="flex flex-col gap-3 p-2 bg-white rounded-lg text-slate-700">
        <HiOutlineExclamationCircle className="self-center text-5xl font-bold" />
        <p className="w-full text-center">{paraContent}</p>
        <button
          className="p-1 mt-3 font-bold duration-300 bg-red-500 rounded-md hover:opacity-80 hover:scale-95"
          onClick={handleFunction}
        >
          Yes, I am sure
        </button>
        <button
          className="p-1 font-bold duration-300 bg-green-500 rounded-md hover:opacity-80 hover:scale-95"
          onClick={toggleOverlay}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default Overlay;
