import { useNavigate, useParams } from 'react-router-dom';
import useGlobal from '../hooks/useGlobal';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const CommentDelete = () => {
  const { commentId } = useParams();
  const { successToast, errorToast } = useGlobal();
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

  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <div className="flex flex-col gap-3 p-2 bg-white rounded-lg text-slate-700">
        <HiOutlineExclamationCircle className="self-center text-5xl font-bold" />
        <p>Are you sure you want to delete this comment?</p>
        <button
          className="p-1 mt-3 font-bold duration-300 bg-red-500 rounded-md hover:opacity-80 hover:scale-95"
          onClick={handleDeleteComment}
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
