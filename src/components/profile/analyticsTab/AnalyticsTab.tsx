// components/profile/analyticsTab/AnalyticsTab.tsx
import React from 'react';
import { AnalyticsOverview } from './AnalyticsOverview';
import { PerformanceChart } from './PerformanceChart';
import { RecentActivity } from './RecentActivity';

interface AnalyticsTabProps {
  isInfluencer: boolean;
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ isInfluencer }) => {
  return (
    <div className="space-y-6">
      <AnalyticsOverview isInfluencer={isInfluencer} />
      <PerformanceChart isInfluencer={isInfluencer} />
      <RecentActivity isInfluencer={isInfluencer} />
    </div>
  );
};