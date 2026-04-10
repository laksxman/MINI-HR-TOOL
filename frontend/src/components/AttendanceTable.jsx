import { useState } from 'react';
import { getAllAttendance } from '../services/attendanceService';
import { useAuth } from '../context/AuthContext';

const AttendanceTable = ({ attendance, isAdmin = false, onRefresh }) => {
  const [filters, setFilters] = useState({});

  const statusColor = (status) => {
    return status === 'Present' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  if (!attendance || attendance.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No attendance records found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {isAdmin && (
        <div className="p-6 border-b bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              placeholder="Filter by date"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            />
            {/* Employee filter for admin */}
            <select className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
              <option>All Employees</option>
            </select>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {isAdmin ? 'Employee' : 'Date'}
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marked</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {attendance.map((record) => (
              <tr key={record._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {isAdmin ? record.userId?.name || 'Unknown' : new Date(record.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(record.status)}`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(record.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
