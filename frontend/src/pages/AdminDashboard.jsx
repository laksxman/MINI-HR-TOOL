import { useState, useEffect, useLayoutEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllLeaves } from '../services/leaveService';
import { getAllAttendance } from '../services/attendanceService';
import { updateLeave } from '../services/leaveService';
import LeaveTable from '../components/LeaveTable';
import AttendanceTable from '../components/AttendanceTable';
import { gsap } from 'gsap';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('leaves');
  const [leaves, setLeaves] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  useLayoutEffect(() => {
    gsap.from('.admin-header', {
      duration: 1.2,
      opacity: 0,
      scale: 0.9,
      y: -30,
      ease: 'back.out(1.7)'
    });
    
    gsap.from('.admin-tabs nav button', {
      duration: 0.6,
      opacity: 0,
      x: -30,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.4
    });
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [allLeaves, allAttendance] = await Promise.all([
        getAllLeaves(),
        getAllAttendance(filters)
      ]);
      setLeaves(allLeaves || []);
      setAttendance(allAttendance || []);
    } catch (error) {
      console.error('Admin dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshKey, filters]);

  const handleApproveReject = async (leaveId, status) => {
    if (!confirm(`Are you sure to ${status.toLowerCase()} this leave?`)) return;
    try {
      await updateLeave(leaveId, { status });
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      alert(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-indigo-100">Manage employees, leaves, and attendance</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 p-6">
            <button
              onClick={() => setActiveTab('leaves')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'leaves'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Leave Requests ({leaves.length})
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'attendance'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Attendance
            </button>
          </nav>
        </div>

        <div className="p-8">
          {activeTab === 'leaves' && (
            <LeaveTable 
              leaves={leaves} 
              onRefresh={() => setRefreshKey(prev => prev + 1)}
              isAdmin={true}
              onApprove={(id) => handleApproveReject(id, 'Approved')}
              onReject={(id) => handleApproveReject(id, 'Rejected')}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceTable 
              attendance={attendance} 
              isAdmin={true}
              onRefresh={() => setRefreshKey(prev => prev + 1)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
