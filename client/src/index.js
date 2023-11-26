import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RequestProvider } from 'react-request-hook'
import axios from 'axios'; 

// creating base URL using axios
const axiosinstance = axios.create({
  baseURL: process.env.REACT_APP_CLIENT_URL || 'http://localhost:3000/api',
  // credentials: 'include'
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Base URL is made available over App Component using RequestProvider */}
    <RequestProvider value={axiosinstance}>
      <App />
    </RequestProvider>
  </React.StrictMode>
);
