// middleware/validation.js

const validateGig = (req, res, next) => {
  const { title, description, budget, category } = req.body;
  const errors = [];

  if (!title || title.trim().length < 5) {
    errors.push('Title must be at least 5 characters');
  }

  if (!description || description.trim().length < 20) {
    errors.push('Description must be at least 20 characters');
  }

  if (!budget || isNaN(budget) || budget < 1) {
    errors.push('Budget must be a number greater than 0');
  }

  if (category && !['Web Development', 'Mobile App', 'Design', 'Content Writing', 'Digital Marketing', 'Other'].includes(category)) {
    errors.push('Invalid category');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateBid = (req, res, next) => {
  const { gigId, message, price } = req.body;
  const errors = [];

  if (!gigId) {
    errors.push('Gig ID is required');
  }

  if (!message || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  if (!price || isNaN(price) || price < 1) {
    errors.push('Price must be a number greater than 0');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

module.exports = {
  validateGig,
  validateBid
};