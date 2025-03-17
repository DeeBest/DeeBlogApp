//components
import Header from './components/Header';
import Footer from './components/footer/Footer';

import { Route, Routes } from 'react-router-dom';

//layouts
import MainLayout from './layouts/MainLayout';

//pages
import Home from './pages/home/Home';
import ErrorPage from './pages/errorPage/ErrorPage';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* catch all page */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};
export default App;
