const ContactRequest = require('../models/ContactRequest');

// @desc    Create contact request
// @route   POST /api/contact
// @access  Public
exports.createContactRequest = async (req, res) => {
  try {
    const { fullName, email, phone, budget, projectRequirements } = req.body;

    const contactRequest = await ContactRequest.create({
      fullName,
      email,
      phone,
      budget,
      projectRequirements
    });

    res.status(201).json({
      message: 'Team Blitzs will schedule a meeting to understand your requirements.',
      contactRequest
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all contact requests
// @route   GET /api/contact
// @access  Private/Admin
exports.getContactRequests = async (req, res) => {
  try {
    const requests = await ContactRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update contact request status
// @route   PUT /api/contact/:id
// @access  Private/Admin
exports.updateContactRequest = async (req, res) => {
  try {
    const request = await ContactRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!request) {
      return res.status(404).json({ message: 'Contact request not found' });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete contact request
// @route   DELETE /api/contact/:id
// @access  Private/Admin
exports.deleteContactRequest = async (req, res) => {
  try {
    const request = await ContactRequest.findByIdAndDelete(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Contact request not found' });
    }
    res.json({ message: 'Contact request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
