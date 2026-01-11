import { CURRENCY } from './constants';

export const formatters = {
  // Format price/budget
  price: (amount) => {
    if (!amount && amount !== 0) return CURRENCY.SYMBOL + '0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: CURRENCY.CODE,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  },

  // Format date to readable format
  date: (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  // Format date and time
  dateTime: (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  // Format time only
  time: (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  },

  // Format relative time (e.g., "2 hours ago")
  relativeTime: (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';

    return 'just now';
  },

  // Truncate text
  truncate: (text, length = 100) => {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  },

  // Capitalize first letter
  capitalize: (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  },

  // Format status with color
  status: (status) => {
    const statusMap = {
      open: 'Open',
      assigned: 'Assigned',
      pending: 'Pending',
      hired: 'Hired',
      rejected: 'Rejected',
    };
    return statusMap[status] || status;
  },

  // Format status badge color
  statusColor: (status) => {
    const colorMap = {
      open: 'bg-green-100 text-green-800',
      assigned: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      hired: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  },

  // Format number with commas
  number: (num) => {
    if (!num && num !== 0) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  // Format currency symbol
  currencySymbol: () => CURRENCY.SYMBOL,

  // Parse price string to number
  parsePrice: (priceString) => {
    if (!priceString) return 0;
    const cleaned = priceString.replace(/[^0-9.-]+/g, '');
    return parseFloat(cleaned) || 0;
  },

  // Format percentage
  percentage: (value, decimals = 1) => {
    if (!value && value !== 0) return '0.0%';
    return (value * 100).toFixed(decimals) + '%';
  },

  // Format name (First Last)
  fullName: (user) => {
    if (!user) return '';
    if (user.name) return user.name;
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.email || '';
  },

  // Format slug from title
  slug: (title) => {
    if (!title) return '';
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  },
};