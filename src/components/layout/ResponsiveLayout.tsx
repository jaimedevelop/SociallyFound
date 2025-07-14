// components/layout/ResponsiveLayout.tsx - Fixed mobile overflow and sidebar issues
import React from 'react';
import Header from './Header';
import { Sidebar } from './Sidebar';
import { MobileHeader } from '../mobile/MobileHeader';
import { MobileNavigation } from '../mobile/MobileNavigation';
import { useAuth } from '../../context/AuthContext';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  title?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ 
  children, 
  showSidebar = true,
  title,
  showSearch = false,
  showNotifications = true
}) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Desktop Header - Hidden on mobile */}
      <div className="hidden md:block">
        <Header />
      </div>
      
      {/* Mobile Header - Only visible on mobile */}
      {user && (
        <div className="md:hidden">
          <MobileHeader 
            title={title}
            showSearch={showSearch}
            showNotifications={showNotifications}
          />
        </div>
      )}
      
      <div className="flex min-h-0">
        {/* Desktop Sidebar - Completely hidden on mobile */}
        {user && showSidebar && (
          <Sidebar />
        )}
        
        {/* Main Content - Full width on mobile, adjusted on desktop */}
        <main className={`flex-1 min-w-0 overflow-x-hidden ${
          user 
            ? 'pb-20 md:pb-0' // Bottom padding for mobile navigation
            : ''
        }`}>
          <div className="w-full max-w-full overflow-x-hidden">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile Bottom Navigation - Only visible on mobile */}
      {user && (
        <div className="md:hidden">
          <MobileNavigation />
        </div>
      )}
    </div>
  );
};

export default ResponsiveLayout;