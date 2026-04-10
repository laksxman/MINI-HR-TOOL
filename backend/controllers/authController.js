const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password, role = 'employee' } = req.body;

    // Validate role
    if (!['employee', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Sanitize email
    const sanitizedEmail = email.toLowerCase().trim();

    // Check if user exists
    const userExists = await User.findOne({ email: sanitizedEmail });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: sanitizedEmail,
      password,
      role
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      dateOfJoining: user.dateOfJoining,
      leaveBalance: user.leaveBalance,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.log('Register error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        dateOfJoining: user.dateOfJoining,
        leaveBalance: user.leaveBalance,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
