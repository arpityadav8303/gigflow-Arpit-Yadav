// App Info
export const APP_NAME = 'GigFlow';
export const APP_DESCRIPTION = 'Freelance Marketplace Platform';

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  GIGS_FEED: '/gigs',
  GIG_DETAIL: '/gigs/:id',
  CREATE_GIG: '/create-gig',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  NOT_FOUND: '/404',
};

// Gig Status
export const GIG_STATUS = {
  OPEN: 'open',
  ASSIGNED: 'assigned',
};

// Bid Status
export const BID_STATUS = {
  PENDING: 'pending',
  HIRED: 'hired',
  REJECTED: 'rejected',
};

// Form Validation Rules
export const VALIDATION = {
  NAME_MIN: 2,
  NAME_MAX: 50,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN: 6,
  PASSWORD_MAX: 50,
  TITLE_MIN: 5,
  TITLE_MAX: 100,
  DESCRIPTION_MIN: 20,
  DESCRIPTION_MAX: 5000,
  BUDGET_MIN: 1,
  BUDGET_MAX: 1000000,
  BID_MESSAGE_MIN: 10,
  BID_MESSAGE_MAX: 500,
};

// Modal Names
export const MODALS = {
  LOGIN: 'loginModal',
  REGISTER: 'registerModal',
  CREATE_GIG: 'createGigModal',
  BID: 'bidModal',
  CONFIRM: 'confirmModal',
};

// Pagination
export const PAGINATION = {
  ITEMS_PER_PAGE: 10,
  ITEMS_PER_PAGE_MOBILE: 5,
};

// Currencies
export const CURRENCY = {
  SYMBOL: '$',
  CODE: 'USD',
};

// Time Formats
export const DATE_FORMAT = 'DD/MM/YYYY';
export const TIME_FORMAT = 'HH:mm';
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm';

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },
  GIGS: {
    GET_ALL: '/gigs',
    GET_ONE: '/gigs/:id',
    CREATE: '/gigs',
  },
  BIDS: {
    SUBMIT: '/bids',
    GET_FOR_GIG: '/bids/:gigId',
    HIRE: '/bids/:bidId/hire',
  },
};

// UI Colors
export const COLORS = {
  PRIMARY: '#3b82f6',
  SECONDARY: '#1f2937',
  SUCCESS: '#10b981',
  ERROR: '#ef4444',
  WARNING: '#f59e0b',
  INFO: '#0ea5e9',
};

// Toast Messages
export const TOAST_MESSAGES = {
  // Success
  LOGIN_SUCCESS: 'Logged in successfully!',
  REGISTER_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  GIG_CREATED: 'Gig created successfully!',
  BID_SUBMITTED: 'Bid submitted successfully!',
  FREELANCER_HIRED: 'Freelancer hired successfully!',

  // Error
  LOGIN_FAILED: 'Login failed. Please try again.',
  REGISTER_FAILED: 'Registration failed. Please try again.',
  GIG_CREATION_FAILED: 'Failed to create gig.',
  BID_SUBMISSION_FAILED: 'Failed to submit bid.',
  HIRE_FAILED: 'Failed to hire freelancer.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  PASSWORD_MISMATCH: 'Passwords do not match.',
};

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters',
  NAME_TOO_SHORT: 'Name must be at least 2 characters',
  BUDGET_INVALID: 'Budget must be a positive number',
  SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
};

// Sorting Options
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'budget_high', label: 'Highest Budget' },
  { value: 'budget_low', label: 'Lowest Budget' },
];

// Filter Options
export const FILTER_OPTIONS = [
  { value: 'all', label: 'All Gigs' },
  { value: 'open', label: 'Open Gigs' },
  { value: 'assigned', label: 'Assigned Gigs' },
];

// Breakpoints
export const BREAKPOINTS = {
  XS: '320px',
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
};