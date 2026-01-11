// Placeholder
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bids: [],
  bidsByGig: {}, // { gigId: [bids] }
  selectedBid: null,
  loading: false,
  error: null,
};

const bidSlice = createSlice({
  name: 'bids',
  initialState,
  reducers: {
    // Set all bids
    setBids: (state, action) => {
      state.bids = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Set bids for specific gig
    setBidsByGig: (state, action) => {
      const { gigId, bids } = action.payload;
      state.bidsByGig[gigId] = bids;
      state.loading = false;
    },

    // Set selected bid
    setSelectedBid: (state, action) => {
      state.selectedBid = action.payload;
    },

    // Add new bid
    addBid: (state, action) => {
      const { gigId, bid } = action.payload;
      state.bids.unshift(bid);
      if (state.bidsByGig[gigId]) {
        state.bidsByGig[gigId].unshift(bid);
      }
    },

    // Update bid status
    updateBidStatus: (state, action) => {
      const { bidId, status } = action.payload;
      const bid = state.bids.find((b) => b._id === bidId);
      if (bid) {
        bid.status = status;
      }
      if (state.selectedBid && state.selectedBid._id === bidId) {
        state.selectedBid.status = status;
      }
    },

    // Update all bids for gig after hiring
    updateBidsAfterHire: (state, action) => {
      const { gigId, hiredBidId } = action.payload;
      if (state.bidsByGig[gigId]) {
        state.bidsByGig[gigId] = state.bidsByGig[gigId].map((bid) => {
          if (bid._id === hiredBidId) {
            return { ...bid, status: 'hired' };
          } else if (bid.status === 'pending') {
            return { ...bid, status: 'rejected' };
          }
          return bid;
        });
      }
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
  setBids,
  setBidsByGig,
  setSelectedBid,
  addBid,
  updateBidStatus,
  updateBidsAfterHire,
  setLoading,
  setError,
  clearError,
} = bidSlice.actions;

export default bidSlice.reducer;