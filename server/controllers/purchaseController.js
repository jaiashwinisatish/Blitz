const Purchase = require('../models/Purchase');
const Project = require('../models/Project');
const User = require('../models/User');

// @desc    Create purchase
// @route   POST /api/purchases
// @access  Private
exports.createPurchase = async (req, res) => {
  try {
    const { projectId } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user already purchased
    const existingPurchase = await Purchase.findOne({
      user: req.user._id,
      project: projectId
    });

    if (existingPurchase) {
      return res.status(400).json({ message: 'You have already purchased this project' });
    }

    // Create purchase
    const purchase = await Purchase.create({
      user: req.user._id,
      project: projectId,
      amount: project.price,
      downloadLink: project.downloadLink,
      transactionId: `TXN${Date.now()}`
    });

    // Update project purchase count
    project.purchaseCount += 1;
    await project.save();

    // Add to user's purchased projects
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        purchasedProjects: {
          project: projectId,
          downloadLink: project.downloadLink
        }
      }
    });

    const populatedPurchase = await Purchase.findById(purchase._id)
      .populate('project', 'title image price')
      .populate('user', 'fullName email');

    res.status(201).json(populatedPurchase);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user purchases
// @route   GET /api/purchases/my-purchases
// @access  Private
exports.getMyPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user._id })
      .populate('project', 'title image price category downloadLink')
      .sort({ purchaseDate: -1 });

    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all purchases (Admin)
// @route   GET /api/purchases
// @access  Private/Admin
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate('user', 'fullName email')
      .populate('project', 'title price category')
      .sort({ purchaseDate: -1 });

    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
