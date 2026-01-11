import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from './Footer';
import Toast from '../Common/Toast';
import AuthModals from '../Auth/AuthModal';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Toast Container */}
      <Toast />

      {/* Auth Modals */}
      <AuthModals />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;