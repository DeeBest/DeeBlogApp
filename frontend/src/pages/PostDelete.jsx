import { useNavigate, useParams } from 'react-router-dom';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import useGlobal from '../hooks/useGlobal';

const PostDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const customAxios = useAxiosInterceptor();
  const { successToast, errorToast } = useGlobal();

  const handleDeletePost = async () => {
    try {
      await customAxios.delete(`/posts/delete-post/${id}`);

      successToast('Post successfully deleted');
      navigate('/dashboard/posts');
    } catch (error) {
      console.error(error);
      errorToast('Failed to delete post');
    }
  };

  const goBack = () => navigate(-1);

  return (
    <div className="flex items-center justify-center flex-1 w-full">
      <div className="flex flex-col gap-5 p-2 text-lg font-semibold bg-indigo-300 rounded-md text-slate-600">
        <h3 className="text-center">
          Are you sure you want to proceed with deleting this post?
        </h3>
        <div className="flex items-center justify-between w-full">
          <button
            onClick={handleDeletePost}
            className="p-2 text-white duration-300 bg-red-600 rounded-md  hover:opacity-80"
          >
            delete post
          </button>
          <button
            onClick={goBack}
            className="p-2 text-white duration-300 bg-green-600 rounded-md  hover:opacity-80"
          >
            No, go back
          </button>
        </div>
      </div>
    </div>
  );
};
export default PostDelete;
