import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ContextProvider from './context/context.jsx';
import './index.css';

const root = document.querySelector('#root');
root.className = 'flex-1 flex flex-col min-h-screen min-w-screen';

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
