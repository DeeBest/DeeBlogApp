import { useEffect, useState } from 'react';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import { FaThumbsUp } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Comment = ({ comment, comments, setComments }) => {
  const customAxios = useAxiosInterceptor();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await customAxios.get(`/users/${comment.postCreatorId}`);
        setUser(res.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [comment]);

  const handleLikeComment = async (commentId) => {
    if (!auth.currentUser) {
      navigate('/sign-in');
      return;
    }
    try {
      const res = await customAxios.put(`/comments/like-comment/${commentId}`);
      console.log(res.data);

      setComments(
        comments.map((comment) => {
          return comment._id === commentId
            ? {
                ...comment,
                likes: res.data.foundComment.likes,
                numberOfLikes: res.data.foundComment.likes.length,
              }
            : comment;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col w-full p-1 pl-5 mt-3">
      {user ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 p-1 font-semibold rounded-full bg-rose-400">
            {user.username.slice(0, 2).toUpperCase()}
          </div>
          <span className="text-sm font-semibold">@{user.username}</span>
        </div>
      ) : (
        <span>@Anonymous</span>
      )}
      <div className="w-full pl-12 mb-2">
        <p className="text-xs font-thin">{comment.commentContent}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleLikeComment(comment._id)}
          className={`duration-300 ease-in-out hover:text-sky-500 ${
            auth.currentUser &&
            comment.likes.includes(auth.currentUser.id) &&
            'text-sky-500'
          }`}
        >
          <FaThumbsUp />
        </button>
        <p className="text-xs text-gray-400">
          {comment.numberOfLikes > 0 &&
            comment.numberOfLikes +
              ' ' +
              (comment.numberOfLikes === 1 ? 'like' : 'likes')}
        </p>
      </div>
    </section>
  );
};
export default Comment;
