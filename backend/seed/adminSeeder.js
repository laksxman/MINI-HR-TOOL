require('dotenv').config();
const User = require('../models/User');
const connectDB = require('../config/db');

// Connect DB
connectDB();

const seedAdmin = async () => {
  try {
    await User.deleteMany({ role: 'admin' }); // Clear existing admins

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@hrtool.com',
      password: 'admin123',
      role: 'admin',
      leaveBalance: 0
    });

    console.log('Admin seeded:', admin.email);
    console.log('Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('Seeder error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
