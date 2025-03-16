//components
import Header from './components/Header';
import Footer from './components/footer/Footer';

//pages
import Home from './pages/home/Home';
import ErrorPage from './pages/errorPage/ErrorPage';

//layouts
import MainLayout from './layouts/MainLayout';

import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />

          {/* catch all page */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};
export default App;
