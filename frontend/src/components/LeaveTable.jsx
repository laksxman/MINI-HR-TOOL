import { useState } from 'react';
import { updateLeave, deleteLeave } from '../services/leaveService';
import { useAuth } from '../context/AuthContext';
import LeaveForm from './LeaveForm';

const LeaveTable = ({ leaves, onRefresh, isAdmin, onApprove, onReject }) => {
  const { user } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState({});

  const statusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleEdit = async (leave) => {
    setEditingId(leave._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to cancel this leave?')) return;
    setLoading({ ...loading, [id]: true });
    try {
      await deleteLeave(id);
      onRefresh();
    } catch (err) {
      alert(err);
    } finally {
      setLoading({ ...loading, [id]: false });
      setEditingId(null);
    }
  };



  if (leaves.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No leave records found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leaves.map((leave) => (
              <tr key={leave._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {leave.leaveType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {leave.totalDays}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(leave.status)}`}>
                    {leave.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(leave.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {leave.status === 'Pending' && !isAdmin && (
                    <>
                      <button
                        onClick={() => handleEdit(leave)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(leave._id)}
                        disabled={loading[leave._id]}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {isAdmin && leave.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => onApprove(leave._id)}
                        className="px-4 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onReject(leave._id)}
                        className="px-4 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleEdit(leave)}
                        className="px-3 py-1.5 bg-blue-500 text-white text-xs font-bold rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        title="Modify days/reason"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingId && (
        <div className="p-6 border-t bg-gray-50">
          <LeaveForm 
            leave={leaves.find(l => l._id === editingId)}
            onSuccess={() => {
              onRefresh();
              setEditingId(null);
            }}
            onCancel={() => setEditingId(null)}
          />
        </div>
      )}
    </div>
  );
};

export default LeaveTable;
