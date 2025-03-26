import { useState, useEffect } from 'react';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import { FaExclamationTriangle, FaPen, FaTrash } from 'react-icons/fa';
import useTheme from '../hooks/useTheme';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);

  const customAxios = useAxiosInterceptor();
  const { theme } = useTheme();

  const fetchPosts = async () => {
    try {
      const res = await customAxios.get('/posts');
      setPosts(res.data.posts);

      if (res.data.posts.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleShowMore = async () => {
    const startIndex = posts.length;

    try {
      const res = await customAxios.get(`/posts?startIndex=${startIndex}`);
      setPosts((prevPosts) => [...prevPosts, ...res.data.posts]);

      if (res.data.posts.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`${
        theme === 'light' ? 'bg-slate-200' : 'bg-slate-800'
      } sm:w-3/4 w-full flex-1 flex flex-col items-center gap-2 p-2 rounded shadow-sm table-auto overflow-x-scroll`}
    >
      <h1 className="text-4xl font-bold">Posts</h1>
      {posts.length <= 0 || !posts ? (
        <div className="w-full flex flex-col justify-center items-center gap-5">
          <FaExclamationTriangle className="text-red-500 text-3xl" />
          <h3 className="text-lg font-semibold">
            No posts available for display
          </h3>
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr className="dark:bg-slate-400 dark:text-slate-700 bg-slate-700 text-slate-400">
                <td>Date Updated</td>
                <td>Title</td>
                <td>Category</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                return (
                  <tr key={post._id}>
                    <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                    <td>{post.slug}</td>
                    <td>{post.postCategory}</td>
                    <td>
                      <div>
                        <FaPen className="edit-icon table-icon" />
                        <FaTrash className="delete-icon table-icon" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="border-2 border-rose-500 p-1 rounded-md hover:opacity-75 duration-300"
            >
              Show More
            </button>
          )}
        </>
      )}
    </div>
  );
};
export default Posts;
