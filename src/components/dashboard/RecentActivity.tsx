// components/dashboard/RecentActivity.tsx
import React from 'react';
import { Card } from '../ui/Card';
import { Activity } from 'lucide-react';

interface ActivityItem {
  type: string;
  message: string;
  time: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">Recent Activity</h2>
        <Activity className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-3 md:space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-xs md:text-sm text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};