/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import { FaThumbsUp } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useGlobal from '../hooks/useGlobal';
import { Link, useNavigate } from 'react-router-dom';

const Comment = ({ comment, comments, setComments }) => {
  const customAxios = useAxiosInterceptor();
  const { auth } = useAuth();
  const { successToast, errorToast } = useGlobal();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.commentContent);

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

  const handleEdit = () => {
    setIsEditing(true);
    setEditedComment(comment.commentContent);
  };

  const handleSaveEditedComment = async (comment, editedComment) => {
    const commentId = comment._id;

    try {
      await customAxios.put(`/comments/edit-comment/${commentId}`, {
        editedComment,
      });

      setComments(
        comments.map((c) =>
          c._id === comment._id ? { ...c, commentContent: editedComment } : c
        )
      );
      setIsEditing(false);
      successToast('Successfully edited comment');
    } catch (error) {
      console.error(error);
      errorToast('Error editing comment');
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
      {isEditing ? (
        <div className="flex flex-col w-full gap-2">
          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            className="p-2 mt-3 text-sm rounded-md resize-none text-slate-700"
          ></textarea>
          <div className="flex items-center justify-end w-full gap-2 text-sm">
            <button
              className="w-16 px-2 py-1 text-white duration-300 bg-green-500 rounded-sm hover:opacity-75"
              onClick={() => handleSaveEditedComment(comment, editedComment)}
            >
              Save
            </button>
            <button
              className="w-16 px-2 py-1 text-white duration-300 bg-red-500 rounded-sm hover:opacity-75"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="w-full pl-12 mb-2">
            <p className="text-xs font-thin">{comment.commentContent}</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
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
            <p>
              {comment.numberOfLikes > 0 &&
                comment.numberOfLikes +
                  ' ' +
                  (comment.numberOfLikes === 1 ? 'like' : 'likes')}
            </p>
            {auth.currentUser &&
              (comment.postCreatorId === auth.currentUser.id ||
                auth.currentUser.roles.includes(2001)) && (
                <>
                  <button
                    className="duration-300 hover:text-sky-500"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <Link
                    to={`/dashboard/post/delete-comment/${comment._id}`}
                    className="duration-300 hover:text-red-500"
                  >
                    Delete
                  </Link>
                </>
              )}
          </div>
        </div>
      )}
    </section>
  );
};
export default Comment;
