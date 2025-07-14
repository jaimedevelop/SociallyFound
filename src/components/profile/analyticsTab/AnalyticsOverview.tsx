// components/profile/analyticsTab/AnalyticsOverview.tsx
import React from 'react';
import { 
  Eye,
  TrendingUp,
  DollarSign
} from 'lucide-react';

interface AnalyticsOverviewProps {
  isInfluencer: boolean;
}

export const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({ isInfluencer }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              {isInfluencer ? 'Total Reach' : 'Campaign Reach'}
            </p>
            <p className="text-2xl font-bold text-gray-900">125.4K</p>
            <p className="text-sm text-green-600">+12% from last month</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Eye className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              {isInfluencer ? 'Engagement Rate' : 'Avg. Engagement'}
            </p>
            <p className="text-2xl font-bold text-gray-900">3.8%</p>
            <p className="text-sm text-green-600">+0.3% from last month</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              {isInfluencer ? 'Earnings' : 'Campaign Budget'}
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {isInfluencer ? '$1,250' : '$8,500'}
            </p>
            <p className="text-sm text-green-600">
              {isInfluencer ? '+$320 this month' : '+$1,200 this month'}
            </p>
          </div>
          <div className="p-3 bg-orange-100 rounded-full">
            <DollarSign className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
};