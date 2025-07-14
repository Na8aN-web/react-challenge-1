import React from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer';
import Navbar from './Navbar'; 
import BottomFooter from './BottomFooter';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
      <BottomFooter />
    </div>
  );
};

export default Layout;