const express = require('express');
const {
  applyLeave,
  getMyLeaves,
  updateLeave,
  deleteLeave,
  getAllLeaves
} = require('../controllers/leaveController');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect); // All leaves protected

router.post('/apply', applyLeave);
router.get('/my', getMyLeaves);
router.put('/:id', updateLeave);
router.delete('/:id', deleteLeave);
router.get('/all', authorize('admin'), getAllLeaves);

module.exports = router;
