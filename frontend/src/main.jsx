import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ContextProvider from './context/context.jsx';
import './index.css';
import { AuthProvider } from './context/authContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

const root = document.querySelector('#root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider>
      <ContextProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </ContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
