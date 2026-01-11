import { useDispatch, useSelector } from 'react-redux';
//import { useEffect } from 'react';
import gigService from '../services/gigService';
import {
  setGigs,
  setSelectedGig,
  addGig,
  updateGigStatus,
  setSearchQuery,
  setLoading,
  setError,
  clearError,
} from '../store/slices/gigSlice';

export const useGigs = () => {
  const dispatch = useDispatch();
  const { gigs, selectedGig, loading, error, searchQuery } = useSelector(
    (state) => state.gigs
  );

  // Fetch all gigs
  const fetchGigs = async (search = '') => {
    try {
      dispatch(setLoading(true));
      const gigsData = await gigService.getAllGigs(search);
      dispatch(setGigs(gigsData));
    } catch (err) {
      dispatch(setError(err));
    }
  };

  // Fetch single gig
  const fetchGigById = async (gigId) => {
    try {
      dispatch(setLoading(true));
      const gig = await gigService.getGigById(gigId);
      dispatch(setSelectedGig(gig));
    } catch (err) {
      dispatch(setError(err));
    }
  };

  // Create new gig
  const createNewGig = async (title, description, budget) => {
    try {
      dispatch(setLoading(true));
      const newGig = await gigService.createGig(title, description, budget);
      dispatch(addGig(newGig));
      return newGig;
    } catch (err) {
      dispatch(setError(err));
      throw err;
    }
  };

  // Search gigs
  const searchGigs = async (query) => {
    try {
      dispatch(setSearchQuery(query));
      dispatch(setLoading(true));
      const gigsData = await gigService.searchGigs(query);
      dispatch(setGigs(gigsData));
    } catch (err) {
      dispatch(setError(err));
    }
  };

  // Handle gig status update (from socket or API)
  const handleGigStatusUpdate = (gigId, status) => {
    dispatch(updateGigStatus({ gigId, status }));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    gigs,
    selectedGig,
    loading,
    error,
    searchQuery,
    fetchGigs,
    fetchGigById,
    createNewGig,
    searchGigs,
    handleGigStatusUpdate,
    clearError: handleClearError,
  };
};