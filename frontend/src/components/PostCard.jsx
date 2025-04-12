import insertImg from '../utils/insertImg';
import { Link } from 'react-router-dom';

const PostCard = ({ recentPost }) => {
  return (
    <div className=" w-full sm:w-[250px] border border-rose-400 rounded-lg overflow-hidden group relative h-[350px]">
      <img
        src={insertImg(recentPost)}
        alt="post image"
        className="object-contain bg-white h-[200px] z-20 group-hover:h-[160px] transition-[height] duration-300 ease-out w-full"
      />
      <div className="flex flex-col w-full p-2">
        <h1 className="text-xl font-semibold line-clamp-2">
          {recentPost.postTitle}
        </h1>
        <span className="text-sm italic">{recentPost.postCategory}</span>
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
