import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import { validators } from '../../utils/validators';
import Input from '../Common/Input';
import Button from '../Common/Button';

const LoginForm = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, loading, error, clearError } = useAuth();
  const { success, error: errorNotif } = useNotification();
  const [formError, setFormError] = useState(null);

  const onSubmit = async (data) => {
    try {
      setFormError(null);
      clearError();
      await login(data.email, data.password);
      success('Logged in successfully!');
      onSuccess();
    } catch (err) {
      const errorMsg = err || 'Login failed. Please try again.';
      setFormError(errorMsg);
      errorNotif(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Error Alert */}
      {(formError || error) && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{formError || error}</p>
        </div>
      )}

      {/* Email */}
      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        icon={<Mail size={18} />}
        {...register('email', {
          required: 'Email is required',
          validate: validators.email,
        })}
        error={errors.email?.message}
        disabled={loading}
      />

      {/* Password */}
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        icon={<Lock size={18} />}
        {...register('password', {
          required: 'Password is required',
          validate: validators.password,
        })}
        error={errors.password?.message}
        disabled={loading}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="full"
        loading={loading}
        disabled={loading}
      >
        Login
      </Button>

      {/* Footer Text */}
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
          Sign up here
        </a>
      </p>
    </form>
  );
};

export default LoginForm;