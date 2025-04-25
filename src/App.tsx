import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import StudentDashboard from './pages/student/Dashboard';
import PlacementDashboard from './pages/placement/Dashboard';
import CompanyDashboard from './pages/company/Dashboard';
import NotFound from './pages/NotFound';

// Protected route wrapper
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode, 
  allowedRoles?: ('student' | 'placement' | 'company')[] 
}> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'student') {
      return <Navigate to="/student" replace />;
    } else if (user.role === 'placement') {
      return <Navigate to="/placement" replace />;
    } else if (user.role === 'company') {
      return <Navigate to="/company" replace />;
    }
  }

  return <>{children}</>;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          user ? (
            <Navigate 
              to={
                user.role === 'student' 
                  ? '/student' 
                  : user.role === 'placement' 
                    ? '/placement' 
                    : '/company'
              } 
              replace 
            />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      <Route path="/login" element={<Login />} />
      
      {/* Student routes */}
      <Route 
        path="/student/*" 
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Placement team routes */}
      <Route 
        path="/placement/*" 
        element={
          <ProtectedRoute allowedRoles={['placement']}>
            <PlacementDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Company routes */}
      <Route 
        path="/company/*" 
        element={
          <ProtectedRoute allowedRoles={['company']}>
            <CompanyDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;