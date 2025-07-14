// components/UserStats.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { InfluencerProfile, BrandProfile } from '../types';

interface UserStatsProps {
  timeframe?: '7d' | '30d' | '90d' | 'all';
  compact?: boolean;
}

interface InfluencerStats {
  totalEarnings: number;
  activeCollaborations: number;
  completedProjects: number;
  averageRating: number;
  followersGrowth: number;
  engagementRate: number;
  applicationsSubmitted: number;
  responseRate: number;
}

interface BrandStats {
  campaignsCreated: number;
  totalSpent: number;
  applicationsReceived: number;
  creatorsHired: number;
  averageResponseTime: number;
  campaignSuccessRate: number;
  impressionsGenerated: number;
  clickThroughRate: number;
}

export const UserStats: React.FC<UserStatsProps> = ({ timeframe = '30d', compact = false }) => {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<InfluencerStats | BrandStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user || !profile) return;

      setLoading(true);
      
      try {
        // Simulate API call - replace with actual API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (user.userType === 'influencer') {
          setStats({
            totalEarnings: 12450,
            activeCollaborations: 3,
            completedProjects: 24,
            averageRating: 4.8,
            followersGrowth: 15.3,
            engagementRate: 6.2,
            applicationsSubmitted: 18,
            responseRate: 67
          } as InfluencerStats);
        } else {
          setStats({
            campaignsCreated: 8,
            totalSpent: 28500,
            applicationsReceived: 156,
            creatorsHired: 23,
            averageResponseTime: 2.4,
            campaignSuccessRate: 89,
            impressionsGenerated: 2500000,
            clickThroughRate: 3.2
          } as BrandStats);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, profile, selectedTimeframe]);

  const timeframeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'all', label: 'All time' }
  ];

  if (!user || !profile) return null;

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="h-8 bg-gray-300 rounded w-16 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const renderInfluencerStats = (stats: InfluencerStats) => {
    const statItems = [
      {
        label: 'Total Earnings',
        value: `${stats.totalEarnings.toLocaleString()}`,
        color: 'text-green-600',
        trend: '+12%'
      },
      {
        label: 'Active Projects',
        value: stats.activeCollaborations,
        color: 'text-blue-600',
        trend: '+2'
      },
      {
        label: 'Completed',
        value: stats.completedProjects,
        color: 'text-purple-600',
        trend: '+8'
      },
      {
        label: 'Avg Rating',
        value: `${stats.averageRating}/5`,
        color: 'text-yellow-600',
        trend: '+0.2'
      },
      {
        label: 'Followers Growth',
        value: `+${stats.followersGrowth}%`,
        color: 'text-indigo-600',
        trend: 'up'
      },
      {
        label: 'Engagement Rate',
        value: `${stats.engagementRate}%`,
        color: 'text-pink-600',
        trend: '+1.2%'
      },
      {
        label: 'Applications',
        value: stats.applicationsSubmitted,
        color: 'text-orange-600',
        trend: '+5'
      },
      {
        label: 'Response Rate',
        value: `${stats.responseRate}%`,
        color: 'text-teal-600',
        trend: '+8%'
      }
    ];

    return compact ? statItems.slice(0, 4) : statItems;
  };

  const renderBrandStats = (stats: BrandStats) => {
    const statItems = [
      {
        label: 'Campaigns',
        value: stats.campaignsCreated,
        color: 'text-blue-600',
        trend: '+3'
      },
      {
        label: 'Total Spent',
        value: `${stats.totalSpent.toLocaleString()}`,
        color: 'text-red-600',
        trend: '+15%'
      },
      {
        label: 'Applications',
        value: stats.applicationsReceived,
        color: 'text-green-600',
        trend: '+23'
      },
      {
        label: 'Creators Hired',
        value: stats.creatorsHired,
        color: 'text-purple-600',
        trend: '+7'
      },
      {
        label: 'Response Time',
        value: `${stats.averageResponseTime}h`,
        color: 'text-orange-600',
        trend: '-0.5h'
      },
      {
        label: 'Success Rate',
        value: `${stats.campaignSuccessRate}%`,
        color: 'text-teal-600',
        trend: '+4%'
      },
      {
        label: 'Impressions',
        value: `${(stats.impressionsGenerated / 1000000).toFixed(1)}M`,
        color: 'text-indigo-600',
        trend: '+18%'
      },
      {
        label: 'CTR',
        value: `${stats.clickThroughRate}%`,
        color: 'text-pink-600',
        trend: '+0.8%'
      }
    ];

    return compact ? statItems.slice(0, 4) : statItems;
  };

  const statsToRender = user.userType === 'influencer' 
    ? renderInfluencerStats(stats as InfluencerStats)
    : renderBrandStats(stats as BrandStats);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className={`${compact ? 'text-lg' : 'text-2xl'} font-bold text-gray-900`}>
          {user.userType === 'influencer' ? 'Creator Analytics' : 'Campaign Analytics'}
        </h2>
        {!compact && (
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {timeframeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className={`grid grid-cols-2 ${compact ? 'gap-3' : 'md:grid-cols-4 gap-6'}`}>
        {statsToRender.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`${compact ? 'text-xl' : 'text-2xl'} font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <div className={`${compact ? 'text-xs' : 'text-sm'} text-gray-600 mb-1`}>
              {stat.label}
            </div>
            {!compact && stat.trend && (
              <div className="text-xs text-green-600">
                {stat.trend}
              </div>
            )}
          </div>
        ))}
      </div>

      {!compact && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <p className="mb-2">
              {user.userType === 'influencer' 
                ? 'Your performance is trending upward! Keep engaging with quality brands to maintain growth.'
                : 'Your campaigns are performing well! Consider increasing your budget to reach more quality creators.'
              }
            </p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              View detailed analytics →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};