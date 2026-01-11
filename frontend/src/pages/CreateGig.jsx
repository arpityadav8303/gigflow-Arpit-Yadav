import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { openModal } from '../store/slices/uiSlice';
import GigForm from '../components/Gigs/GigForm';
import { ROUTES } from '../utils/constants';

const CreateGig = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(openModal('loginModal'));
      navigate(ROUTES.HOME);
    }
  }, [isAuthenticated, navigate, dispatch]);

  const handleSuccess = () => {
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Post a New Gig
        </h1>
        <p className="text-lg text-gray-600">
          Find the perfect freelancer to complete your project
        </p>
      </div>

      {/* Form */}
      {isAuthenticated && (
        <GigForm onSuccess={handleSuccess} />
      )}
    </div>
  );
};

export default CreateGig;