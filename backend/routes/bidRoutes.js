const express = require('express');
const { submitBid, getBidsForGig, hireBid } = require('../controllers/bidController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.post('/', authMiddleware, submitBid);
router.get('/:gigId', authMiddleware, getBidsForGig);
router.patch('/:bidId/hire', authMiddleware, hireBid);

module.exports = router;