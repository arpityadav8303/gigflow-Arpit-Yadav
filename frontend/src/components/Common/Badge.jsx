import React from 'react';
import { formatters } from '../../utils/formatters';

const Badge = ({ status, className = '', size = 'md' }) => {
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const sizeClass = sizes[size] || sizes.md;
  const colorClass = formatters.statusColor(status);
  const displayText = formatters.status(status);

  return (
    <span className={`inline-block font-semibold rounded-full ${sizeClass} ${colorClass} ${className}`}>
      {displayText}
    </span>
  );
};

export default Badge;