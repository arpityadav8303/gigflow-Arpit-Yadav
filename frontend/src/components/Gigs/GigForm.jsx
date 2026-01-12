import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Briefcase, FileText, DollarSign } from 'lucide-react';
import { useGigs } from '../../hooks/useGigs';
import { useNotification } from '../../hooks/useNotification';
import { validators } from '../../utils/validators';
import Input from '../Common/Input';
import Button from '../Common/Button';
import Card from '../Common/Card';

const GigForm = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createNewGig, loading } = useGigs();
  const { success, error: errorNotif } = useNotification();
  const [formError, setFormError] = useState(null);

  const onSubmit = async (data) => {
    try {
      setFormError(null);
      await createNewGig(
        data.title,
        data.description,
        parseFloat(data.budget),
        data.category || 'Other'
      );
      success('Gig created successfully!');
      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMsg = err || 'Failed to create gig. Please try again.';
      setFormError(errorMsg);
      errorNotif(errorMsg);
    }
  };

  return (
    <Card title="Post a New Gig" shadow className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Error Alert */}
        {formError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{formError}</p>
          </div>
        )}

        {/* Title */}
        <Input
          label="Gig Title"
          type="text"
          placeholder="e.g., Build a React Dashboard"
          icon={<Briefcase size={18} />}
          {...register('title', {
            required: 'Title is required',
            validate: validators.gigTitle,
          })}
          error={errors.title?.message}
          disabled={loading}
          required
        />

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
            <span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            id="description"
            placeholder="Describe your gig in detail..."
            rows="6"
            {...register('description', {
              required: 'Description is required',
              validate: validators.gigDescription,
            })}
            disabled={loading}
            className={`
              w-full px-4 py-2 border rounded-lg transition-colors
              ${errors.description
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }
              focus:outline-none focus:ring-2 focus:ring-offset-0
            `}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Budget ($)"
            type="number"
            placeholder="e.g., 5000"
            icon={<DollarSign size={18} />}
            {...register('budget', {
              required: 'Budget is required',
              validate: validators.budget,
              valueAsNumber: true
            })}
            error={errors.budget?.message}
            disabled={loading}
            required
            step="0.01"
            min="0"
          />

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              {...register('category')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              disabled={loading}
            >
              <option value="Other">Other</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Design">Design</option>
              <option value="Content Writing">Content Writing</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            💡 <strong>Tip:</strong> Be detailed in your description to attract better freelancers and get faster responses.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <Button
            type="submit"
            variant="primary"
            size="full"
            loading={loading}
            disabled={loading}
          >
            Post Gig
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default GigForm;