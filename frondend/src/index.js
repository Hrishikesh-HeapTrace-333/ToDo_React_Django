import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path= '/' element = {<Layout/>}>
      <Route path = '' element = {<App/>}/>
      <Route path = 'login/' element = {<Login/>}/>
      <Route path = 'register/' element = {<Register/>}/>
      <Route path = 'dashboard/' element = {<Dashboard/>}/>
    </Route>
  )
); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
