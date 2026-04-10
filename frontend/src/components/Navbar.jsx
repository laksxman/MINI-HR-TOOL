import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import UserDropdown from './UserDropdown';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleNav('/dashboard')}>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-emerald-600 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-8 3h1m-1 4h1M21 21l-4-4m0 0l-4 4m4-4v4" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-emerald-600 bg-clip-text text-transparent group-hover:translate-x-1 transition-all duration-300">
                MINI HR
              </h1>
              <p className="text-xs font-medium text-emerald-600 tracking-wider">Management Tool</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button 
                onClick={() => handleNav('/dashboard')}
                className="text-lg font-semibold text-gray-700 hover:text-emerald-600 transition-all duration-300"
              >
                Dashboard
              </button>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </div>
            <div className="relative group">
              <button 
                onClick={() => handleNav('/dashboard')}
                className="text-lg font-semibold text-gray-700 hover:text-emerald-600 transition-all duration-300"
              >
                Leave
              </button>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </div>
            <div className="relative group">
              <button 
                onClick={() => handleNav('/dashboard')}
                className="text-lg font-semibold text-gray-700 hover:text-emerald-600 transition-all duration-300"
              >
                Attendance
              </button>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </div>
            <div className="relative group">
              <button 
                onClick={() => handleNav('/reports')}
                className="text-lg font-semibold text-gray-700 hover:text-emerald-600 transition-all duration-300"
              >
                Reports
              </button>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <UserDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

