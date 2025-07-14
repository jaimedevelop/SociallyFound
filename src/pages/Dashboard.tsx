// pages/Dashboard.tsx - Updated with RoleBasedDashboard integration
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { RoleBasedDashboard } from '../components/layout';
import { UserStats } from '../components/profile';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TouchFriendlyButton } from '../components/mobile/TouchFriendlyButton';
import { SwipeableCard } from '../components/mobile/SwipeableCard';
import { PullToRefresh } from '../components/mobile/PullToRefresh';
import { useResponsive } from '../hooks/useResponsive';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye, 
  MessageSquare, 
  Calendar,
  Plus,
  ArrowUpRight,
  Activity
} from 'lucide-react';
import { formatNumber, formatCurrency } from '../utils/helpers';

export const Dashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const { isMobile } = useResponsive();
  
  const isInfluencer = profile?.userType === 'influencer';

  const recentActivities = [
    { type: 'collaboration', message: 'New collaboration request from Nike', time: '2 hours ago' },
    { type: 'payment', message: 'Payment received: $2,500', time: '1 day ago' },
    { type: 'campaign', message: 'Campaign "Summer Collection" completed', time: '3 days ago' },
    { type: 'message', message: 'New message from Adidas', time: '1 week ago' }
  ];

  const campaigns = [
    {
      id: 1,
      title: 'Summer Fashion Campaign',
      brand: 'Nike',
      status: 'active',
      budget: 5000,
      deadline: '2024-02-15',
      progress: 75
    },
    {
      id: 2,
      title: 'Tech Product Launch',
      brand: 'Apple',
      status: 'pending',
      budget: 10000,
      deadline: '2024-02-20',
      progress: 25
    },
    {
      id: 3,
      title: 'Beauty Brand Collaboration',
      brand: 'Sephora',
      status: 'completed',
      budget: 3000,
      deadline: '2024-01-30',
      progress: 100
    }
  ];

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleSwipeLeft = (campaignId: number) => {
    console.log('Swiped left on campaign:', campaignId);
  };

  const handleSwipeRight = (campaignId: number) => {
    console.log('Swiped right on campaign:', campaignId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'info';
      default: return 'secondary';
    }
  };

  // Use RoleBasedDashboard as the main wrapper
  return (
    <RoleBasedDashboard>
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* User Stats Component Integration */}
          <UserStats timeframe="30d" compact={isMobile} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Recent Campaigns */}
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
                      onSwipeLeft={() => handleSwipeLeft(campaign.id)}
                      onSwipeRight={() => handleSwipeRight(campaign.id)}
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

            {/* Recent Activity */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">Recent Activity</h2>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3 md:space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-xs md:text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <TouchFriendlyButton variant="outline" className="flex items-center justify-center p-4 md:p-6 h-auto">
                <MessageSquare className="w-5 h-5 mr-2" />
                <span>Send Message</span>
              </TouchFriendlyButton>
              <TouchFriendlyButton variant="outline" className="flex items-center justify-center p-4 md:p-6 h-auto">
                <Calendar className="w-5 h-5 mr-2" />
                <span>Schedule Content</span>
              </TouchFriendlyButton>
              <TouchFriendlyButton variant="outline" className="flex items-center justify-center p-4 md:p-6 h-auto">
                <TrendingUp className="w-5 h-5 mr-2" />
                <span>View Analytics</span>
              </TouchFriendlyButton>
            </div>
          </Card>
        </div>
      </PullToRefresh>
    </RoleBasedDashboard>
  );
};