import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useGlobal from '../hooks/useGlobal';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditPost = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState('');
  const [postBody, setPostBody] = useState('');

  const { isLoading, setIsLoading } = useAuth();
  const { successToast, errorToast } = useGlobal();
  const customAxios = useAxiosInterceptor();
  const navigate = useNavigate();

  const { id } = useParams();

  const fetchPost = async () => {
    try {
      const res = await customAxios.get(`/posts/${id}`);

      setPostTitle(res.data.foundPost.postTitle);
      setPostBody(res.data.foundPost.postBody);
      setPostCategory(res.data.foundPost.postCategory);
    } catch (error) {
      console.error(error);
      errorToast(error.message);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handlePostUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const post = {
      postTitle,
      postCategory,
      postBody,
    };

    try {
      await customAxios.put(`/posts/update-post/${id}`, JSON.stringify(post));

      successToast('Post successfully updated');
      navigate('/dashboard/posts');
    } catch (error) {
      console.error(error);
      errorToast('Failed to update post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-5">
      <h1 className="font-serif text-3xl font-semibold">Update Post</h1>
      <form className="flex flex-col w-full gap-3 p-2">
        <div className="flex flex-col w-full gap-2 sm:flex-row sm:justify-between">
          <label
            className="flex flex-col justify-start flex-1 gap-1"
            htmlFor="postTitle"
          >
            <span className="sm:self-start">Title:</span>
            <input
              type="text"
              id="postTitle"
              minLength={3}
              maxLength={100}
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Title"
              className="flex-1 outline-none rounded-md text-slate-700 p-1 focus:outline-[1px] focus:outline-rose-400 mb-2"
            />
          </label>
          <label
            className="flex flex-col justify-start flex-1 gap-1"
            htmlFor="postCategory"
          >
            <span className="sm:self-start">Category:</span>
            <select
              id="postCategory"
              value={postCategory}
              onChange={(e) => setPostCategory(e.target.value)}
              className="flex-1 outline-none rounded-md text-slate-700 p-1 focus:outline-[1px] focus:outline-rose-400 mb-2"
            >
              <option value="uncategorized">Select Category</option>
              <option value="mongoDB">MongoDB</option>
              <option value="expressJS">ExpressJS</option>
              <option value="reactJS">ReactJS</option>
              <option value="nodeJS">NodeJS</option>
            </select>
          </label>
        </div>
        <div className="flex flex-col justify-between w-full gap-2 sm:flex-row">
          <label
            className="flex flex-col items-start flex-1 gap-2 sm:w-full"
            htmlFor="postImage"
          >
            <span className="sm:self-start">Image:</span>
            <input
              type="file"
              accept="image/*"
              className="outline-none rounded-md text-slate-700 p-1 focus:border-[1px] focus:border-rose-400 mb-2"
            />
          </label>
          <button className="flex items-center justify-center p-1 rounded-md border border-rose-400 text-lg w-full sm:w-[150px] hover:text-slate-700 hover:bg-slate-300 self-center hover:opacity-80 duration-300 whitespace-nowrap">
            {isLoading ? (
              <div className="w-4 h-4 bg-transparent border-2 rounded-full border-t-transparent border-slate-500 animate-spin"></div>
            ) : (
              'Upload Image'
            )}
          </button>
        </div>
        <label
          htmlFor="postBody"
          className="flex flex-col items-start justify-start flex-1 gap-1"
        >
          <span className="sm:self-start">Post Content:</span>
          <ReactQuill
            theme="snow"
            value={postBody}
            onChange={(content) => setPostBody(content)}
            className="w-full"
          />
        </label>
        <button
          className="flex items-center justify-center p-1 rounded-md border border-rose-400 text-lg w-full sm:w-[200px] hover:text-slate-700 hover:bg-slate-300 self-center hover:opacity-80 duration-300"
          onClick={handlePostUpdate}
        >
          {isLoading ? (
            <div className="w-4 h-4 bg-transparent border-2 rounded-full border-t-transparent border-slate-500 animate-spin"></div>
          ) : (
            'Update'
          )}
        </button>
      </form>
    </div>
  );
};
export default EditPost;
