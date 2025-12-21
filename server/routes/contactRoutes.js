const express = require('express');
const router = express.Router();
const {
  createContactRequest,
  getContactRequests,
  updateContactRequest,
  deleteContactRequest
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .post(createContactRequest)
  .get(protect, admin, getContactRequests);

router.route('/:id')
  .put(protect, admin, updateContactRequest)
  .delete(protect, admin, deleteContactRequest);

module.exports = router;
