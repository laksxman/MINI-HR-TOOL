const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      dateOfJoining: user.dateOfJoining,
      leaveBalance: user.leaveBalance || 20
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfile };
