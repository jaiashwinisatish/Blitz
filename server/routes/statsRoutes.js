const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/statsController');
const { protect, admin } = require('../middleware/auth');

router.get('/', protect, admin, getStats);

module.exports = router;
