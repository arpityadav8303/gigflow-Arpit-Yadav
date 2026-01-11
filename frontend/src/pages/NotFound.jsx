import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import Button from '../components/Common/Button';
import { ROUTES } from '../utils/constants';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center">
        {/* Icon */}
        <AlertCircle size={80} className="mx-auto text-red-500 mb-6" />

        {/* 404 */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={ROUTES.HOME}>
            <Button variant="primary" size="lg">
              Go Home
            </Button>
          </Link>
          <Link to={ROUTES.GIGS_FEED}>
            <Button variant="outline" size="lg">
              Browse Gigs
            </Button>
          </Link>
        </div>

        {/* Suggestions */}
        <div className="mt-12 text-sm text-gray-600">
          <p className="mb-4">Here are some helpful links:</p>
          <ul className="space-y-2">
            <li>
              <Link to={ROUTES.HOME} className="text-blue-600 hover:text-blue-700">
                ← Home Page
              </Link>
            </li>
            <li>
              <Link to={ROUTES.GIGS_FEED} className="text-blue-600 hover:text-blue-700">
                → Browse Gigs
              </Link>
            </li>
            <li>
              <Link to={ROUTES.CREATE_GIG} className="text-blue-600 hover:text-blue-700">
                → Post a Gig
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;