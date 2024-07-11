import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRoutes from './routes.jsx'

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);