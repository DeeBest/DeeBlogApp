import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <main className="flex flex-col flex-1 w-full max-w-4xl h-[calc(100vh-200px)] p-4 mx-auto overflow-hidden">
      <Outlet />
    </main>
  );
};
export default MainLayout;
