import { useParams, useNavigate } from 'react-router-dom';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import useGlobal from '../hooks/useGlobal';

const UserDelete = () => {
  const { id } = useParams();
  const customAxios = useAxiosInterceptor();
  const { successToast, errorToast } = useGlobal();
  const navigate = useNavigate();

  const handleUserDelete = async () => {
    try {
      await customAxios.delete(`/users/delete-user/${id}`);
      successToast('User successfully deleted');
      navigate(-1);
    } catch (error) {
      console.error(error);
      errorToast(error.message);
    }
  };

  const goBack = () => navigate(-1);
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-2xl font-semibold">Delete User</h1>
      <div className="flex flex-col gap-2 p-2 bg-slate-200 text-slate-700 rounded-md font-medium">
        <h3>Are you sure you want delete user?</h3>
        <div className="flex justify-between items-center w-full">
          <button
            className="bg-red-600 text-white p-1 text-base font-semibold rounded-md hover:opacity-85 duration-300"
            onClick={handleUserDelete}
          >
            Delete
          </button>
          <button
            className="bg-green-400 text-white p-1 text-base font-semibold rounded-md hover:opacity-85 duration-300"
            onClick={goBack}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserDelete;
