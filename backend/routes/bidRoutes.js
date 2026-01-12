// routes/bids.js
const express = require('express');
const mongoose = require('mongoose');
const Bid = require('../models/Bid');
const Gig = require('../models/Gig');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const { validateBid } = require('../middleware/validation');

const router = express.Router();

// POST submit bid
router.post('/', auth, validateBid, async (req, res, next) => {
  try {
    const { gigId, message, price } = req.body;

    // Check if gig exists and is open
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    if (gig.status !== 'open') {
      return res.status(400).json({
        success: false,
        message: 'Cannot bid on a gig that is not open'
      });
    }

    // Check if user is not the gig owner
    if (gig.ownerId.toString() === req.userId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot bid on your own gig'
      });
    }

    // Check for existing bid from same freelancer
    const existingBid = await Bid.findOne({
      gigId,
      freelancerId: req.userId
    });

    if (existingBid) {
      return res.status(409).json({
        success: false,
        message: 'You have already bid on this gig'
      });
    }

    const bid = new Bid({
      gigId,
      freelancerId: req.userId,
      freelancerName: req.userName,
      message,
      price
    });

    await bid.save();

    // Update bid count
    await Gig.findByIdAndUpdate(gigId, { $inc: { bidCount: 1 } });

    res.status(201).json({
      success: true,
      message: 'Bid submitted successfully',
      bid
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'You have already bid on this gig'
      });
    }
    next(error);
  }
});

// GET all bids for a specific gig (owner only)
router.get('/gig/:gigId', auth, async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.gigId);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    // Check if user is gig owner
    // Debugging logs
    console.log('Gig Owner ID:', gig.ownerId.toString());
    console.log('Request User ID:', req.userId);

    if (gig.ownerId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: You can only view bids for your own gigs'
      });
    }

    const bids = await Bid.find({ gigId: req.params.gigId })
      .populate('freelancerId', 'name avatar bio hourlyRate skills')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bids
    });
  } catch (error) {
    next(error);
  }
});

// GET my bids (user's submitted bids)
router.get('/my-bids', auth, async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const total = await Bid.countDocuments({ freelancerId: req.userId });
    const bids = await Bid.find({ freelancerId: req.userId })
      .populate('gigId', 'title budget status ownerId')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      bids
    });
  } catch (error) {
    next(error);
  }
});

// PATCH hire freelancer
router.patch('/:bidId/hire', auth, async (req, res, next) => {
  try {
    const bid = await Bid.findById(req.params.bidId);

    if (!bid) {
      return res.status(404).json({
        success: false,
        message: 'Bid not found'
      });
    }

    // Check if bid is already processed
    if (bid.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending bids can be hired'
      });
    }

    const gig = await Gig.findById(bid.gigId);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    // Check ownership
    // Debugging logs
    console.log('Gig Owner ID:', gig.ownerId.toString());
    console.log('Request User ID:', req.userId);

    if (gig.ownerId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Only gig owner can hire'
      });
    }

    // Check if gig is still open (race condition check)
    if (gig.status !== 'open') {
      return res.status(400).json({
        success: false,
        message: 'This gig is no longer open'
      });
    }

    // Update bid status to hired
    bid.status = 'hired';
    await bid.save();

    // Update gig status to assigned
    gig.status = 'assigned';
    gig.hiredFreelancerId = bid.freelancerId;
    await gig.save();

    // Reject all other bids for this gig
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id }, status: 'pending' },
      { status: 'rejected' }
    );

    // Send real-time notification
    const io = req.app.get('io');
    const connectedUsers = req.app.get('connectedUsers');
    const freelancerSocketId = connectedUsers.get(bid.freelancerId.toString());

    if (freelancerSocketId && io) {
      io.to(freelancerSocketId).emit('bid:hired', {
        gigTitle: gig.title,
        gigId: gig._id,
        clientName: gig.ownerName,
        price: bid.price
      });
    }

    res.status(200).json({
      success: true,
      message: 'Freelancer hired successfully',
      bid,
      gig
    });
  } catch (error) {
    next(error);
  }
});

// DELETE bid (only if pending)
router.delete('/:bidId', auth, async (req, res, next) => {
  try {
    const bid = await Bid.findById(req.params.bidId);

    if (!bid) {
      return res.status(404).json({
        success: false,
        message: 'Bid not found'
      });
    }

    // Check if user is the bidder
    if (bid.freelancerId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: You can only delete your own bids'
      });
    }

    // Only allow deletion of pending bids
    if (bid.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete bid that has been processed'
      });
    }

    await Bid.findByIdAndDelete(bid._id);

    // Decrement bid count
    await Gig.findByIdAndUpdate(bid.gigId, { $inc: { bidCount: -1 } });

    res.status(200).json({
      success: true,
      message: 'Bid deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;