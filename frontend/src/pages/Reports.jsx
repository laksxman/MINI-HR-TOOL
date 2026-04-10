import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyLeaves } from '../services/leaveService';
import { getMyAttendance } from '../services/attendanceService';
import { gsap } from 'gsap';
import { useLayoutEffect } from 'react';

const Reports = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [stats, setStats] = useState({
    totalLeaves: 0,
    approvedLeaves: 0,
    totalAttendanceDays: 0,
    presentDays: 0,
    leaveBalance: 20
  });
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    gsap.from('.report-card', {
      duration: 0.8,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: "back.out(1.7)"
    });
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const [myLeaves, myAttendance] = await Promise.all([
        getMyLeaves(),
        getMyAttendance()
      ]);

      const approved = myLeaves.filter(l => l.status === 'Approved').length;
      const totalAtt = myAttendance.length;
      const presentAtt = myAttendance.filter(a => a.status === 'Present').length;

      setLeaves(myLeaves);
      setAttendance(myAttendance);
      setStats({
        totalLeaves: myLeaves.length,
        approvedLeaves: approved,
        totalAttendanceDays: totalAtt,
        presentDays: presentAtt,
        leaveBalance: user?.leaveBalance || 20
      });
    } catch (error) {
      console.error('Reports error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-emerald-600 text-white p-10 md:p-16 rounded-3xl shadow-2xl text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
          Your Reports
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-95">Detailed analytics and performance overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="report-card bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl p-8 rounded-3xl border border-emerald-200/30 shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-700">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3" />
              </svg>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-black text-gray-900">{stats.totalLeaves}</p>
              <p className="text-lg font-semibold text-gray-600 mt-1">Total Leaves</p>
            </div>
          </div>
        </div>

        <div className="report-card bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 backdrop-blur-xl p-8 rounded-3xl border border-blue-200/30 shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-700">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-black text-gray-900">{stats.approvedLeaves}</p>
              <p className="text-lg font-semibold text-gray-600 mt-1">Approved Leaves</p>
            </div>
          </div>
        </div>

        <div className="report-card bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 backdrop-blur-xl p-8 rounded-3xl border border-green-200/30 shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-700">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-black text-gray-900">{stats.presentDays}</p>
              <p className="text-lg font-semibold text-gray-600 mt-1">Present Days</p>
            </div>
          </div>
        </div>

        <div className="report-card bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-yellow-500/10 backdrop-blur-xl p-8 rounded-3xl border border-orange-200/30 shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-700">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08 .402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-black text-gray-900">{stats.leaveBalance}</p>
              <p className="text-lg font-semibold text-gray-600 mt-1">Leave Balance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/70 backdrop-blur-xl p-8 lg:p-10 rounded-3xl shadow-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            Recent Leaves
            <svg className="w-6 h-6 text-emerald-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {leaves.length ? (
              leaves.slice(0, 5).map((leave) => (
                <div key={leave._id} className="p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      leave.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                      leave.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {leave.status}
                    </span>
                    <span className="text-sm text-gray-500">{new Date(leave.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">{leave.leaveType}</h4>
                  <p className="text-sm text-gray-600">{leave.totalDays} days</p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No leave records yet
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl p-8 lg:p-10 rounded-3xl shadow-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            Recent Attendance
            <svg className="w-6 h-6 text-blue-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {attendance.length ? (
              attendance.slice(0, 10).reverse().map((att) => (
                <div key={att._id} className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                    att.status === 'Present' ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-200' : 'bg-red-100 text-red-700 border-2 border-red-200'
                  }`}>
                    {new Date(att.date).getDate()}
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">{att.status}</p>
                    <p className="text-sm text-gray-500">{new Date(att.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No attendance records yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

