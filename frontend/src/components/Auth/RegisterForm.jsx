import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import { validators } from '../../utils/validators';
import Input from '../Common/Input';
import Button from '../Common/Button';

const RegisterForm = ({ onSuccess }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { register: registerUser, loading, error, clearError } = useAuth();
  const { success, error: errorNotif } = useNotification();
  const [formError, setFormError] = useState(null);
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      setFormError(null);
      clearError();
      await registerUser(data.name, data.email, data.password);
      success('Account created successfully!');
      onSuccess();
    } catch (err) {
      const errorMsg = err || 'Registration failed. Please try again.';
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

      {/* Name */}
      <Input
        label="Full Name"
        type="text"
        placeholder="John Doe"
        icon={<User size={18} />}
        {...register('name', {
          required: 'Name is required',
          validate: validators.name,
        })}
        error={errors.name?.message}
        disabled={loading}
      />

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
        placeholder="Create a password"
        icon={<Lock size={18} />}
        {...register('password', {
          required: 'Password is required',
          validate: validators.password,
        })}
        error={errors.password?.message}
        disabled={loading}
      />

      {/* Confirm Password */}
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        icon={<Lock size={18} />}
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) => validators.confirmPassword(password, value),
        })}
        error={errors.confirmPassword?.message}
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
        Create Account
      </Button>

      {/* Footer Text */}
      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
          Login here
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;