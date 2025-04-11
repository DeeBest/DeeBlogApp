import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';
import PostCard from '../components/PostCard';

const Search = () => {
  const [searchData, setSearchData] = useState({
    searchTerm: '',
    sort: 'desc',
    postCategory: 'uncategorized',
  });
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const customAxios = useAxiosInterceptor();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('postCategory');

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSearchData({
        ...searchData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        postCategory: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      const searchQuery = urlParams.toString();
      setIsLoading(true);
      try {
        const res = await customAxios.get(`/posts?${searchQuery}`);
        setPosts(res.data.posts);

        if (res.data.posts.length >= 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchData.searchTerm);
    urlParams.set('sort', searchData.sort);
    urlParams.set('postCategory', searchData.postCategory);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();

    const res = await customAxios.get(`/posts?${searchQuery}`);

    setPosts([...posts, res.data.posts]);

    if (res.data.posts.length >= 9) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
  };

  return (
    <section className="flex flex-col justify-center w-full gap-2 sm:flex-row">
      <div className="w-full sm:w-[30%] p-2 rounded-md">
        <form className="flex flex-col w-full gap-5">
          <div className="flex flex-col w-full gap-1">
            <label
              htmlFor="searchTerm"
              className="text-lg font-semibold whitespace-nowrap"
            >
              Search Term:
            </label>
            <input
              className="p-1 rounded-md text-slate-500"
              type="text"
              id="searchTerm"
              value={searchData.searchTerm}
              onChange={(e) =>
                setSearchData({
                  ...searchData,
                  searchTerm: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="sort">
              Sort:
            </label>
            <select
              className="p-1 rounded-md text-slate-500"
              id="sort"
              defaultValue={searchData.sort}
              onChange={(e) =>
                setSearchData({ ...searchData, sort: e.target.value })
              }
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="category">
              Category:
            </label>
            <select
              className="p-1 rounded-md text-slate-500"
              id="category"
              value={searchData.postCategory}
              onChange={(e) =>
                setSearchData({
                  ...searchData,
                  postCategory: e.target.value,
                })
              }
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="reactJS">React</option>
              <option value="expressJS">Express</option>
              <option value="nodeJS">NodeJS</option>
              <option value="mongoDB">MongoDB</option>
            </select>
          </div>
          <button
            className="p-1 text-lg duration-300 border rounded-md whitespace-nowrap border-rose-400 text-rose-400 hover:text-rose-700 hover:border-rose-700 w-full sm:w-[150px] sm:self-center"
            onClick={handleSubmit}
          >
            Apply filters
          </button>
        </form>
      </div>
      <div className="w-full sm:w-[65%] p-2 rounded-md">
        <h3>Posts Results</h3>
        {!isLoading && posts.length <= 0 && <p>No posts found!</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && posts.length > 0 && (
          <div className="flex flex-col w-full gap-5">
            <div className="flex flex-wrap items-center justify-center w-full gap-3">
              {posts &&
                posts.map((post) => (
                  <PostCard key={post._id} recentPost={post} />
                ))}
            </div>
            {showMore && (
              <button
                className="p-1 text-lg duration-300 border rounded-md whitespace-nowrap border-rose-400 text-rose-400 hover:text-rose-700 hover:border-rose-700 w-full sm:w-[150px] sm:self-center"
                onClick={handleShowMore}
              >
                Show More
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
export default Search;
