// Components
import Header from './components/Header';
import Footer from './components/Footer';

import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import RequireAuth from './utils/RequireAuth';
import Posts from './pages/Posts';
import CreatePost from './pages/CreatePost';
import Unauthorized from './pages/Unauthorized';
import Profile from './components/Profile';
import PostDelete from './pages/PostDelete';
import EditPost from './pages/EditPost';
import Users from './components/Users';
import UserDelete from './pages/UserDelete';
import Post from './pages/Post';
import CommentDelete from './pages/CommentDelete';
import Comments from './components/Comments';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="post/:slug" element={<Post />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* Protected Routes - Wrapped Individually */}
          <Route element={<RequireAuth allowedRoles={[2022]} />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route path="/dashboard/posts" element={<Posts />} />
              <Route
                path="/dashboard/post/delete-comment/:commentId"
                element={<CommentDelete />}
              />
              <Route element={<RequireAuth allowedRoles={[2001]} />}>
                <Route
                  path="/dashboard/posts/create-post"
                  element={<CreatePost />}
                />
                <Route
                  path="/dashboard/posts/delete-post/:id"
                  element={<PostDelete />}
                />
                <Route
                  path="/dashboard/posts/edit-post/:id"
                  element={<EditPost />}
                />
                <Route path="/dashboard/users" element={<Users />} />
                <Route path="/dashboard/comments" element={<Comments />} />
                <Route
                  path="/dashboard/users/delete-user/:id"
                  element={<UserDelete />}
                />
              </Route>
            </Route>
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
