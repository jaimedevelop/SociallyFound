// components/collaborations/PerformanceMetrics.tsx
import React from 'react';

interface Collaboration {
  totalViews?: string;
  totalEngagement?: string;
  engagement?: string;
}

interface PerformanceMetricsProps {
  collaboration: Collaboration;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ collaboration }) => {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium text-gray-900 mb-3">Campaign Performance</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-gray-500">Total Views</p>
          <p className="text-lg font-semibold text-gray-900">{collaboration.totalViews}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Engagement</p>
          <p className="text-lg font-semibold text-gray-900">{collaboration.totalEngagement}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Engagement Rate</p>
          <p className="text-lg font-semibold text-gray-900">{collaboration.engagement}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Performance</p>
          <p className="text-lg font-semibold text-green-600">Above Average</p>
        </div>
      </div>
    </div>
  );
};