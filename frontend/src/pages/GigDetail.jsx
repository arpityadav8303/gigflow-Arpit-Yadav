import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGigs } from '../hooks/useGigs';
import { useBids } from '../hooks/useBids';
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../store/slices/uiSlice';
import GigDetail from '../components/Gigs/GigDetail';
import BidList from '../components/Bids/BidList';
import BidForm from '../components/Bids/BidForm';
import Modal from '../components/Common/Modal';
import Loader from '../components/Common/Loader';

const GigDetailPage = () => {
  const { id } = useParams();
  const { selectedGig, loading: gigLoading, fetchGigById } = useGigs();
  const { bidsByGig, loading: bidsLoading, fetchBidsForGig } = useBids();
  const { user, isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const { bidModal } = useSelector((state) => state.ui.modals);

  const isOwner = isAuthenticated && user?._id === selectedGig?.ownerId?._id;
  const bids = bidsByGig[id] || [];

  // Fetch gig on mount
  useEffect(() => {
    if (id) {
      fetchGigById(id);
    }
  }, [id, fetchGigById]);

  // Fetch bids if owner
  useEffect(() => {
    if (isOwner && id) {
      fetchBidsForGig(id);
    }
  }, [isOwner, id, fetchBidsForGig]);

  const handleBidSuccess = () => {
    // Refresh bids if owner
    if (isOwner) {
      fetchBidsForGig(id);
    }
    dispatch(closeModal('bidModal'));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Gig Detail */}
      <GigDetail gig={selectedGig} loading={gigLoading} />

      {/* Bids Section */}
      {isOwner && (
        <div className="mt-12">
          <BidList
            gigId={id}
            bids={bids}
            loading={bidsLoading}
            isOwner={isOwner}
          />
        </div>
      )}

      {/* Bid Modal */}
      <Modal
        isOpen={bidModal}
        onClose={() => dispatch(closeModal('bidModal'))}
        title="Submit Your Bid"
        size="md"
      >
        <BidForm gigId={id} onSuccess={handleBidSuccess} />
      </Modal>
    </div>
  );
};

export default GigDetailPage;