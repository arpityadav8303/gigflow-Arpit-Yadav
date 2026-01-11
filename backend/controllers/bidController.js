const Bid = require('../models/Bid');
const Gig = require('../models/Gig');
const mongoose = require('mongoose');

// Submit a bid
exports.submitBid = async (req, res) => {
  try {
    const { gigId, message } = req.body;
    const freelancerId = req.user.id;

    // Validate input
    if (!gigId || !message) {
      return res.status(400).json({ message: 'Please provide gigId and message' });
    }

    // Check if gig exists
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    // Check if gig is open
    if (gig.status !== 'open') {
      return res.status(400).json({ message: 'This gig is no longer open' });
    }

    // Check if freelancer already bid
    const existingBid = await Bid.findOne({ gigId, freelancerId });
    if (existingBid) {
      return res.status(400).json({ message: 'You already bid on this gig' });
    }

    // Create bid
    const bid = await Bid.create({
      gigId,
      freelancerId,
      message,
      status: 'pending'
    });

    res.status(201).json({
      message: 'Bid submitted successfully',
      bid
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bids for a gig (Owner only)
exports.getBidsForGig = async (req, res) => {
  try {
    const { gigId } = req.params;
    const userId = req.user.id;

    // Check if gig exists
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    // Check if user is the gig owner
    if (gig.ownerId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to view bids for this gig' });
    }

    // Get all bids
    const bids = await Bid.find({ gigId })
      .populate('freelancerId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Bids fetched successfully',
      bids
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hire a freelancer with TRANSACTION (Bonus 1: Race Condition Protection)
exports.hireBid = async (req, res) => {
  try {
    const { bidId } = req.params;
    const userId = req.user.id;

    // Find the bid
    const bid = await Bid.findById(bidId);
    if (!bid) {
      return res.status(404).json({ message: 'Bid not found' });
    }

    // Find the gig
    const gig = await Gig.findById(bid.gigId);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    // Check if user is the gig owner
    if (gig.ownerId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to hire for this gig' });
    }

    // START TRANSACTION (Bonus 1)
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Update gig status to assigned (check it's still open)
      const updatedGig = await Gig.findByIdAndUpdate(
        bid.gigId,
        { $set: { status: 'assigned' } },
        { 
          new: true,
          session,
          // Only update if status is still 'open' - prevents race condition
          runValidators: true
        }
      );

      // Check if update was successful (status was 'open')
      if (!updatedGig || updatedGig.status !== 'assigned') {
        await session.abortTransaction();
        return res.status(400).json({ message: 'This gig is no longer open - someone hired first' });
      }

      // Update selected bid to hired (check it's still pending)
      const updatedBid = await Bid.findByIdAndUpdate(
        bidId,
        { $set: { status: 'hired' } },
        { 
          new: true,
          session,
          runValidators: true
        }
      );

      // Check if update was successful (status was 'pending')
      if (!updatedBid || updatedBid.status !== 'hired') {
        await session.abortTransaction();
        return res.status(400).json({ message: 'This bid is no longer pending' });
      }

      // Reject all other bids for this gig
      await Bid.updateMany(
        { gigId: bid.gigId, _id: { $ne: bidId }, status: 'pending' },
        { status: 'rejected' },
        { session }
      );

      // COMMIT TRANSACTION
      await session.commitTransaction();

      // Bonus 2: Real-time notification via Socket.io
      const io = req.app.get('io');
      if (io) {
        // Emit to freelancer: "You have been hired for [Project Name]!"
        io.to(`user_${updatedBid.freelancerId}`).emit('hired', {
          message: `You have been hired for "${gig.title}"!`,
          gigId: gig._id,
          gigTitle: gig.title,
          budget: gig.budget
        });
      }

      res.status(200).json({
        message: 'Freelancer hired successfully',
        bid: updatedBid
      });
    } catch (error) {
      // ABORT TRANSACTION on error
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};