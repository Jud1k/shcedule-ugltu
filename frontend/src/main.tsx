import React from 'react';
import { createRoot } from 'react-dom/client';
import { Flip, ToastContainer } from 'react-toastify';
import App from './app/App';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const root = document.getElementById('root');

if (!root) throw new Error('No root element found');

createRoot(root).render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      style={{ zIndex: 9999 }}
      transition={Flip}
    />
  </React.StrictMode>,
);
