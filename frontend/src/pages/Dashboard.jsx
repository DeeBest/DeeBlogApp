import refreshToken from '../utils/refreshToken';

const Dashboard = () => {
  return (
    <div>
      <button onClick={refreshToken}>refresh</button>
    </div>
  );
};
export default Dashboard;
