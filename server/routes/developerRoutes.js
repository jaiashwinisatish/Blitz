const express = require('express');
const router = express.Router();
const {
  getDevelopers,
  getDeveloper,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper
} = require('../controllers/developerController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .get(getDevelopers)
  .post(protect, admin, createDeveloper);

router.route('/:id')
  .get(getDeveloper)
  .put(protect, admin, updateDeveloper)
  .delete(protect, admin, deleteDeveloper);

module.exports = router;
