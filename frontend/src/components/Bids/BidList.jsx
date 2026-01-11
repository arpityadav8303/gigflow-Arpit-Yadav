import React from 'react';
import { Users } from 'lucide-react';
import Card from '../Common/Card';
import BidCard from './BidCard';
import Loader from '../Common/Loader';

const BidList = ({ gigId, bids, loading, isOwner }) => {
  // Count bids by status
  const pendingCount = bids?.filter((b) => b.status === 'pending').length || 0;
  const hiredCount = bids?.filter((b) => b.status === 'hired').length || 0;
  const rejectedCount = bids?.filter((b) => b.status === 'rejected').length || 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader size="lg" />
      </div>
    );
  }

  if (!bids || bids.length === 0) {
    return (
      <Card title="Bids" subtitle={`${bids?.length || 0} total bids`}>
        <div className="text-center py-8">
          <Users size={40} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">No bids yet. Check back soon!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title="Bids"
      subtitle={`${bids.length} total bids (${pendingCount} pending, ${hiredCount} hired, ${rejectedCount} rejected)`}
    >
      <div className="space-y-4">
        {/* Pending Bids */}
        {pendingCount > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Pending Bids ({pendingCount})
            </h3>
            <div className="space-y-3">
              {bids
                .filter((bid) => bid.status === 'pending')
                .map((bid) => (
                  <BidCard
                    key={bid._id}
                    bid={bid}
                    isOwner={isOwner}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Hired Bid */}
        {hiredCount > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 text-green-600">
              Hired ({hiredCount})
            </h3>
            <div className="space-y-3">
              {bids
                .filter((bid) => bid.status === 'hired')
                .map((bid) => (
                  <BidCard
                    key={bid._id}
                    bid={bid}
                    isOwner={isOwner}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Rejected Bids */}
        {rejectedCount > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 text-red-600">
              Rejected ({rejectedCount})
            </h3>
            <div className="space-y-3">
              {bids
                .filter((bid) => bid.status === 'rejected')
                .map((bid) => (
                  <BidCard
                    key={bid._id}
                    bid={bid}
                    isOwner={isOwner}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BidList;