import { useEffect, useState } from 'react';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import PostCard from './PostCard';

const RecentArticles = () => {
  const [recentPosts, setRecentPosts] = useState(null);
  const customAxios = useAxiosInterceptor();

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await customAxios.get('/posts?limit=3');
        setRecentPosts(res.data.posts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
    <section className="flex flex-col items-center w-full gap-5">
      <h1>Recent Articles</h1>
      <div className="flex flex-wrap items-center justify-center w-full gap-3">
        {recentPosts &&
          recentPosts.map((recentPost) => (
            <PostCard key={recentPost._id} recentPost={recentPost} />
          ))}
      </div>
    </section>
  );
};

export default RecentArticles;
