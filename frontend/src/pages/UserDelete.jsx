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
    <div className="flex flex-col items-center justify-center w-full gap-3">
      <h1 className="text-2xl font-semibold">Delete User</h1>
      <div className="flex flex-col gap-2 p-2 font-medium rounded-md bg-slate-200 text-slate-700">
        <h3 className="text-center">Are you sure you want delete user?</h3>
        <div className="flex items-center justify-between w-full">
          <button
            className="p-1 text-base font-semibold text-white duration-300 bg-red-600 rounded-md hover:opacity-85"
            onClick={handleUserDelete}
          >
            Delete
          </button>
          <button
            className="p-1 text-base font-semibold text-white duration-300 bg-green-400 rounded-md hover:opacity-85"
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
