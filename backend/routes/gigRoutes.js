const express = require('express');
const { getAllGigs, createGig, getGigById } = require('../controllers/gigController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllGigs);
router.get('/:id', getGigById);

// Protected routes
router.post('/', authMiddleware, createGig);

module.exports = router;