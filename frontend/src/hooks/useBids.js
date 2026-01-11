import { useDispatch, useSelector } from 'react-redux';
import bidService from '../services/bidService';
import { useGigs } from './useGigs';
import {
  setBidsByGig,
  addBid,
  updateBidStatus,
  updateBidsAfterHire,
  setLoading,
  setError,
  clearError,
} from '../store/slices/bidSlice';

export const useBids = () => {
  const dispatch = useDispatch();
  const { bids, bidsByGig, loading, error } = useSelector(
    (state) => state.bids
  );
  const { handleGigStatusUpdate } = useGigs();

  // Fetch bids for a specific gig
  const fetchBidsForGig = async (gigId) => {
    try {
      dispatch(setLoading(true));
      const bidsData = await bidService.getBidsForGig(gigId);
      dispatch(setBidsByGig({ gigId, bids: bidsData }));
    } catch (err) {
      dispatch(setError(err));
    }
  };

  // Submit a new bid
  const submitNewBid = async (gigId, message) => {
    try {
      dispatch(setLoading(true));
      const newBid = await bidService.submitBid(gigId, message);
      dispatch(addBid({ gigId, bid: newBid }));
      return newBid;
    } catch (err) {
      dispatch(setError(err));
      throw err;
    }
  };

  // Hire a freelancer
  const hireFreelancer = async (gigId, bidId) => {
    try {
      dispatch(setLoading(true));
      const hiredBid = await bidService.hireBid(bidId);
      
      // Update bid status to hired
      dispatch(updateBidStatus({ bidId, status: 'hired' }));
      
      // Reject other bids
      dispatch(updateBidsAfterHire({ gigId, hiredBidId: bidId }));
      
      // Update gig status to assigned
      handleGigStatusUpdate(gigId, 'assigned');
      
      return hiredBid;
    } catch (err) {
      dispatch(setError(err));
      throw err;
    }
  };

  // Handle socket update for hired notification
  const handleHiredNotification = (data) => {
    console.log('You have been hired for:', data.gigTitle);
    // This will be handled by socket listener in component
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    bids,
    bidsByGig,
    loading,
    error,
    fetchBidsForGig,
    submitNewBid,
    hireFreelancer,
    handleHiredNotification,
    clearError: handleClearError,
  };
};