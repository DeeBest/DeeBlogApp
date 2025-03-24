import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <main className="flex-1 flex w-full min-h-full max-w-4xl mx-auto">
      <Outlet />
    </main>
  );
};
export default MainLayout;
