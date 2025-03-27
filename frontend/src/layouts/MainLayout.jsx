import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <main className="flex flex-1 w-full max-w-4xl min-h-full mx-auto overflow-hidden">
      <Outlet />
    </main>
  );
};
export default MainLayout;
