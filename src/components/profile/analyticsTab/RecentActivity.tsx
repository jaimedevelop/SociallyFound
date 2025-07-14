// components/profile/analyticsTab/RecentActivity.tsx
import React from 'react';

interface RecentActivityProps {
  isInfluencer: boolean;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ isInfluencer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {isInfluencer ? (
          <>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Campaign completed: TechFlow Review</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
              <span className="text-sm font-medium text-green-600">+$800</span>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New application submitted</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Profile viewed by FashionForward</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Campaign launched: Summer Collection</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">12 new applications received</p>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Payment processed for @tech_sarah</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};