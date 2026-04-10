const Attendance = require('../models/Attendance');

// @desc    Mark attendance
// @route   POST /api/attendance/mark
// @access  Private
const markAttendance = async (req, res) => {
  try {
    const { date, status } = req.body;
    const attendanceDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    // Cannot mark future attendance
    if (attendanceDate > today) {
      return res.status(400).json({ message: 'Cannot mark future attendance' });
    }

    // Check if already marked for this date
    const startOfDay = new Date(attendanceDate);
    startOfDay.setHours(0,0,0,0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23,59,59,999);
    
    const existing = await Attendance.findOne({
      userId: req.user.id,
      date: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });

    if (existing) {
      return res.status(400).json({ message: 'Attendance already marked for this date' });
    }

    const attendance = await Attendance.create({
      userId: req.user.id,
      date: attendanceDate,
      status: status || 'Present'
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get my attendance
// @route   GET /api/attendance/my
// @access  Private
const getMyAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({ userId: req.user.id })
      .sort({ date: -1 })
      .limit(30);
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all attendance (admin)
// @route   GET /api/attendance/all
// @access  Private Admin
const getAllAttendance = async (req, res) => {
  try {
    const { date, userId } = req.query;
    let query = {};
    
    if (date) {
      const queryDate = new Date(date);
      query.date = {
        $gte: queryDate.setHours(0,0,0,0),
        $lt: new Date(queryDate.getTime() + 24*60*60*1000)
      };
    }
    if (userId) query.userId = userId;

    const attendance = await Attendance.find(query).populate('userId', 'name email');
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  markAttendance,
  getMyAttendance,
  getAllAttendance
};
