// components/layout/Layout.tsx - Updated to use ResponsiveLayout
import React from 'react';
import ResponsiveLayout from './ResponsiveLayout';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  title?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showSidebar = true,
  title,
  showSearch = false,
  showNotifications = true
}) => {
  return (
    <ResponsiveLayout
      showSidebar={showSidebar}
      title={title}
      showSearch={showSearch}
      showNotifications={showNotifications}
    >
      {children}
    </ResponsiveLayout>
  );
};

export default ResponsiveLayout;