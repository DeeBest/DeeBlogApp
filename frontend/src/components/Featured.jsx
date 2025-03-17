import FeaturedPosts from './FeaturedPosts';
import FeaturedUsers from './FeaturedUsers';

const Featured = () => {
  return (
    <div className="bg-indigo-50 rounded-md w-full p-2 shadow-md grid grid-cols-3 grid-rows-3 gap-3">
      <FeaturedUsers />
      <FeaturedPosts />
      <div className="bg-red-300 col-span-3 rounded-md">
        <div className="w-20 h-20 rounded-full bg-white border-t-4 border-t-green-500 border-l-4 border-l-green-500"></div>
      </div>
    </div>
  );
};
export default Featured;
