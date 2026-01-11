import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MessageSquare } from 'lucide-react';
import { useBids } from '../../hooks/useBids';
import { useNotification } from '../../hooks/useNotification';
import { validators } from '../../utils/validators';
import Button from '../Common/Button';

const BidForm = ({ gigId, onSuccess }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { submitNewBid, loading } = useBids();
  const { success, error: errorNotif } = useNotification();
  const [formError, setFormError] = useState(null);

  const onSubmit = async (data) => {
    try {
      setFormError(null);
      await submitNewBid(gigId, data.message);
      success('Bid submitted successfully!');
      reset();
      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMsg = err || 'Failed to submit bid. Please try again.';
      setFormError(errorMsg);
      errorNotif(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Error Alert */}
      {formError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{formError}</p>
        </div>
      )}

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Proposal
          <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          placeholder="Tell the client why you're the best fit for this job..."
          rows="5"
          {...register('message', {
            required: 'Proposal message is required',
            validate: validators.bidMessage,
          })}
          disabled={loading}
          className={`
            w-full px-4 py-2 border rounded-lg transition-colors resize-none
            ${
              errors.message
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }
            focus:outline-none focus:ring-2 focus:ring-offset-0
          `}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Info Box */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-700">
          💡 <strong>Tip:</strong> Write a compelling proposal. Include your experience and why you're perfect for this job.
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="full"
        loading={loading}
        disabled={loading}
      >
        Submit Bid
      </Button>
    </form>
  );
};

export default BidForm;