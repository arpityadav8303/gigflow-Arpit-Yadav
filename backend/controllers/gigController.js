const Gig = require('../models/Gig');

// Get all open gigs with search
exports.getAllGigs = async (req, res) => {
  try {
    const { search } = req.query;

    let filter = { status: 'open' };

    // Search by title
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const gigs = await Gig.find(filter)
      .populate('ownerId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Gigs fetched successfully',
      gigs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new gig
exports.createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;
    const ownerId = req.user.id;

    // Validate input
    if (!title || !description || !budget) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (budget <= 0) {
      return res.status(400).json({ message: 'Budget must be greater than 0' });
    }

    // Create gig
    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId,
      status: 'open'
    });

    res.status(201).json({
      message: 'Gig created successfully',
      gig
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get gig by ID
exports.getGigById = async (req, res) => {
  try {
    const { id } = req.params;

    const gig = await Gig.findById(id).populate('ownerId', 'name email');

    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    res.status(200).json({
      message: 'Gig fetched successfully',
      gig
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};