import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/slices/uiSlice';
import Button from '../Common/Button';
import UserDropdown from './UserDropdown';
import MobileMenu from './MobileMenu';
import { ROUTES } from '../../utils/constants';

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleOpenAuth = (type) => {
    if (type === 'login') {
      dispatch(openModal('loginModal'));
    } else {
      dispatch(openModal('registerModal'));
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="hidden sm:inline text-xl font-bold text-gray-900">
              GigFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to={ROUTES.GIGS_FEED}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Browse Gigs
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to={ROUTES.DASHBOARD}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to={ROUTES.CREATE_GIG}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Post Gig
                </Link>
              </>
            )}
          </div>

          {/* Search & Auth */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Auth / User Menu */}
            {isAuthenticated ? (
              <UserDropdown user={user} />
            ) : (
              <div className="hidden sm:flex space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenAuth('login')}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenAuth('register')}
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4 border-t border-gray-200">
            <input
              type="text"
              placeholder="Search gigs..."
              aria-label="Search gigs"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenu
          isAuthenticated={isAuthenticated}
          user={user}
          onClose={() => setMobileMenuOpen(false)}
          onAuthClick={handleOpenAuth}
        />
      )}
    </nav>
  );
};

export default Navbar;