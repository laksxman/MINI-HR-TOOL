# 🎯 Mini HR Tool - Employee Leave & Attendance Management System

## Overview
Production-ready MERN stack HR system for employee leave/attendance management with JWT auth, role-based access, GSAP animations, Tailwind UI.

**Tech Stack:**
- **Backend:** Node.js/Express/MongoDB/Mongoose/JWT/Bcrypt
- **Frontend:** React 18/Vite/Tailwind/GSAP/React Router/Context/Axios
- **Security:** Role middleware, rate limit, helmet, CORS
- **Features:** Responsive, animated UI, admin approve, balance tracking

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
# MongoDB Atlas/Local + update .env MONGO_URI
npm run seed  # Admin: admin@hrtool.com / admin123
npm run dev   # http://localhost:5000/api/health
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev   # http://localhost:3000
```

### .env Files
**backend/.env:**
```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your-32-char-secret-key
```

**frontend/.env:**
```
VITE_API_URL=http://localhost:5000/api
```

## 📋 Features

### Employee
- ✅ Register/Login (Employee/Admin)
- ✅ Profile + Leave Balance (20 days default)
- ✅ Apply/Edit/Cancel leave (Casual/Sick/Paid, auto days calc)
- ✅ Mark daily attendance (no dup/future validation)
- ✅ History tables

### Admin
- ✅ View all employees/leaves/attendance
- ✅ Approve/Reject pending leaves
- ✅ Filter attendance by date/employee
- ✅ Role-based dashboards

### Tech
- GSAP animations (fade, slide, stagger)
- Tailwind responsive + modern glassmorphism
- Protected routes/context API
- Error handling + loading states
- Clean MVC backend architecture

## 🛠 API Endpoints
```
Auth: POST /api/auth/register, /login
User: GET /api/users/profile  
Leave: POST /api/leaves/apply | GET /my,/all | PUT/:id | DELETE/:id
Attendance: POST /api/attendance/mark | GET /my,/all
```

## 🗄 Database Schema
```
User: name, email, password(hash), role, leaveBalance(20), dateOfJoining
Leave: userId, type, start/end/totalDays, status(Pending/Approved/Rejected), reason
Attendance: userId, date, status(Present/Absent) - unique user/date
```

## 📦 Deployment
**Backend:** Render (env vars)
**Frontend:** Render
**DB:** MongoDB Atlas (free tier)

## 🎨 UI/Animations
- GSAP: Login slide-in, dashboard stagger, hover scales
- Tailwind: Fully responsive mobile→desktop
- Glassmorphism + gradients

## 🧪 Testing
1. Admin login → All leaves → Approve pending
2. Employee signup → Apply leave → Mark att
3. Responsive: Mobile navbar hamburger

## Known Limitations
- No email notifications (easy Stripe/SES)
- No pagination (for <100 users)
- No file upload (resume etc.)

**AI Tool :** ChatGPT 
**Time Spent :** 4 hours

**Live Demo:** localhost:3000 🚀

