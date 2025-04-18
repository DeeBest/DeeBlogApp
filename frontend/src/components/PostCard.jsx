import insertImg from '../utils/insertImg';
import { Link } from 'react-router-dom';
import { FaPen, FaTrash } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';

const PostCard = ({ recentPost }) => {
  const { auth } = useAuth();
  return (
    <div className=" w-full sm:w-[250px] rounded-lg overflow-hidden group relative h-[350px]">
      <Link to={`/post/${recentPost.slug}`}>
        <img
          src={insertImg(recentPost)}
          alt="post image"
          className="object-contain bg-white h-[200px] z-20 group-hover:h-[160px] transition-[height] duration-300 ease-out w-full"
        />
      </Link>
      <div className="flex flex-col w-full p-2">
        <h1 className="text-xl font-semibold line-clamp-2 h-[50px]">
          {recentPost.postTitle}
        </h1>
        <div className="flex items-center justify-between w-full mt-3">
          <span className="text-sm italic">{recentPost.postCategory}</span>
          {auth?.accessToken &&
            (auth?.currentUser?.roles.includes(2001) ||
              auth?.currentUser?.roles.includes(1954)) && (
              <div className="flex items-center gap-3">
                <Link to={`/dashboard/posts/edit-post/${recentPost._id}`}>
                  <FaPen className="text-sm text-indigo-400 duration-300 hover:opacity-70" />
                </Link>
                <Link to={`/dashboard/posts/delete-post/${recentPost._id}`}>
                  <FaTrash className="text-sm text-red-400 duration-300 hover:opacity-70" />
                </Link>
              </div>
            )}
        </div>
        <Link
          to={`/post/${recentPost.slug}`}
          className="px-2 py-1 font-semibold text-center text-white duration-300 rounded-md bg-rose-400 hover:opacity-70 absolute bottom-[-200px] left-0 right-0 group-hover:bottom-0 m-2 rounded-tl-none z-10"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
};
export default PostCard;
