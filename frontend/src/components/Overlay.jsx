import { HiOutlineExclamationCircle } from 'react-icons/hi';
import toggleOverlay from '../utils/toggleOverlay';

const Overlay = ({ handleDeleteUser }) => {
  return (
    <div className="overlay z-9 absolute top-[-100%] left-0 h-full w-full bg-[#000000ca] flex justify-center items-center transition-all -translate-y-full duration-500 rounded-md">
      <div className="bg-white flex flex-col gap-3 p-2 text-slate-700 rounded-lg">
        <HiOutlineExclamationCircle className="text-5xl self-center font-bold" />
        <p>are you sure you want delete your account?</p>
        <button
          className="bg-red-500 p-1 rounded-md mt-3 font-bold hover:opacity-80 hover:scale-95 duration-300"
          onClick={handleDeleteUser}
        >
          Yes, I am sure
        </button>
        <button
          className="bg-green-500 p-1 rounded-md font-bold hover:opacity-80 hover:scale-95 duration-300"
          onClick={toggleOverlay}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default Overlay;
