import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useGlobal from '../hooks/useGlobal';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState('');
  const [postBody, setPostBody] = useState('');

  const { isLoading, setIsLoading } = useAuth();
  const { successToast, errorToast } = useGlobal();
  const customAxios = useAxiosInterceptor();

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const post = {
      postTitle,
      postCategory,
      postBody,
    };

    try {
      const res = await customAxios.post(
        '/posts/create-post',
        JSON.stringify(post)
      );
      console.log(res.data);

      successToast('Post successfully created');
    } catch (error) {
      console.error(error);
      errorToast('Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-full flex flex-col gap-5 items-center justify-center">
      <h1 className="text-3xl font-semibold">Create Post</h1>
      <form className="flex-1 max-w-[450px] flex flex-col gap-3 p-2">
        <div className="w-full flex flex-col sm:flex-row gap-2 items-center justify-between">
          <label className="flex-1 flex flex-col gap-1" htmlFor="postTitle">
            Title:
            <input
              type="text"
              id="postTitle"
              required
              minLength={3}
              maxLength={100}
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Title"
              className="flex-1 outline-none rounded-md text-slate-700 p-1 focus:border-[1px] focus:border-rose-400 mb-2"
            />
          </label>
          <label className="flex flex-col gap-1" htmlFor="postCategory">
            Category:
            <select
              id="postCategory"
              required
              value={postCategory}
              onChange={(e) => setPostCategory(e.target.value)}
              className="outline-none rounded-md text-slate-700 p-1 focus:border-[1px] focus:border-rose-400 mb-2"
            >
              <option value="uncategorized">Select Category</option>
              <option value="mongoDB">MongoDB</option>
              <option value="expressJS">ExpressJS</option>
              <option value="reactJS">ReactJS</option>
              <option value="nodeJS">nodeJS</option>
            </select>
          </label>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
          <label className="flex-1 flex flex-col gap-1" htmlFor="postImage">
            Image:
            <input type="file" accept="image/*" className="flex-1" />
          </label>
          <button className="flex items-center justify-center p-1 rounded-md border border-rose-400 text-lg max-w-[200px] hover:text-slate-700 hover:bg-slate-300 self-center hover:opacity-80 duration-300">
            {isLoading ? (
              <div className="w-4 h-4 rounded-full bg-transparent border-2 border-t-transparent border-slate-500 animate-spin"></div>
            ) : (
              'Upload Image'
            )}
          </button>
        </div>
        <label htmlFor="postBody" className="flex-1 flex flex-col gap-1">
          Post Body:
          <ReactQuill
            theme="snow"
            value={postBody}
            onChange={(content) => setPostBody(content)}
            required
          />
        </label>
        <button
          className="flex items-center justify-center p-1 rounded-md border border-rose-400 text-lg w-[200px] hover:text-slate-700 hover:bg-slate-300 self-center hover:opacity-80 duration-300"
          onClick={handlePostSubmit}
        >
          {isLoading ? (
            <div className="w-4 h-4 rounded-full bg-transparent border-2 border-t-transparent border-slate-500 animate-spin"></div>
          ) : (
            'Publish'
          )}
        </button>
      </form>
    </div>
  );
};
export default CreatePost;
