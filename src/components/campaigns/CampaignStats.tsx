// components/campaigns/CampaignStats.tsx
import React from 'react';
import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  DollarSign 
} from 'lucide-react';

interface StatsData {
  available?: number;
  applied?: number;
  shortlisted?: number;
  totalCampaigns?: number;
  applications?: number;
  hired?: number;
  monthlySpend?: string;
}

interface CampaignStatsProps {
  isInfluencer: boolean;
  stats: StatsData;
  filteredCount?: number;
}

export const CampaignStats: React.FC<CampaignStatsProps> = ({
  isInfluencer,
  stats,
  filteredCount
}) => {
  if (isInfluencer) {
    return (
      <div className="p-4 bg-white mb-2">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-indigo-600">
              {filteredCount || stats.available || 0}
            </div>
            <div className="text-xs md:text-sm text-gray-600">Available</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-green-600">
              {stats.applied || 0}
            </div>
            <div className="text-xs md:text-sm text-gray-600">Applied</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-orange-600">
              {stats.shortlisted || 0}
            </div>
            <div className="text-xs md:text-sm text-gray-600">Shortlisted</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-600">Total Campaigns</p>
            <p className="text-xl md:text-2xl font-bold text-gray-900">
              {stats.totalCampaigns || 0}
            </p>
          </div>
          <div className="p-2 md:p-3 bg-blue-100 rounded-full">
            <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
          </div>
        </div>
      </div>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-600">Applications</p>
            <p className="text-xl md:text-2xl font-bold text-gray-900">
              {stats.applications || 0}
            </p>
          </div>
          <div className="p-2 md:p-3 bg-green-100 rounded-full">
            <Users className="w-4 h-4 md:w-6 md:h-6 text-green-600" />
          </div>
        </div>
      </div>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-600">Hired</p>
            <p className="text-xl md:text-2xl font-bold text-gray-900">
              {stats.hired || 0}
            </p>
          </div>
          <div className="p-2 md:p-3 bg-purple-100 rounded-full">
            <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-purple-600" />
          </div>
        </div>
      </div>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-600">Monthly Spend</p>
            <p className="text-xl md:text-2xl font-bold text-gray-900">
              {stats.monthlySpend || '$0'}
            </p>
          </div>
          <div className="p-2 md:p-3 bg-orange-100 rounded-full">
            <DollarSign className="w-4 h-4 md:w-6 md:h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
};