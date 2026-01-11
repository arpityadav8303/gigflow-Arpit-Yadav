import { VALIDATION } from './constants';

export const validators = {
  // Validate email
  email: (email) => {
    if (!email) return 'Email is required';
    if (!VALIDATION.EMAIL_PATTERN.test(email)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  // Validate password
  password: (password) => {
    if (!password) return 'Password is required';
    if (password.length < VALIDATION.PASSWORD_MIN) {
      return `Password must be at least ${VALIDATION.PASSWORD_MIN} characters`;
    }
    if (password.length > VALIDATION.PASSWORD_MAX) {
      return `Password must not exceed ${VALIDATION.PASSWORD_MAX} characters`;
    }
    return null;
  },

  // Validate password confirmation
  confirmPassword: (password, confirmPassword) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  },

  // Validate name
  name: (name) => {
    if (!name) return 'Name is required';
    if (name.length < VALIDATION.NAME_MIN) {
      return `Name must be at least ${VALIDATION.NAME_MIN} characters`;
    }
    if (name.length > VALIDATION.NAME_MAX) {
      return `Name must not exceed ${VALIDATION.NAME_MAX} characters`;
    }
    return null;
  },

  // Validate gig title
  gigTitle: (title) => {
    if (!title) return 'Gig title is required';
    if (title.length < VALIDATION.TITLE_MIN) {
      return `Title must be at least ${VALIDATION.TITLE_MIN} characters`;
    }
    if (title.length > VALIDATION.TITLE_MAX) {
      return `Title must not exceed ${VALIDATION.TITLE_MAX} characters`;
    }
    return null;
  },

  // Validate gig description
  gigDescription: (description) => {
    if (!description) return 'Description is required';
    if (description.length < VALIDATION.DESCRIPTION_MIN) {
      return `Description must be at least ${VALIDATION.DESCRIPTION_MIN} characters`;
    }
    if (description.length > VALIDATION.DESCRIPTION_MAX) {
      return `Description must not exceed ${VALIDATION.DESCRIPTION_MAX} characters`;
    }
    return null;
  },

  // Validate budget
  budget: (budget) => {
    if (!budget) return 'Budget is required';
    const numBudget = parseFloat(budget);
    if (isNaN(numBudget)) return 'Budget must be a number';
    if (numBudget < VALIDATION.BUDGET_MIN) {
      return `Budget must be at least $${VALIDATION.BUDGET_MIN}`;
    }
    if (numBudget > VALIDATION.BUDGET_MAX) {
      return `Budget must not exceed $${VALIDATION.BUDGET_MAX}`;
    }
    return null;
  },

  // Validate bid message
  bidMessage: (message) => {
    if (!message) return 'Bid message is required';
    if (message.length < VALIDATION.BID_MESSAGE_MIN) {
      return `Message must be at least ${VALIDATION.BID_MESSAGE_MIN} characters`;
    }
    if (message.length > VALIDATION.BID_MESSAGE_MAX) {
      return `Message must not exceed ${VALIDATION.BID_MESSAGE_MAX} characters`;
    }
    return null;
  },

  // Validate required field
  required: (value, fieldName = 'This field') => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return `${fieldName} is required`;
    }
    return null;
  },

  // Validate number
  number: (value, fieldName = 'This field') => {
    if (!value) return `${fieldName} is required`;
    if (isNaN(value)) return `${fieldName} must be a number`;
    return null;
  },

  // Validate min length
  minLength: (value, length, fieldName = 'This field') => {
    if (!value) return `${fieldName} is required`;
    if (value.length < length) {
      return `${fieldName} must be at least ${length} characters`;
    }
    return null;
  },

  // Validate max length
  maxLength: (value, length, fieldName = 'This field') => {
    if (value && value.length > length) {
      return `${fieldName} must not exceed ${length} characters`;
    }
    return null;
  },

  // Validate min value
  minValue: (value, min, fieldName = 'This field') => {
    if (!value) return `${fieldName} is required`;
    if (parseFloat(value) < min) {
      return `${fieldName} must be at least ${min}`;
    }
    return null;
  },

  // Validate max value
  maxValue: (value, max, fieldName = 'This field') => {
    if (value && parseFloat(value) > max) {
      return `${fieldName} must not exceed ${max}`;
    }
    return null;
  },
};