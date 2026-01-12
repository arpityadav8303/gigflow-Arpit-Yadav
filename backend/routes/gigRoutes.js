// routes/gigs.js
const express = require('express');
const Gig = require('../models/Gig');
const Bid = require('../models/Bid');
const { auth } = require('../middleware/auth');
const { validateGig } = require('../middleware/validation');

const router = express.Router();

// GET all open gigs with search and pagination
router.get('/', async (req, res, next) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    const query = { status: 'open' };

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.category = category;
    }

    const skip = (page - 1) * limit;
    const total = await Gig.countDocuments(query);
    const gigs = await Gig.find(query)
      .populate('ownerId', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      gigs
    });
  } catch (error) {
    next(error);
  }
});

// GET gigs posted by user
router.get('/my-gigs', auth, async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = { ownerId: req.userId };

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;
    const total = await Gig.countDocuments(query);
    const gigs = await Gig.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      gigs
    });
  } catch (error) {
    next(error);
  }
});

// GET single gig with bids
router.get('/:gigId', async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.gigId)
      .populate('ownerId', 'name avatar bio hourlyRate');

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    // Get bid count
    const bidCount = await Bid.countDocuments({ gigId: gig._id });
    gig.bidCount = bidCount;

    let userHasBid = false;
    const token = req.cookies.token;

    if (token) {
      try {
        const decoded = require('jsonwebtoken').verify(token, process.env.JWT_SECRET);
        const existingBid = await Bid.exists({
          gigId: gig._id,
          freelancerId: decoded.id
        });
        if (existingBid) {
          userHasBid = true;
        }
      } catch (err) {
        // Ignore token errors for public route
      }
    }

    res.status(200).json({
      success: true,
      gig,
      userHasBid
    });
  } catch (error) {
    next(error);
  }
});

// POST create new gig
router.post('/', auth, validateGig, async (req, res, next) => {
  try {
    const { title, description, budget, category, deadline } = req.body;

    const gig = new Gig({
      title,
      description,
      budget,
      category,
      deadline,
      ownerId: req.userId,
      ownerName: req.userName
    });

    await gig.save();

    res.status(201).json({
      success: true,
      message: 'Gig created successfully',
      gig
    });
  } catch (error) {
    next(error);
  }
});

// PUT update gig
router.put('/:gigId', auth, validateGig, async (req, res, next) => {
  try {
    const { title, description, budget, category, deadline } = req.body;

    const gig = await Gig.findById(req.params.gigId);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    // Check ownership
    if (gig.ownerId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: You can only edit your own gigs'
      });
    }

    // Cannot edit if gig is assigned
    if (gig.status !== 'open') {
      return res.status(400).json({
        success: false,
        message: 'Cannot edit gig that is not open'
      });
    }

    Object.assign(gig, { title, description, budget, category, deadline });
    await gig.save();

    res.status(200).json({
      success: true,
      message: 'Gig updated successfully',
      gig
    });
  } catch (error) {
    next(error);
  }
});

// DELETE gig
router.delete('/:gigId', auth, async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.gigId);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    // Check ownership
    if (gig.ownerId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: You can only delete your own gigs'
      });
    }

    // Only allow deletion of open gigs
    if (gig.status !== 'open') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete gig that is already assigned'
      });
    }

    // Delete related bids
    await Bid.deleteMany({ gigId: gig._id });
    await Gig.findByIdAndDelete(gig._id);

    res.status(200).json({
      success: true,
      message: 'Gig deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;