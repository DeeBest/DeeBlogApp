import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import { FaExclamationTriangle, FaPen, FaTrash } from 'react-icons/fa';
import useTheme from '../hooks/useTheme';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useGlobal from '../hooks/useGlobal';

const Posts = () => {
  const customAxios = useAxiosInterceptor();
  const { theme } = useTheme();
  const { auth } = useAuth();
  const { posts, setPosts, showMore, setShowMore } = useGlobal();

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
      } flex flex-col flex-1 w-full h-[calc(100vh-250px)] gap-4 p-2 rounded-md overflow-hidden animate-slideFromTop`}
    >
      <div className="flex items-center justify-between w-full gap-2">
        <h1 className="text-4xl font-bold">Posts</h1>
        {(auth?.currentUser?.roles?.includes(2001) ||
          auth?.currentUser?.roles?.includes(1954)) && (
          <Link to="/dashboard/posts/create-post">
            <button className="p-2 duration-300 border-2 rounded-md border-rose-400 hover:opacity-85">
              Create Post
            </button>
          </Link>
        )}
      </div>
      {posts.length <= 0 || !posts ? (
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <FaExclamationTriangle className="text-3xl text-red-500" />
          <h3 className="text-lg font-semibold">
            No posts available for display
          </h3>
        </div>
      ) : (
        <>
          <div className="overflow-y-auto">
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr className="dark:bg-slate-400 dark:text-slate-700 bg-slate-700 text-slate-400">
                    <td>Date Updated</td>
                    <td>Title</td>
                    <td>Category</td>
                    {(auth?.currentUser?.roles.includes(2001) ||
                      auth?.currentUser?.roles.includes(1954)) && (
                      <td>Actions</td>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => {
                    return (
                      <tr key={post._id}>
                        <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                        <td>
                          <Link
                            to={`/post/${post.slug}`}
                            className="underline duration-300 decoration-rose-400 hover:decoration-transparent"
                          >
                            {post.slug}
                          </Link>
                        </td>
                        <td>{post.postCategory}</td>
                        {(auth?.currentUser?.roles.includes(2001) ||
                          auth?.currentUser?.roles.includes(1954)) && (
                          <td>
                            <div>
                              <Link
                                to={`/dashboard/posts/edit-post/${post._id}`}
                              >
                                <FaPen className="text-indigo-400" />
                              </Link>
                              <Link
                                to={`/dashboard/posts/delete-post/${post._id}`}
                              >
                                <FaTrash className="delete-icon table-icon" />
                              </Link>
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="p-1 duration-300 border-2 rounded-md border-rose-500 hover:opacity-75"
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
