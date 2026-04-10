const Leave = require('../models/Leave');

// Helper to calculate total days
const calculateTotalDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (end < start) return 0;
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
};

// @desc    Apply for leave
// @route   POST /api/leaves/apply
// @access  Private Employee
const applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    
    const totalDays = calculateTotalDays(startDate, endDate);
    if (totalDays <= 0) {
      return res.status(400).json({ message: 'Invalid dates. End date must be after start date.' });
    }

    const leave = await Leave.create({
      userId: req.user.id,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason
    });

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get my leaves
// @route   GET /api/leaves/my
// @access  Private
const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update leave (status for admin, details for employee pending)
// @route   PUT /api/leaves/:id
// @access  Private
const updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    // Employee can only update own pending leaves
    if (leave.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

// Admin can update status, totalDays, reason
    if (req.user.role === 'admin') {
      const oldStatus = leave.status;
      if (req.body.status) leave.status = req.body.status;
      if (req.body.totalDays !== undefined) leave.totalDays = req.body.totalDays;
      if (req.body.reason) leave.reason = req.body.reason;
      
      // Deduct leave balance ONLY when changing to Approved from non-Approved
      if (leave.status === 'Approved' && oldStatus !== 'Approved') {
        const User = require('../models/User');
        const user = await User.findById(leave.userId);
        if (user && user.leaveBalance >= leave.totalDays) {
          user.leaveBalance -= leave.totalDays;
          await user.save();
        }
      }
    } else {
      // Employee updating pending leave details
      if (leave.status !== 'Pending') {
        return res.status(400).json({ message: 'Can only edit pending leaves' });
      }
      Object.assign(leave, req.body);
      const totalDays = calculateTotalDays(req.body.startDate, req.body.endDate);
      if (totalDays > 0) leave.totalDays = totalDays;
    }

    const updatedLeave = await leave.save();
    res.json(updatedLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete leave (cancel pending own)
// @route   DELETE /api/leaves/:id
// @access  Private Employee
const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    if (leave.userId.toString() !== req.user.id || leave.status !== 'Pending') {
      return res.status(403).json({ message: 'Can only cancel own pending leaves' });
    }

    await leave.remove();
    res.json({ message: 'Leave cancelled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all leaves (admin)
// @route   GET /api/leaves/all
// @access  Private Admin
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate('userId', 'name email');
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  applyLeave,
  getMyLeaves,
  updateLeave,
  deleteLeave,
  getAllLeaves
};
