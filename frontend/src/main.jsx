import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ContextProvider from './context/context.jsx';
import './index.css';
import { AuthProvider } from './context/authContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

const root = document.querySelector('#root');
root.className = 'flex-1 flex flex-col min-h-screen min-w-screen';

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ContextProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ContextProvider>
  </React.StrictMode>
);
