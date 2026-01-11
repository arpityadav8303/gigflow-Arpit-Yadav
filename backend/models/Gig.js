const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title']
    },
    description: {
      type: String,
      required: [true, 'Please provide a description']
    },
    budget: {
      type: Number,
      required: [true, 'Please provide a budget']
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['open', 'assigned'],
      default: 'open'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gig', gigSchema);