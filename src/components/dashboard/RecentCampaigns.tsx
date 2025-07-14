// components/dashboard/RecentCampaigns.tsx
import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { TouchFriendlyButton } from '../mobile/TouchFriendlyButton';
import { SwipeableCard } from '../mobile/SwipeableCard';
import { useResponsive } from '../../hooks/useResponsive';
import { formatCurrency } from '../../utils/helpers';

interface Campaign {
  id: number;
  title: string;
  brand: string;
  status: string;
  budget: number;
  deadline: string;
  progress: number;
}

interface RecentCampaignsProps {
  campaigns: Campaign[];
  onSwipeLeft?: (campaignId: number) => void;
  onSwipeRight?: (campaignId: number) => void;
}

export const RecentCampaigns: React.FC<RecentCampaignsProps> = ({ 
  campaigns, 
  onSwipeLeft, 
  onSwipeRight 
}) => {
  const { isMobile } = useResponsive();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'info';
      default: return 'secondary';
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">Recent Campaigns</h2>
        <TouchFriendlyButton variant="ghost" size="sm">
          View All
        </TouchFriendlyButton>
      </div>
      <div className="space-y-3 md:space-y-4">
        {campaigns.map((campaign) => (
          isMobile ? (
            <SwipeableCard
              key={campaign.id}
              onSwipeLeft={() => onSwipeLeft?.(campaign.id)}
              onSwipeRight={() => onSwipeRight?.(campaign.id)}
            >
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm">{campaign.title}</h3>
                <p className="text-xs text-gray-500">{campaign.brand}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <Badge variant={getStatusColor(campaign.status) as any} size="sm">
                    {campaign.status}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {formatCurrency(campaign.budget)}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                      style={{ width: `${campaign.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{campaign.progress}%</p>
                </div>
              </div>
            </SwipeableCard>
          ) : (
            <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{campaign.title}</h3>
                <p className="text-sm text-gray-500">{campaign.brand}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <Badge variant={getStatusColor(campaign.status) as any}>
                    {campaign.status}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {formatCurrency(campaign.budget)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${campaign.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{campaign.progress}%</p>
              </div>
            </div>
          )
        ))}
      </div>
    </Card>
  );
};