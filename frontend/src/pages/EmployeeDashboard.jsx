import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyLeaves } from '../services/leaveService';
import { getMyAttendance } from '../services/attendanceService';
import LeaveForm from '../components/LeaveForm';
import AttendanceForm from '../components/AttendanceForm';
import LeaveTable from '../components/LeaveTable';
import AttendanceTable from '../components/AttendanceTable';
import { gsap } from 'gsap';
import { useLayoutEffect } from 'react';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('leave');
  const [leaves, setLeaves] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [myLeaves, myAttendance] = await Promise.all([
        getMyLeaves(),
        getMyAttendance()
      ]);
      setLeaves(myLeaves || []);
      setAttendance(myAttendance || []);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  useLayoutEffect(() => {
    gsap.from('.profile-card', {
      duration: 0.8,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: "back.out(1.7)"
    });

    gsap.from('.tab-content', {
      duration: 1,
      opacity: 0,
      scale: 0.95,
      delay: 0.3,
      ease: "back.out(1.7)"
    });

    gsap.from('.dashboard-tabs button', {
      duration: 0.6,
      opacity: 0,
      x: -30,
      stagger: 0.1,
      ease: "power2.out"
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-emerald-50 via-blue-50 to-indigo-50 p-8 md:p-12 rounded-3xl shadow-2xl border border-emerald-100/50 backdrop-blur-sm">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4 leading-tight">
            Welcome back, <span className="text-emerald-600">{user?.name}</span>!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto md:mx-0">Manage your leaves and attendance efficiently</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="profile-card bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 hover:-translate-y-2 transition-all duration-500 hover:border-emerald-200 group">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div>
              <p className="text-4xl font-black text-emerald-600 group-hover:text-emerald-700 transition-colors">{user?.leaveBalance || 20}</p>
              <p className="text-gray-600 font-semibold">Leave Balance</p>
            </div>
          </div>
        </div>

        <div className="profile-card bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 hover:-translate-y-2 transition-all duration-500 hover:border-blue-200 group">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p className="text-4xl font-black text-blue-600 group-hover:text-blue-700 transition-colors">Employee</p>
              <p className="text-gray-600 font-semibold truncate max-w-[120px]">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="profile-card bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 hover:-translate-y-2 transition-all duration-500 hover:border-purple-200 group">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-4xl font-black text-purple-600 group-hover:text-purple-700 transition-colors">
                {user?.dateOfJoining ? new Date(user.dateOfJoining).toLocaleDateString() : 'N/A'}
              </p>
              <p className="text-gray-600 font-semibold">Joined</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="dashboard-tabs bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
        <div className="border-b border-gray-200/50">
          <nav className="-mb-px flex flex-col sm:flex-row space-y-0 sm:space-y-0 sm:space-x-8 p-1 bg-gradient-to-r from-gray-50 to-white/50">
            <button
              onClick={() => setActiveTab('leave')}
              className={`flex-1 sm:flex-none py-4 px-6 border-b-2 font-semibold text-base whitespace-nowrap transition-all duration-300 rounded-xl mx-1 sm:mx-0 ${
                activeTab === 'leave'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg border-emerald-400 transform scale-105'
                  : 'border-transparent text-gray-600 hover:text-emerald-600 hover:border-emerald-300 hover:shadow-md hover:-translate-y-0.5 bg-white/50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg className={`w-6 h-6 ${activeTab === 'leave' ? 'text-white' : 'text-emerald-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Leave Management</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`flex-1 sm:flex-none py-4 px-6 border-b-2 font-semibold text-base whitespace-nowrap transition-all duration-300 rounded-xl mx-1 sm:mx-0 ${
                activeTab === 'attendance'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg border-blue-400 transform scale-105'
                  : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 bg-white/50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg className={`w-6 h-6 ${activeTab === 'attendance' ? 'text-white' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Attendance</span>
              </div>
            </button>
          </nav>
        </div>

        <div className={`tab-content p-8 lg:p-12 transition-all duration-500`}>
          {activeTab === 'leave' && (
            <div className="space-y-8">
              <LeaveForm onSuccess={handleRefresh} />
              <LeaveTable leaves={leaves} onRefresh={handleRefresh} />
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="space-y-8">
              <AttendanceForm onSuccess={handleRefresh} />
              <AttendanceTable attendance={attendance} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

