import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {
  login as loginThunk,
  register as registerThunk,
  logout as logoutThunk,
  clearError,
} from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const register = useCallback(async (name, email, password) => {
    try {
      const user = await dispatch(registerThunk({ name, email, password })).unwrap();
      navigate('/dashboard');
      return user;
    } catch (err) {
      throw err;
    }
  }, [dispatch, navigate]);

  const login = useCallback(async (email, password) => {
    try {
      const user = await dispatch(loginThunk({ email, password })).unwrap();
      navigate('/dashboard');
      return user;
    } catch (err) {
      throw err;
    }
  }, [dispatch, navigate]);

  const logout = useCallback(async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      navigate('/login');
    }
  }, [dispatch, navigate]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    register,
    login,
    logout,
    clearError: handleClearError,
  };
};