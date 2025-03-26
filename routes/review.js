const express = require('express');
const router = express.Router();
const { getReviews } = require('../controllers/reviewController');

// GET /api/reviews?page=1&limit=10
router.get('/', getReviews);

module.exports = router;