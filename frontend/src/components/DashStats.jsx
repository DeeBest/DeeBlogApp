import useGlobal from '../hooks/useGlobal';

const DashStats = () => {
  const {
    users,
    comments,
    posts,
    totalComments,
    totalPosts,
    totalUsers,
    lastMonthComments,
    lastMonthPosts,
    lastMonthUsers,
  } = useGlobal();

  return <div>DashStats</div>;
};
export default DashStats;
