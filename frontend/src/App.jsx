//components
import Header from './components/Header';
import Footer from './components/Footer';

import { Route, Routes } from 'react-router-dom';

//layouts
import MainLayout from './layouts/MainLayout';

//pages
import Home from './pages/home/Home';
import ErrorPage from './pages/errorPage/ErrorPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />

          {/* catch all page */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};
export default App;
