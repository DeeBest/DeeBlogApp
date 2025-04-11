import { FaExclamationTriangle } from 'react-icons/fa';
import useGlobal from '../hooks/useGlobal';
import PostCard from '../components/PostCard';
import CallToAction from '../components/CallToAction';

const AllPosts = () => {
  const { posts } = useGlobal();
  return (
    <section className="flex items-center justify-center w-full animate-slideFromLeft">
      {posts.length <= 0 || !posts ? (
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <FaExclamationTriangle className="text-3xl text-red-500" />
          <h3 className="text-lg font-semibold">
            No posts available for display
          </h3>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full gap-10">
          <h1 className="font-serif text-2xl font-semibold">All Posts</h1>
          <div className="flex flex-wrap items-center justify-center w-full gap-5">
            {posts.map((post) => (
              <PostCard key={post._id} recentPost={post} />
            ))}
          </div>
          <CallToAction />
        </div>
      )}
    </section>
  );
};
export default AllPosts;
