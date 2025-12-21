const express = require('express');
const router = express.Router();
const {
  createPurchase,
  getMyPurchases,
  getAllPurchases
} = require('../controllers/purchaseController');
const { protect, admin } = require('../middleware/auth');

router.post('/', protect, createPurchase);
router.get('/my-purchases', protect, getMyPurchases);
router.get('/', protect, admin, getAllPurchases);

module.exports = router;
