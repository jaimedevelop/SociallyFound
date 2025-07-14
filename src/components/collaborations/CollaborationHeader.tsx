// components/collaborations/CollaborationHeader.tsx
import React from 'react';

interface CollaborationHeaderProps {
  isInfluencer: boolean;
  stats?: {
    active: number;
    totalEarned: string;
    avgRating: number;
  };
}

export const CollaborationHeader: React.FC<CollaborationHeaderProps> = ({
  isInfluencer,
  stats
}) => {
  if (isInfluencer) {
    return (
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">My Opportunities</h1>
          
          {/* Quick Stats */}
          {stats && (
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">{stats.active}</div>
                <div className="text-xs text-gray-600">Active</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">{stats.totalEarned}</div>
                <div className="text-xs text-gray-600">Total Earned</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">{stats.avgRating}</div>
                <div className="text-xs text-gray-600">Avg Rating</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Active Collaborations</h1>
      <p className="text-gray-600">Monitor and manage your ongoing influencer partnerships</p>
    </div>
  );
};