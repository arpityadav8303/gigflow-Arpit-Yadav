import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <Link to={ROUTES.HOME} className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">GigFlow</span>
        </Link>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-gray-600 text-sm">
                {subtitle}
              </p>
            )}
          </div>

          {/* Content */}
          {children}

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              By continuing, you agree to GigFlow's Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            Secure, fast, and easy. All your data is encrypted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;