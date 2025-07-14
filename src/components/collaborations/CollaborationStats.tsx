// components/collaborations/CollaborationStats.tsx
import React from 'react';
import { 
  Clock, 
  AlertTriangle, 
  Eye, 
  ThumbsUp 
} from 'lucide-react';

interface CollaborationStatsProps {
  stats: {
    activeCollaborations: number;
    pendingReviews: number;
    totalReach: string;
    avgEngagement: string;
  };
}

export const CollaborationStats: React.FC<CollaborationStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Collaborations</p>
            <p className="text-2xl font-bold text-gray-900">{stats.activeCollaborations}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
            <p className="text-2xl font-bold text-gray-900">{stats.pendingReviews}</p>
          </div>
          <div className="p-3 bg-orange-100 rounded-full">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Reach</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalReach}</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-full">
            <Eye className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Avg Engagement</p>
            <p className="text-2xl font-bold text-gray-900">{stats.avgEngagement}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <ThumbsUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
};