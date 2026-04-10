const mongoose = require('mongoose');

const leaveSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  leaveType: {
    type: String,
    required: [true, 'Leave type is required'],
    enum: ['Casual', 'Sick', 'Paid']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  totalDays: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  reason: {
    type: String,
    required: [true, 'Reason is required'],
    maxlength: 500
  }
}, { timestamps: true });

module.exports = mongoose.model('Leave', leaveSchema);
