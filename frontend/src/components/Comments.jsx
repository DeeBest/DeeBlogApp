import { useState, useEffect } from 'react';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import useGlobal from '../hooks/useGlobal';
import { FaExclamationTriangle, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const customAxios = useAxiosInterceptor();
  const { errorToast } = useGlobal();
  const { auth } = useAuth();
  const { theme } = useTheme();

  const fetchComments = async () => {
    try {
      const res = await customAxios.get('/comments/get-all-comments?limit=9');

      setComments(res.data.comments);
    } catch (error) {
      console.error(error);
      errorToast(error.message);
    }
  };

  useEffect(() => {
    auth.currentUser.roles.includes(2001) && fetchComments();
  }, []);

  return (
    <div
      className={`${
        theme === 'light' ? 'bg-slate-200' : 'bg-slate-800'
      } flex flex-col flex-1 w-full h-[calc(100vh-250px)] gap-4 p-2 rounded-md overflow-hidden text-center`}
    >
      <h1 className="text-2xl font-semibold">Comments</h1>
      {comments.length <= 0 || !comments ? (
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <FaExclamationTriangle className="text-3xl text-red-500" />
          <h3 className="text-lg font-semibold">
            No Comments available for display
          </h3>
        </div>
      ) : (
        <div className="overflow-y-auto">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-base font-bold bg-slate-400 text-slate-700">
                  <td>Date Updated</td>
                  <td>Comment Content</td>
                  <td>Number Of Likes</td>
                  <td>Post ID</td>
                  <td>Post Creator ID</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => {
                  return (
                    <tr key={comment._id}>
                      <td>
                        {new Date(comment.updatedAt).toLocaleDateString()}
                      </td>
                      <td>{comment.commentContent}</td>
                      <td>{comment.numberOfLikes}</td>
                      <td>{comment.postId}</td>
                      <td>{comment.postCreatorId}</td>
                      <td>
                        <Link
                          to={`/dashboard/post/delete-comment/${comment._id}`}
                        >
                          <FaTrashAlt className="text-red-400 duration-300 hover:scale-90 hover:opacity-85" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
export default Comments;
