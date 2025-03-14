import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <main className="flex-1 flex justify-center items-center w-full max-w-4xl mx-auto p-4">
      <Outlet />
    </main>
  );
};
export default MainLayout;
