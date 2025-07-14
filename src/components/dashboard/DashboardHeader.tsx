// components/dashboard/DashboardHeader.tsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const DashboardHeader: React.FC = () => {
  const { user, profile } = useAuth();
  
  const isInfluencer = profile?.userType === 'influencer';

  return (
    <div className="mb-4 md:mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        Welcome back, {user?.displayName || 'User'}!
      </h1>
      <p className="text-gray-600">
        {isInfluencer 
          ? "Here's your latest performance and opportunities" 
          : "Monitor your campaigns and track influencer partnerships"
        }
      </p>
    </div>
  );
};