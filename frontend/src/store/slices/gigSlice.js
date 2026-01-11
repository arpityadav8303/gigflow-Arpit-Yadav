// Placeholder
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gigs: [],
  selectedGig: null,
  loading: false,
  error: null,
  searchQuery: '',
  filter: 'all', // all, open, assigned
};

const gigSlice = createSlice({
  name: 'gigs',
  initialState,
  reducers: {
    // Set all gigs
    setGigs: (state, action) => {
      state.gigs = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Set single gig
    setSelectedGig: (state, action) => {
      state.selectedGig = action.payload;
    },

    // Add new gig
    addGig: (state, action) => {
      state.gigs.unshift(action.payload);
    },

    // Update gig status
    updateGigStatus: (state, action) => {
      const { gigId, status } = action.payload;
      const gig = state.gigs.find((g) => g._id === gigId);
      if (gig) {
        gig.status = status;
      }
      if (state.selectedGig && state.selectedGig._id === gigId) {
        state.selectedGig.status = status;
      }
    },

    // Set search query
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    // Set filter
    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    // Set loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set error
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setGigs,
  setSelectedGig,
  addGig,
  updateGigStatus,
  setSearchQuery,
  setFilter,
  setLoading,
  setError,
  clearError,
} = gigSlice.actions;

export default gigSlice.reducer;