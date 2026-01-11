import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  footer,
  className = '',
  hover = false,
  shadow = true,
  onClick = null,
  ...props
}) => {
  const baseStyles = 'bg-white rounded-lg';
  const shadowClass = shadow ? 'shadow-md' : '';
  const hoverClass = hover ? 'hover:shadow-lg transition-shadow duration-200 cursor-pointer' : '';
  const clickableClass = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseStyles} ${shadowClass} ${hoverClass} ${clickableClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {title && (
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}

      <div className="px-6 py-4">{children}</div>

      {footer && (
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;