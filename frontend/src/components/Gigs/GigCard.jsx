import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase } from 'lucide-react';
import Card from '../Common/Card';
import Badge from '../Common/Badge';
import { formatters } from '../../utils/formatters';
import { ROUTES } from '../../utils/constants';

const GigCard = ({ gig }) => {
  return (
    <Link to={`/gigs/${gig._id}`}>
      <Card hover shadow className="h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {gig.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Posted {formatters.relativeTime(gig.createdAt)}
            </p>
          </div>
          <Badge status={gig.status} size="sm" />
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {gig.description}
        </p>

        {/* Budget & Owner */}
        <div className="space-y-3 border-t border-gray-200 pt-4">
          {/* Budget */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm">Budget</span>
            <span className="text-lg font-bold text-gray-900">
              {formatters.price(gig.budget)}
            </span>
          </div>

          {/* Owner */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {formatters.capitalize(gig.ownerId.name?.charAt(0))}
            </div>
            <span className="text-sm text-gray-700">
              {gig.ownerId.name}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default GigCard;