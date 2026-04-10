const express = require('express');
const {
  markAttendance,
  getMyAttendance,
  getAllAttendance
} = require('../controllers/attendanceController');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect); // All attendance protected

router.post('/mark', markAttendance);
router.get('/my', getMyAttendance);
router.get('/all', authorize('admin'), getAllAttendance);

module.exports = router;
