import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import Button from '../Common/Button';

const MobileMenu = ({ isAuthenticated, user, onClose, onAuthClick }) => {
  return (
    <div className="md:hidden bg-white border-t border-gray-200">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {/* Browse Gigs */}
        <Link
          to={ROUTES.GIGS_FEED}
          onClick={onClose}
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        >
          Browse Gigs
        </Link>

        {isAuthenticated ? (
          <>
            {/* Dashboard */}
            <Link
              to={ROUTES.DASHBOARD}
              onClick={onClose}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Dashboard
            </Link>

            {/* Post Gig */}
            <Link
              to={ROUTES.CREATE_GIG}
              onClick={onClose}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Post Gig
            </Link>

            {/* Profile */}
            <Link
              to={ROUTES.PROFILE}
              onClick={onClose}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Profile
            </Link>

            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* User Info */}
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </>
        ) : (
          <>
            {/* Login Button */}
            <div className="px-3 py-2">
              <Button
                size="full"
                variant="ghost"
                onClick={() => {
                  onAuthClick('login');
                  onClose();
                }}
              >
                Login
              </Button>
            </div>

            {/* Sign Up Button */}
            <div className="px-3 py-2">
              <Button
                size="full"
                variant="primary"
                onClick={() => {
                  onAuthClick('register');
                  onClose();
                }}
              >
                Sign Up
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;