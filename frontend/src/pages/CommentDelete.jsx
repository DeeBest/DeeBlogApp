import { useNavigate, useParams } from 'react-router-dom';
import useGlobal from '../hooks/useGlobal';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import useAuth from '../hooks/useAuth';

const CommentDelete = () => {
  const { commentId, postCreatorId } = useParams();
  const { successToast, errorToast } = useGlobal();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const customAxios = useAxiosInterceptor();

  const goBack = () => navigate(-1);

  const handleDeleteComment = async () => {
    try {
      await customAxios.delete(`/comments/delete-comment/${commentId}`);
      successToast('Successfully deleted comment');
      goBack();
    } catch (error) {
      console.error(error);
      errorToast('Error deleting comment');
    }
  };

  const rejectDelete = () => {
    alert('You are not allowed  to delete this comment');
    goBack();
  };

  return (
    <div className="flex items-center justify-center w-full h-full p-4 animate-slideFromRight">
      <div className="flex flex-col gap-3 p-2 bg-white rounded-lg text-slate-700">
        <HiOutlineExclamationCircle className="self-center text-5xl font-bold" />
        <p className="w-full text-center">
          Are you sure you want to delete this comment?
        </p>
        <button
          className="p-1 mt-3 font-bold duration-300 bg-red-500 rounded-md hover:opacity-80 hover:scale-95"
          onClick={
            auth.currentUser.id === postCreatorId ||
            auth.currentUser.roles.includes(2001)
              ? handleDeleteComment
              : rejectDelete
          }
        >
          Yes, I am sure
        </button>
        <button
          className="p-1 font-bold duration-300 bg-green-500 rounded-md hover:opacity-80 hover:scale-95"
          onClick={goBack}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default CommentDelete;
