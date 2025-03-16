import FeaturedPosts from './FeaturedPosts';
import FeaturedUsers from './FeaturedUsers';

const Featured = () => {
  return (
    <div className="bg-indigo-100 rounded-md w-full p-2 shadow-md grid grid-cols-3 gap-3">
      <FeaturedUsers />
      <FeaturedPosts />
    </div>
  );
};
export default Featured;
