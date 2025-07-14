// components/profile/profileTab/StatsGrid.tsx
import React from 'react';
import { 
  Users,
  Heart,
  TrendingUp,
  DollarSign,
  Briefcase,
  Award
} from 'lucide-react';

interface StatsGridProps {
  isInfluencer: boolean;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ isInfluencer }) => {
  if (isInfluencer) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <Users className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">45.2K</div>
          <div className="text-sm text-gray-600">Followers</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">12.8K</div>
          <div className="text-sm text-gray-600">Avg. Likes</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">3.2%</div>
          <div className="text-sm text-gray-600">Engagement</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">$1,250</div>
          <div className="text-sm text-gray-600">Earned</div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <Briefcase className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
        <div className="text-2xl font-bold text-gray-900">12</div>
        <div className="text-sm text-gray-600">Campaigns</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
        <div className="text-2xl font-bold text-gray-900">347</div>
        <div className="text-sm text-gray-600">Applications</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
        <div className="text-2xl font-bold text-gray-900">23</div>
        <div className="text-sm text-gray-600">Hired</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-2" />
        <div className="text-2xl font-bold text-gray-900">$12.5K</div>
        <div className="text-sm text-gray-600">Spent</div>
      </div>
    </div>
  );
};