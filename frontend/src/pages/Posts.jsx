import { useState, useEffect } from 'react';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import { FaPen, FaTrash } from 'react-icons/fa';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const customAxios = useAxiosInterceptor();

  const fetchPosts = async () => {
    try {
      const res = await customAxios.get('/posts');
      setPosts(res.data.posts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col gap-5 justify-center items-center w-full">
      <h1>Posts</h1>
      <table>
        <thead>
          <tr className="dark:bg-slate-400 dark:text-slate-700 bg-slate-700 text-slate-400">
            <td>Date Updated</td>
            <td>Title</td>
            <td>Category</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            return (
              <tr key={post._id}>
                <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                <td>{post.slug}</td>
                <td>{post.postCategory}</td>
                <td>
                  <div>
                    <FaPen className="edit-icon table-icon" />
                    <FaTrash className="delete-icon table-icon" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Posts;
