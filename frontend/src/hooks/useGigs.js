import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  fetchGigs as fetchGigsThunk,
  fetchGigDetail as fetchGigDetailThunk,
  createGig as createGigThunk,
  // updateGig as updateGigThunk,
  deleteGig as deleteGigThunk,
  clearError,
} from '../store/slices/gigSlice';

export const useGigs = () => {
  const dispatch = useDispatch();
  const { gigs, selectedGig, loading, error } = useSelector(
    (state) => state.gigs
  );

  // Fetch all gigs
  const fetchGigs = useCallback(async (search = '', category = '', page = 1) => {
    try {
      await dispatch(fetchGigsThunk({ search, category, page })).unwrap();
    } catch (err) {
      console.error('Fetch gigs error:', err);
    }
  }, [dispatch]);

  // Fetch single gig
  const fetchGigById = useCallback(async (gigId) => {
    try {
      await dispatch(fetchGigDetailThunk(gigId)).unwrap();
    } catch (err) {
      console.error('Fetch gig detail error:', err);
    }
  }, [dispatch]);

  // Create new gig
  const createNewGig = useCallback(async (title, description, budget, category, deadline) => {
    try {
      const newGig = await dispatch(createGigThunk({ title, description, budget, category, deadline })).unwrap();
      return newGig;
    } catch (err) {
      throw err;
    }
  }, [dispatch]);

  // Delete gig
  const removeGig = useCallback(async (gigId) => {
    try {
      await dispatch(deleteGigThunk(gigId)).unwrap();
    } catch (err) {
      throw err;
    }
  }, [dispatch]);

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    gigs,
    selectedGig,
    loading,
    error,
    fetchGigs,
    fetchGigById,
    createNewGig,
    removeGig,
    clearError: handleClearError,
  };
};