import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logout as logoutAction,
  setLoading,
  clearError,
} from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const register = async (name, email, password) => {
    try {
      dispatch(setLoading(true));
      const user = await authService.register(name, email, password);
      dispatch(registerSuccess(user));
      navigate('/dashboard');
      return user;
    } catch (err) {
      dispatch(registerFailure(err));
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      dispatch(setLoading(true));
      const user = await authService.login(email, password);
      dispatch(loginSuccess(user));
      navigate('/dashboard');
      return user;
    } catch (err) {
      dispatch(loginFailure(err));
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      dispatch(logoutAction());
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
      dispatch(logoutAction());
      navigate('/');
    }
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

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