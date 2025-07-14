// App.tsx - Updated with clean index imports
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ResponsiveLayout } from './components/layout';
import { ProtectedRoute } from './components/shared';
import { 
  Home,
  Login, 
  Register,
  Dashboard,
  Profile,
  Campaigns,
  Collaborations,
  Messages,
  Analytics
} from './pages';
import { ROUTES } from './constants';

// Placeholder page for Settings (not yet implemented)
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="p-6">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-600">This page is coming soon!</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route 
            path={ROUTES.HOME} 
            element={
              <ResponsiveLayout showSidebar={false}>
                <Home />
              </ResponsiveLayout>
            } 
          />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          
          {/* Protected Routes */}
          <Route 
            path={ROUTES.DASHBOARD} 
            element={
              <ProtectedRoute>
                <ResponsiveLayout title="Dashboard">
                  <Dashboard />
                </ResponsiveLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path={ROUTES.PROFILE} 
            element={
              <ProtectedRoute>
                <ResponsiveLayout title="Profile">
                  <Profile />
                </ResponsiveLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path={ROUTES.CAMPAIGNS} 
            element={
              <ProtectedRoute>
                <ResponsiveLayout title="Campaigns">
                  <Campaigns />
                </ResponsiveLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path={ROUTES.COLLABORATIONS} 
            element={
              <ProtectedRoute>
                <ResponsiveLayout title="Collaborations">
                  <Collaborations />
                </ResponsiveLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path={ROUTES.MESSAGES} 
            element={
              <ProtectedRoute>
                <ResponsiveLayout title="Messages">
                  <Messages />
                </ResponsiveLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path={ROUTES.ANALYTICS} 
            element={
              <ProtectedRoute>
                <ResponsiveLayout title="Analytics">
                  <Analytics />
                </ResponsiveLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path={ROUTES.SETTINGS} 
            element={
              <ProtectedRoute>
                <ResponsiveLayout title="Settings">
                  <PlaceholderPage title="Settings" />
                </ResponsiveLayout>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;