const User = require('../models/User');
const Project = require('../models/Project');
const Purchase = require('../models/Purchase');
const ContactRequest = require('../models/ContactRequest');

// @desc    Get admin statistics
// @route   GET /api/stats
// @access  Private/Admin
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProjects = await Project.countDocuments();
    const totalPurchases = await Purchase.countDocuments();
    const totalRevenue = await Purchase.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const pendingRequests = await ContactRequest.countDocuments({ status: 'pending' });

    // Recent purchases
    const recentPurchases = await Purchase.find()
      .populate('user', 'fullName email')
      .populate('project', 'title price')
      .sort({ purchaseDate: -1 })
      .limit(5);

    // Top selling projects
    const topProjects = await Project.find()
      .sort({ purchaseCount: -1 })
      .limit(5)
      .select('title purchaseCount price image');

    res.json({
      totalUsers,
      totalProjects,
      totalPurchases,
      totalRevenue: totalRevenue[0]?.total || 0,
      pendingRequests,
      recentPurchases,
      topProjects
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
