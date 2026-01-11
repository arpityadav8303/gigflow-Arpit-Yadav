import React from 'react';
import { MessageCircle, Calendar } from 'lucide-react';
import Card from '../Common/Card';
import Badge from '../Common/Badge';
import HireButton from './HireButton';
import { formatters } from '../../utils/formatters';

const BidCard = ({ bid, isOwner }) => {
  return (
    <Card hover shadow className="mb-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
        <div className="flex-1">
          {/* Freelancer Info */}
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {formatters.capitalize(bid.freelancerId.name?.charAt(0))}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                {bid.freelancerId.name}
              </h4>
              <p className="text-xs text-gray-500">{bid.freelancerId.email}</p>
            </div>
          </div>
        </div>
        <Badge status={bid.status} size="sm" />
      </div>

      {/* Message */}
      <div className="mb-4">
        <div className="flex items-start space-x-2 mb-2">
          <MessageCircle size={16} className="text-gray-400 mt-1" />
          <p className="text-gray-700 text-sm leading-relaxed">
            {bid.message}
          </p>
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex items-center justify-between text-xs text-gray-500 py-3 border-t border-gray-200">
        <div className="flex items-center space-x-1">
          <Calendar size={14} />
          <span>
            Submitted {formatters.relativeTime(bid.createdAt)}
          </span>
        </div>
      </div>

      {/* Action Button */}
      {isOwner && bid.status === 'pending' && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <HireButton
            bid={bid}
            gigId={bid.gigId}
            isOwner={isOwner}
          />
        </div>
      )}
    </Card>
  );
};

export default BidCard;