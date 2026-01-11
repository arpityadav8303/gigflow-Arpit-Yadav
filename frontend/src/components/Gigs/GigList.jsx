import React from 'react';
import GigCard from './GigCard';
import Loader from '../Common/Loader';

const GigList = ({ gigs, loading, error, emptyMessage = 'No gigs found' }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  if (!gigs || gigs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {gigs.map((gig) => (
        <GigCard key={gig._id} gig={gig} />
      ))}
    </div>
  );
};

export default GigList;