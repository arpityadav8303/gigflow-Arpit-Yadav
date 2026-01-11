import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../Common/Button';
import Modal from '../Common/Modal';
import { useBids } from '../../hooks/useBids';
import { useNotification } from '../../hooks/useNotification';

const HireButton = ({ bid, gigId, isOwner, disabled = false }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { hireFreelancer } = useBids();
  const { success, error: errorNotif } = useNotification();

  // Only show if owner and bid is pending
  if (!isOwner || bid.status !== 'pending' || disabled) {
    return null;
  }

  const handleHireClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmHire = async () => {
    try {
      setLoading(true);
      await hireFreelancer(gigId, bid._id);
      success(`You hired ${bid.freelancerId.name}!`);
      setShowConfirm(false);
    } catch (err) {
      errorNotif(err || 'Failed to hire freelancer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hire Button */}
      <Button
        variant="success"
        size="full"
        onClick={handleHireClick}
        loading={loading}
        disabled={loading}
      >
        Hire This Freelancer
      </Button>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Confirm Hiring"
        size="md"
        onConfirm={handleConfirmHire}
        confirmText="Yes, Hire"
        cancelText="Cancel"
        loading={loading}
      >
        <div className="space-y-4">
          {/* Warning Icon */}
          <div className="flex items-center space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <AlertCircle size={24} className="text-blue-600" />
            <div>
              <p className="font-semibold text-gray-900">You're about to hire</p>
              <p className="text-sm text-gray-700">
                {bid.freelancerId.name}
              </p>
            </div>
          </div>

          {/* Freelancer Info */}
          <div className="space-y-3 border-t border-gray-200 pt-4">
            <h3 className="font-semibold text-gray-900">Freelancer Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium text-gray-900">
                  {bid.freelancerId.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium text-gray-900">
                  {bid.freelancerId.email}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Proposal:</span>
                <span className="font-medium text-gray-900 text-right max-w-xs">
                  {bid.message.substring(0, 50)}...
                </span>
              </div>
            </div>
          </div>

          {/* What Happens */}
          <div className="space-y-3 border-t border-gray-200 pt-4">
            <h3 className="font-semibold text-gray-900">What happens next?</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start space-x-2">
                <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>This freelancer will be marked as hired</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Other bids will be automatically rejected</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>This gig status will change to "Assigned"</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>The freelancer will receive a notification</span>
              </li>
            </ul>
          </div>

          {/* Important Note */}
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-700">
              ⚠️ <strong>Note:</strong> This action cannot be undone directly. Contact support if you need to change this decision.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HireButton;