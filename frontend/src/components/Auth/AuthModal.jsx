import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, openModal } from '../../store/slices/uiSlice';
import Modal from '../Common/Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModals = () => {
  const dispatch = useDispatch();
  const { loginModal, registerModal } = useSelector((state) => state.ui.modals);

  const handleCloseLogin = () => {
    dispatch(closeModal('loginModal'));
  };

  const handleCloseRegister = () => {
    dispatch(closeModal('registerModal'));
  };

  const handleSwitchToRegister = () => {
    dispatch(closeModal('loginModal'));
    dispatch(openModal('registerModal'));
  };

  const handleSwitchToLogin = () => {
    dispatch(closeModal('registerModal'));
    dispatch(openModal('loginModal'));
  };

  return (
    <>
      {/* Login Modal */}
      <Modal
        isOpen={loginModal}
        onClose={handleCloseLogin}
        title="Login to GigFlow"
        size="md"
        closeButton={true}
      >
        <LoginForm onSuccess={handleCloseLogin} />
        <div className="mt-4 text-center text-sm text-gray-600 border-t border-gray-200 pt-4">
          Don't have an account?{' '}
          <button
            onClick={handleSwitchToRegister}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign up here
          </button>
        </div>
      </Modal>

      {/* Register Modal */}
      <Modal
        isOpen={registerModal}
        onClose={handleCloseRegister}
        title="Create Your Account"
        size="md"
        closeButton={true}
      >
        <RegisterForm onSuccess={handleCloseRegister} />
        <div className="mt-4 text-center text-sm text-gray-600 border-t border-gray-200 pt-4">
          Already have an account?{' '}
          <button
            onClick={handleSwitchToLogin}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Login here
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AuthModals;