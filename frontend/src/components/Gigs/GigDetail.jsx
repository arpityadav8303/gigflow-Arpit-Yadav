import React, { useEffect } from 'react';
import { Calendar, User, DollarSign } from 'lucide-react';
import Card from '../Common/Card';
import Badge from '../Common/Badge';
import Loader from '../Common/Loader';
import Button from '../Common/Button';
import { formatters } from '../../utils/formatters';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../store/slices/uiSlice';

const GigDetail = ({ gig, loading, onDelete }) => {
  const { user, isAuthenticated } = useAuth();
  const dispatch = useDispatch();

  const isOwner = isAuthenticated && user?._id === gig?.ownerId?._id;

  const handleBidClick = () => {
    if (!isAuthenticated) {
      dispatch(openModal('loginModal'));
    } else if (!isOwner) {
      dispatch(openModal('bidModal'));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader size="lg" />
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Gig not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Card */}
      <Card shadow className="mb-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {gig.title}
            </h1>
            <Badge status={gig.status} size="md" />
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-2">Budget</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatters.price(gig.budget)}
            </p>
          </div>
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b border-gray-200">
          {/* Posted Date */}
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Posted</p>
              <p className="font-medium text-gray-900">
                {formatters.date(gig.createdAt)}
              </p>
            </div>
          </div>

          {/* Client */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {formatters.capitalize(gig.ownerId.name?.charAt(0))}
            </div>
            <div>
              <p className="text-sm text-gray-600">Client</p>
              <p className="font-medium text-gray-900">{gig.ownerId.name}</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-medium text-gray-900 capitalize">
                {gig.status}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            About this gig
          </h2>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {gig.description}
          </p>
        </div>

        {/* Action Button */}
        {!isOwner && gig.status === 'open' && (
          <div className="pt-6 border-t border-gray-200">
            {gig.userHasBid ? (
              <Button variant="secondary" size="full" disabled>
                Bid Submitted
              </Button>
            ) : (
              <Button
                variant="primary"
                size="full"
                onClick={handleBidClick}
              >
                {isAuthenticated ? 'Submit Your Bid' : 'Login to Bid'}
              </Button>
            )}
          </div>
        )}

        {isOwner && gig.status === 'open' && (
          <div className="pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                This is your gig. Check the bids section to review freelancer proposals.
              </p>
              <Button
                variant="danger"
                size="sm"
                onClick={onDelete}
              >
                Delete Gig
              </Button>
            </div>
          </div>
        )}

        {gig.status === 'assigned' && (
          <div className="pt-6 border-t border-gray-200 bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-700">
              ✓ This gig has been assigned to a freelancer.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default GigDetail;