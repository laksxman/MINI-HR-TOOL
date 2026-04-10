import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthProvider, { AuthContext } from './context/AuthContext.jsx';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Reports from './pages/Reports';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

function AppContent() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-6xl flex-grow pb-24 md:pb-16">
          <Routes>
            <Route 
              path="/login" 
              element={
                !user ? <Login /> : <Navigate to="/dashboard" />
              } 
            />
            <Route 
              path="/signup" 
              element={
                !user ? <Signup /> : <Navigate to="/dashboard" />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  {user?.role === 'employee' ? <EmployeeDashboard /> : <AdminDashboard />}
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reports" 
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

