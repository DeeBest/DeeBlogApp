import { useEffect, useState } from 'react';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';

const Comment = ({ comment }) => {
  const customAxios = useAxiosInterceptor();
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

  console.log(comment);
  console.log(user);

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
    </section>
  );
};
export default Comment;
