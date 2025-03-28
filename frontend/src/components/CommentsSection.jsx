import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import useGlobal from '../hooks/useGlobal';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';

const CommentsSection = () => {
  const { auth } = useAuth();
  const { successToast, errorToast } = useGlobal();
  const customAxios = useAxiosInterceptor();
  const [comment, setComment] = useState('');

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      console.log(comment);
      successToast('Comment successfully submitted');
    } catch (error) {
      console.error(error);
      errorToast('Failed to submit comment');
    }
  };

  return (
    <div className="flex flex-col w-full">
      {auth.currentUser ? (
        <div className="flex items-center w-full gap-1">
          <p>Signed in as:</p>
          <Link
            to="/dashboard/profile"
            className="italic text-indigo-400 underline duration-300 hover:decoration-transparent"
          >
            @{auth.currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-start w-full">
          <p>
            You need to{' '}
            <Link
              to="/sign-in"
              className="italic text-indigo-400 underline duration-300 hover:decoration-transparent"
            >
              sign in
            </Link>{' '}
            to comment.
          </p>
        </div>
      )}
      <div className="flex flex-col items-center p-4 mt-5 border rounded-lg border-slate-600">
        <form className="flex flex-col w-full max-w-[400px] gap-3">
          <textarea
            className="p-2 text-black bg-white rounded-sm"
            placeholder="Add comment..."
            rows={3}
            maxLength={200}
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="flex items-center justify-between px-4 text-xs">
            <p>{200 - comment.length} characters remaining</p>
            <button
              className="p-1 text-base duration-300 border rounded-md border-rose-400 hover:opacity-80"
              onClick={handleSubmitComment}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CommentsSection;
