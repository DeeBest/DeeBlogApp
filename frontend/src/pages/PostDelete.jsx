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
    <div className="w-full flex-1 flex justify-center items-center">
      <div className="bg-indigo-300 p-2 flex flex-col text-slate-600 text-lg font-semibold rounded-md gap-5">
        <h3>Are you sure you want to proceed with deleting this post?</h3>
        <div className="w-full flex items-center justify-between">
          <button
            onClick={handleDeletePost}
            className=" bg-red-600 p-2 rounded-md text-white hover:opacity-80 duration-300"
          >
            delete post
          </button>
          <button
            onClick={goBack}
            className=" bg-green-600 p-2 rounded-md text-white hover:opacity-80 duration-300"
          >
            No, go back
          </button>
        </div>
      </div>
    </div>
  );
};
export default PostDelete;
