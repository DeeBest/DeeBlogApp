import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useGlobal from '../hooks/useGlobal';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import placeHolderImg from '../assets/placeholder-img.png';
import CallToAction from '../components/CallToAction';
import CommentsSection from '../components/CommentsSection';
import RecentArticles from '../components/RecentArticles';

const Post = () => {
  const [post, setPost] = useState(null);
  const { errorToast } = useGlobal();
  const customAxios = useAxiosInterceptor();
  const { slug } = useParams();

  const fetchPost = async () => {
    try {
      const res = await customAxios.get(`/posts?slug=${slug}`);

      setPost(res.data.posts[0]);
    } catch (error) {
      console.error(error);
      errorToast(error.message);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  return (
    <div className="flex flex-col items-center w-full gap-5">
      <h1 className="font-serif text-xl font-bold">{post && post.postTitle}</h1>
      <Link
        to={`/search?postCategory=${post && post.postCategory}`}
        className="text-xs italic underline duration-300 decoration-rose-400 hover:decoration-transparent"
      >
        {post && post.postCategory}
      </Link>
      <div className="flex flex-col items-center justify-center w-full max-h-[350px] overflow-hidden rounded-md">
        <div className="flex items-center justify-center w-full overflow-hidden">
          <img
            src={placeHolderImg}
            alt="placeholderImg"
            className="block object-contain w-full"
          />
        </div>
        <div className="flex items-center justify-between w-full p-1 text-xs italic">
          <p>{new Date(post && post.createdAt).toLocaleDateString()}</p>
          <p>{post && (post.postBody.length / 1000).toFixed(0)} minutes read</p>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: post && post.postBody }}
        className="w-full postBody"
      ></div>
      <CallToAction />
      <CommentsSection postId={post && post._id} />
      <RecentArticles />
    </div>
  );
};
export default Post;
