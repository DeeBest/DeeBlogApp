import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ContextProvider from './context/context.jsx';
import './index.css';
import { AuthProvider } from './context/authContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

const root = document.querySelector('#root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <ThemeProvider>
          <ContextProvider>
            <App />
          </ContextProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
