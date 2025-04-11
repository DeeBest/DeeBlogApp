import { FaArrowUp, FaComments, FaUsers } from 'react-icons/fa';
import useGlobal from '../hooks/useGlobal';
import useTheme from '../hooks/useTheme';
import { HiDocumentText } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const DashStats = () => {
  const {
    users,
    comments,
    posts,
    totalComments,
    totalPosts,
    totalUsers,
    lastMonthComments,
    lastMonthPosts,
    lastMonthUsers,
  } = useGlobal();
  const { theme } = useTheme();

  return (
    <section
      className={`${
        theme === 'light' ? 'bg-slate-200' : 'bg-slate-800'
      } flex flex-col items-center justify-center w-full gap-5 rounded-md p-3 animate-slideFromTop`}
    >
      <div className="flex flex-wrap w-full gap-2 p-2 rounded-md shadow-sm">
        <div className="flex flex-col flex-1 p-1 shadow-md rounded-md min-w-[150px]">
          <div className="flex justify-between w-full gap-2">
            <div className="flex flex-col items-center justify-center">
              <h4>Total Users</h4>
              <span>{totalUsers}</span>
            </div>
            <FaUsers className="p-1 text-3xl text-white bg-green-700 rounded-full" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-green-500">
              {lastMonthUsers > 0 && <FaArrowUp />}
              <span>{lastMonthUsers}</span>
            </div>
            <p>Last Month</p>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-1 shadow-md rounded-md min-w-[150px]">
          <div className="flex justify-between w-full gap-2">
            <div className="flex flex-col items-center justify-center">
              <h4>Total Posts</h4>
              <span>{totalPosts}</span>
            </div>
            <HiDocumentText className="p-1 text-3xl text-white rounded-full bg-cyan-700" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-green-500">
              {lastMonthPosts > 0 && <FaArrowUp />}
              <span>{lastMonthPosts}</span>
            </div>
            <p>Last Month</p>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-1 shadow-md rounded-md min-w-[150px]">
          <div className="flex justify-between w-full gap-2">
            <div className="flex flex-col items-center justify-center">
              <h4>Total Comments</h4>
              <span>{totalComments}</span>
            </div>
            <FaComments className="p-1 text-3xl text-white bg-indigo-700 rounded-full" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-green-500">
              {lastMonthComments > 0 && <FaArrowUp />}
              <span>{lastMonthComments}</span>
            </div>
            <p>Last Month</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap w-full gap-3">
        <div className="flex flex-col min-w-[250px] flex-1 w-full gap-2 p-2 rounded-md shadow-md">
          <div className="flex items-center justify-between w-full gap-3 text-lg font-semibold">
            <span>Recent Users</span>
            <Link
              to="/dashboard/users"
              className="p-1 text-white duration-300 rounded-md bg-rose-400 hover:opacity-70"
            >
              See All
            </Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-lg font-semibold bg-gray-400">
                <td>Username</td>
                <td>email</td>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col min-w-[250px] flex-1 w-full gap-2 p-2 rounded-md shadow-md">
          <div className="flex items-center justify-between w-full gap-3 text-lg font-semibold">
            <span>Recent Posts</span>
            <Link
              to="/dashboard/posts"
              className="p-1 text-white duration-300 rounded-md bg-rose-400 hover:opacity-70"
            >
              See All
            </Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-lg font-semibold bg-gray-400">
                <td>Post Title</td>
                <td>Category</td>
              </tr>
            </thead>
            <tbody>
              {posts &&
                posts.map((post) => (
                  <tr key={post._id}>
                    <td>{post.postTitle}</td>
                    <td>{post.postCategory}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col min-w-[250px] flex-1 w-full gap-2 p-2 rounded-md shadow-md">
          <div className="flex items-center justify-between w-full gap-3 text-lg font-semibold">
            <span>Recent Comments</span>
            <Link
              to="/dashboard/comments"
              className="p-1 text-white duration-300 rounded-md bg-rose-400 hover:opacity-70"
            >
              See All
            </Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-lg font-semibold bg-gray-400">
                <td>Comment Content</td>
                <td>Likes</td>
              </tr>
            </thead>
            <tbody>
              {comments &&
                comments.map((comment) => (
                  <tr key={comment._id}>
                    <td>{comment.commentContent}</td>
                    <td>{comment.numberOfLikes}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
export default DashStats;
