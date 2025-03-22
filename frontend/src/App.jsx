// Components
import Header from './components/Header';
import Footer from './components/Footer';

import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/home/Home';
import ErrorPage from './pages/errorPage/ErrorPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import RequireAuth from './utils/RequireAuth';
import Posts from './pages/Posts';
import CreatePost from './pages/CreatePost';
import Unauthorized from './pages/Unauthorized';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes - Wrapped Individually */}
          <Route element={<RequireAuth allowedRoles={[2022]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/posts" element={<Posts />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[2001]} />}>
            <Route path="/create-post" element={<CreatePost />} />
          </Route>

          {/* Catch-All Route */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer className="z-[10000]" />
    </>
  );
};

export default App;
