const Developer = require('../models/Developer');

// @desc    Get all developers
// @route   GET /api/developers
// @access  Public
exports.getDevelopers = async (req, res) => {
  try {
    const developers = await Developer.find({ status: 'active' })
      .sort({ createdAt: -1 });
    res.json(developers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single developer
// @route   GET /api/developers/:id
// @access  Public
exports.getDeveloper = async (req, res) => {
  try {
    const developer = await Developer.findById(req.params.id);
    if (!developer) {
      return res.status(404).json({ message: 'Developer not found' });
    }
    res.json(developer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create developer
// @route   POST /api/developers
// @access  Private/Admin
exports.createDeveloper = async (req, res) => {
  try {
    const developer = await Developer.create(req.body);
    res.status(201).json(developer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update developer
// @route   PUT /api/developers/:id
// @access  Private/Admin
exports.updateDeveloper = async (req, res) => {
  try {
    const developer = await Developer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!developer) {
      return res.status(404).json({ message: 'Developer not found' });
    }

    res.json(developer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete developer
// @route   DELETE /api/developers/:id
// @access  Private/Admin
exports.deleteDeveloper = async (req, res) => {
  try {
    const developer = await Developer.findByIdAndDelete(req.params.id);
    if (!developer) {
      return res.status(404).json({ message: 'Developer not found' });
    }
    res.json({ message: 'Developer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
