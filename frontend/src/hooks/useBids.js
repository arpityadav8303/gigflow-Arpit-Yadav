import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  submitBid,
  fetchGigBids,
  fetchMyBids,
  hireBid,
  clearError,
} from '../store/slices/bidSlice';

export const useBids = () => {
  const dispatch = useDispatch();
  const { gigBids, myBids, loading, error, success } = useSelector(
    (state) => state.bids
  );

  // Fetch bids for a specific gig
  const fetchBidsForGig = useCallback(async (gigId) => {
    try {
      await dispatch(fetchGigBids(gigId)).unwrap();
    } catch (err) {
      console.error('Fetch bids error:', err);
    }
  }, [dispatch]);

  // Fetch my bids
  const fetchUserBids = useCallback(async () => {
    try {
      await dispatch(fetchMyBids({})).unwrap();
    } catch (err) {
      console.error('Fetch my bids error:', err);
    }
  }, [dispatch]);

  // Submit a new bid
  const submitNewBid = useCallback(async (gigId, message, price) => {
    try {
      const newBid = await dispatch(submitBid({ gigId, message, price })).unwrap();
      return newBid;
    } catch (err) {
      throw err;
    }
  }, [dispatch]);

  // Hire a freelancer
  const hireFreelancer = useCallback(async (gigId, bidId) => {
    try {
      const result = await dispatch(hireBid(bidId)).unwrap();
      return result;
    } catch (err) {
      throw err;
    }
  }, [dispatch]);

  // Handle socket update for hired notification
  const handleHiredNotification = (data) => {
    console.log('You have been hired for:', data.gigTitle);
    // This will be handled by socket listener in component
  };

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    gigBids,
    myBids,
    loading,
    error,
    success,
    fetchBidsForGig,
    fetchMyBids: fetchUserBids,
    submitNewBid,
    hireFreelancer,
    handleHiredNotification,
    clearError: handleClearError,
  };
};