// Placeholder
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modals: {
    loginModal: false,
    registerModal: false,
    createGigModal: false,
    bidModal: false,
    confirmModal: false,
  },
  theme: localStorage.getItem('theme') || 'light',
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Open modal
    openModal: (state, action) => {
      const modalName = action.payload;
      if (state.modals[modalName] !== undefined) {
        state.modals[modalName] = true;
      }
    },

    // Close modal
    closeModal: (state, action) => {
      const modalName = action.payload;
      if (state.modals[modalName] !== undefined) {
        state.modals[modalName] = false;
      }
    },

    // Toggle modal
    toggleModal: (state, action) => {
      const modalName = action.payload;
      if (state.modals[modalName] !== undefined) {
        state.modals[modalName] = !state.modals[modalName];
      }
    },

    // Close all modals
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach((key) => {
        state.modals[key] = false;
      });
    },

    // Toggle theme
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },

    // Toggle sidebar
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },

    // Close sidebar
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
  },
});

export const {
  openModal,
  closeModal,
  toggleModal,
  closeAllModals,
  toggleTheme,
  toggleSidebar,
  closeSidebar,
} = uiSlice.actions;

export default uiSlice.reducer;