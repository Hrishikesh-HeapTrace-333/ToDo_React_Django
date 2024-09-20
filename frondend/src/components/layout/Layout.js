import React from 'react';
import Header from '../header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../footer/Footer';
import './Layout.css';
import UserContextProvider from '../context/user/UserContextProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Layout() {
  return (
      <UserContextProvider>
        <div style={{position : 'absolute', width : '100%', zIndex : 2, top : '0%'}}>
          <Header/>
        </div>
        <main className="main min-h-full">
          <Outlet />
        </main>
        <div style={{position : 'fixed', width : '100%', bottom : '0%'}}>
        <Footer />
        </div>
        <ToastContainer />
      </UserContextProvider>
  );
}

export default Layout;
