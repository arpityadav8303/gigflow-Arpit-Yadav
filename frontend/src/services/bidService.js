import api from './api';

const bidService = {
  // Submit a bid on a gig
  submitBid: async (gigId, message, price) => {
    try {
      const response = await api.post('/bids', {
        gigId,
        message,
        price
      });
      return response.data.bid;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to submit bid';
    }
  },

  // Get all bids for a specific gig (Owner only)
  getBidsForGig: async (gigId) => {
    try {
      const response = await api.get(`/bids/${gigId}`);
      return response.data.bids;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch bids';
    }
  },

  // Hire a freelancer (Select a bid)
  hireBid: async (bidId) => {
    try {
      const response = await api.patch(`/bids/${bidId}/hire`);
      return response.data.bid;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to hire freelancer';
    }
  },
};

export default bidService;