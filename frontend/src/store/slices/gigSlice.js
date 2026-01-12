// frontend/src/slices/gigsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true
});

export const fetchGigs = createAsyncThunk(
  'gigs/fetchGigs',
  async ({ search, category, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await API.get('/gigs', {
        params: { search, category, page, limit }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch gigs');
    }
  }
);

export const fetchMyGigs = createAsyncThunk(
  'gigs/fetchMyGigs',
  async ({ status, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await API.get('/gigs/my-gigs', {
        params: { status, page, limit }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch your gigs');
    }
  }
);

export const fetchGigDetail = createAsyncThunk(
  'gigs/fetchGigDetail',
  async (gigId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/gigs/${gigId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch gig');
    }
  }
);

export const createGig = createAsyncThunk(
  'gigs/createGig',
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.post('/gigs', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create gig');
    }
  }
);

export const updateGig = createAsyncThunk(
  'gigs/updateGig',
  async ({ gigId, data }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/gigs/${gigId}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update gig');
    }
  }
);

export const deleteGig = createAsyncThunk(
  'gigs/deleteGig',
  async (gigId, { rejectWithValue }) => {
    try {
      await API.delete(`/gigs/${gigId}`);
      return gigId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete gig');
    }
  }
);

const initialState = {
  gigs: [],
  myGigs: [],
  selectedGig: null,
  total: 0,
  pages: 0,
  currentPage: 1,
  loading: false,
  error: null,
  success: false
};

const gigsSlice = createSlice({
  name: 'gigs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.gigs = action.payload.gigs;
        state.total = action.payload.total;
        state.pages = action.payload.pages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyGigs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.myGigs = action.payload.gigs;
      })
      .addCase(fetchMyGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchGigDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGigDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedGig = action.payload.gig;
        if (action.payload.userHasBid !== undefined) {
          state.selectedGig.userHasBid = action.payload.userHasBid;
        }
      })
      .addCase(fetchGigDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createGig.fulfilled, (state, action) => {
        state.myGigs.unshift(action.payload.gig);
        state.success = true;
      })
      .addCase(createGig.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateGig.fulfilled, (state, action) => {
        const index = state.myGigs.findIndex(g => g._id === action.payload.gig._id);
        if (index !== -1) {
          state.myGigs[index] = action.payload.gig;
        }
        state.selectedGig = action.payload.gig;
        state.success = true;
      })
      .addCase(updateGig.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteGig.fulfilled, (state, action) => {
        state.myGigs = state.myGigs.filter(g => g._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteGig.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { clearError, clearSuccess } = gigsSlice.actions;
export default gigsSlice.reducer;