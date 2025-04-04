import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import useGlobal from '../hooks/useGlobal';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import Comment from './Comment';

const CommentsSection = ({ postId }) => {
  const { auth, isLoading } = useAuth();
  const { successToast, errorToast } = useGlobal();
  const customAxios = useAxiosInterceptor();
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await customAxios.get(`/comments/get-comments/${postId}`);
        setComments(res.data.comments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const res = await customAxios.post('/comments/create-comment', {
        postId,
        userId: auth.currentUser.id,
        commentContent,
      });

      setComments([res.data.comment, ...comments]);
      successToast('Comment successfully submitted');
      setCommentContent('');
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
            minLength={5}
            maxLength={200}
            required
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          ></textarea>
          <div className="flex items-center justify-between px-4 text-xs">
            <p>{200 - commentContent.length} characters remaining</p>
            <button
              disabled={
                !commentContent ||
                commentContent.length <= 0 ||
                commentContent.length > 200 ||
                commentContent.length < 5 ||
                isLoading
                  ? true
                  : false
              }
              className={
                !commentContent ||
                commentContent.length <= 0 ||
                commentContent.length > 200 ||
                commentContent.length < 5 ||
                isLoading
                  ? `cursor-not-allowed opacity-55 p-1 text-base border rounded-md border-rose-400`
                  : `p-1 text-base duration-300 border rounded-md border-rose-400 hover:opacity-80`
              }
              onClick={handleSubmitComment}
            >
              {isLoading ? (
                <div className="w-4 h-4 bg-transparent border-2 rounded-full border-t-transparent border-slate-500 animate-spin"></div>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      </div>
      {comments.length < 0 ? (
        <div>
          <p>This post does not have comments yet.</p>
        </div>
      ) : (
        <div>
          <p>
            Comments: <span>{comments.length}</span>
          </p>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};
export default CommentsSection;
