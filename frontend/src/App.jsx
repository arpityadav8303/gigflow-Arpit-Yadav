import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import MainLayout from './components/Layout/MainLayout';

// Pages
import Home from './pages/Home';
import GigsFeed from './pages/GigsFeed';
import CreateGig from './pages/CreateGig';
import GigDetail from './pages/GigDetail';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

// App Content Component (inside Router)
const AppContent = ({ isAuthenticated }) => {
  return (
    <MainLayout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/gigs" element={<GigsFeed />} />
        <Route path="/gigs/:id" element={<GigDetail />} />

        {/* Protected Routes */}
        <Route
          path="/create-gig"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreateGig />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

// Main App Component
function App() {
  // Check if user is authenticated from localStorage
  const isAuthenticated = !!localStorage.getItem('user');

  return (
    <Provider store={store}>
      <Router>
        <AppContent isAuthenticated={isAuthenticated} />
      </Router>
    </Provider>
  );
}

export default App;