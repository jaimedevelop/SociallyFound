// components/profile/analyticsTab/PerformanceChart.tsx
import React from 'react';
import { BarChart3 } from 'lucide-react';

interface PerformanceChartProps {
  isInfluencer: boolean;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ isInfluencer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {isInfluencer ? 'Performance Overview' : 'Campaign Performance'}
      </h3>
      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">Chart visualization coming soon</p>
        </div>
      </div>
    </div>
  );
};