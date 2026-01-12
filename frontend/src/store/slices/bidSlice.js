// frontend/src/slices/bidsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true
});

export const submitBid = createAsyncThunk(
  'bids/submitBid',
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.post('/bids', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit bid');
    }
  }
);

export const fetchGigBids = createAsyncThunk(
  'bids/fetchGigBids',
  async (gigId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/bids/gig/${gigId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bids');
    }
  }
);

export const fetchMyBids = createAsyncThunk(
  'bids/fetchMyBids',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await API.get('/bids/my-bids', {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch your bids');
    }
  }
);

export const hireBid = createAsyncThunk(
  'bids/hireBid',
  async (bidId, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/bids/${bidId}/hire`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to hire bid');
    }
  }
);

export const deleteBid = createAsyncThunk(
  'bids/deleteBid',
  async (bidId, { rejectWithValue }) => {
    try {
      await API.delete(`/bids/${bidId}`);
      return bidId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete bid');
    }
  }
);

const initialState = {
  gigBids: [],
  myBids: [],
  total: 0,
  pages: 0,
  currentPage: 1,
  loading: false,
  error: null,
  success: false,
  notification: null
};

const bidsSlice = createSlice({
  name: 'bids',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitBid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitBid.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.myBids.unshift(action.payload.bid);
      })
      .addCase(submitBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchGigBids.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGigBids.fulfilled, (state, action) => {
        state.loading = false;
        state.gigBids = action.payload.bids;
      })
      .addCase(fetchGigBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyBids.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyBids.fulfilled, (state, action) => {
        state.loading = false;
        state.myBids = action.payload.bids;
        state.total = action.payload.total;
        state.pages = action.payload.pages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchMyBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(hireBid.pending, (state) => {
        state.loading = true;
      })
      .addCase(hireBid.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.gigBids.findIndex(b => b._id === action.payload.bid._id);
        if (index !== -1) {
          state.gigBids[index] = action.payload.bid;
        }
      })
      .addCase(hireBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBid.fulfilled, (state, action) => {
        state.myBids = state.myBids.filter(b => b._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteBid.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { clearError, clearSuccess, setNotification, clearNotification } = bidsSlice.actions;
export default bidsSlice.reducer;