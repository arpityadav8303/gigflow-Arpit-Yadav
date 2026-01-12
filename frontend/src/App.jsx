// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import GigsFeed from './pages/GigsFeed';
import GigDetail from './pages/GigDetail';
import MyGigs from './pages/MyGigs';
import MyBids from './pages/MyBids';
import CreateGig from './pages/CreateGig';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import { checkAuth } from './store/slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && <Navbar />}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />

          {/* Protected Routes */}
          <Route path="/" element={isAuthenticated ? <GigsFeed /> : <Navigate to="/login" />} />
          <Route path="/gigs" element={isAuthenticated ? <GigsFeed /> : <Navigate to="/login" />} />
          <Route path="/gigs/:id" element={isAuthenticated ? <GigDetail /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/create-gig" element={isAuthenticated ? <CreateGig /> : <Navigate to="/login" />} />
          <Route path="/my-gigs" element={isAuthenticated ? <MyGigs /> : <Navigate to="/login" />} />
          <Route path="/my-bids" element={isAuthenticated ? <MyBids /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/edit-gig/:id" element={isAuthenticated ? <CreateGig /> : <Navigate to="/login" />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;