import api from './api';

const gigService = {
  // Get all open gigs
  getAllGigs: async (searchQuery = '') => {
    try {
      const response = await api.get('/gigs', {
        params: {
          search: searchQuery,
        },
      });
      return response.data.gigs;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch gigs';
    }
  },

  // Get single gig by ID
  getGigById: async (gigId) => {
    try {
      const response = await api.get(`/gigs/${gigId}`);
      return response.data.gig;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch gig';
    }
  },

  // Create new gig
  createGig: async (title, description, budget) => {
    try {
      const response = await api.post('/gigs', {
        title,
        description,
        budget,
      });
      return response.data.gig;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create gig';
    }
  },

  // Search gigs by title
  searchGigs: async (searchQuery) => {
    try {
      const response = await api.get('/gigs', {
        params: {
          search: searchQuery,
        },
      });
      return response.data.gigs;
    } catch (error) {
      throw error.response?.data?.message || 'Search failed';
    }
  },
};

export default gigService;