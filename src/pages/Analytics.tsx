// pages/Analytics.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  DollarSign,
  Users,
  Calendar,
  BarChart3,
  PieChart,
  Target,
  Award,
  Clock,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

const Analytics: React.FC = () => {
  const { profile } = useAuth();
  const isInfluencer = profile?.userType === 'influencer';

  return (
    <div className="min-h-screen bg-gray-50">
      {isInfluencer ? <InfluencerAnalytics /> : <BrandAnalytics />}
    </div>
  );
};

const InfluencerAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const overviewStats = [
    {
      title: 'Total Earnings',
      value: '$8,450',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Total Reach',
      value: '245K',
      change: '+8.2%',
      trend: 'up',
      icon: Eye,
      color: 'blue'
    },
    {
      title: 'Engagement Rate',
      value: '4.8%',
      change: '+0.3%',
      trend: 'up',
      icon: Heart,
      color: 'red'
    },
    {
      title: 'Active Campaigns',
      value: '3',
      change: '-1',
      trend: 'down',
      icon: Target,
      color: 'purple'
    }
  ];

  const campaignPerformance = [
    {
      campaign: 'TechFlow Smartphone Review',
      brand: 'TechFlow',
      status: 'Active',
      reach: '45K',
      engagement: '5.2%',
      earnings: '$1,200',
      completion: 75
    },
    {
      campaign: 'Summer Fashion Collection',
      brand: 'FashionForward',
      status: 'Completed',
      reach: '32K',
      engagement: '6.1%',
      earnings: '$800',
      completion: 100
    },
    {
      campaign: 'Fitness Journey',
      brand: 'HealthFirst',
      status: 'Completed',
      reach: '28K',
      engagement: '4.9%',
      earnings: '$500',
      completion: 100
    }
  ];

  const contentPerformance = [
    {
      type: 'Reels',
      posts: 15,
      avgViews: '12.5K',
      avgEngagement: '5.8%',
      trend: 'up'
    },
    {
      type: 'Posts',
      posts: 24,
      avgViews: '8.2K',
      avgEngagement: '4.2%',
      trend: 'up'
    },
    {
      type: 'Stories',
      posts: 45,
      avgViews: '6.1K',
      avgEngagement: '3.1%',
      trend: 'down'
    }
  ];

  const monthlyData = [
    { month: 'Jan', earnings: 2100, campaigns: 2, reach: 89000 },
    { month: 'Feb', earnings: 2800, campaigns: 3, reach: 125000 },
    { month: 'Mar', earnings: 3200, campaigns: 4, reach: 156000 },
    { month: 'Apr', earnings: 2900, campaigns: 3, reach: 134000 },
    { month: 'May', earnings: 3800, campaigns: 5, reach: 198000 },
    { month: 'Jun', earnings: 4200, campaigns: 4, reach: 245000 }
  ];

  return (
    <div className="pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <div className="flex items-center space-x-3 mt-3 sm:mt-0">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              >
                {timeRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <RefreshCw className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="p-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {overviewStats.map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-full bg-${stat.color}-100`}>
                  <stat.icon className={`w-4 h-4 text-${stat.color}-600`} />
                </div>
                <div className={`flex items-center text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          ))}
        </div>

        {/* Earnings Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Earnings Overview</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t-lg flex flex-col justify-end" style={{ height: '200px' }}>
                  <div 
                    className="bg-indigo-600 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(data.earnings / 5000) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mt-2">{data.month}</div>
                <div className="text-xs font-medium text-gray-900">${data.earnings}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Performance */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance</h3>
          <div className="space-y-4">
            {campaignPerformance.map((campaign, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{campaign.campaign}</h4>
                    <p className="text-sm text-gray-600">{campaign.brand}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    campaign.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-gray-500">Reach</div>
                    <div className="font-semibold">{campaign.reach}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Engagement</div>
                    <div className="font-semibold">{campaign.engagement}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Earnings</div>
                    <div className="font-semibold text-green-600">{campaign.earnings}</div>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Completion</span>
                    <span>{campaign.completion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${campaign.completion}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Performance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Performance</h3>
          <div className="space-y-4">
            {contentPerformance.map((content, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{content.type}</h4>
                  <p className="text-sm text-gray-600">{content.posts} posts</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{content.avgViews}</div>
                  <div className="text-sm text-gray-600">Avg. Views</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{content.avgEngagement}</div>
                  <div className="text-sm text-gray-600">Avg. Engagement</div>
                </div>
                <div className={`text-sm ${content.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {content.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const BrandAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('reach');

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const overviewStats = [
    {
      title: 'Total Campaigns',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: Target,
      color: 'blue'
    },
    {
      title: 'Active Influencers',
      value: '28',
      change: '+5',
      trend: 'up',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Total Reach',
      value: '2.1M',
      change: '+15.2%',
      trend: 'up',
      icon: Eye,
      color: 'purple'
    },
    {
      title: 'Campaign Spend',
      value: '$45,200',
      change: '+8.7%',
      trend: 'up',
      icon: DollarSign,
      color: 'orange'
    }
  ];

  const campaignMetrics = [
    {
      campaign: 'Summer Collection Launch',
      status: 'Active',
      influencers: 8,
      reach: '485K',
      engagement: '4.2%',
      spend: '$12,500',
      roi: '320%',
      startDate: '2024-07-01'
    },
    {
      campaign: 'Tech Product Review Series',
      status: 'Active',
      influencers: 5,
      reach: '320K',
      engagement: '5.1%',
      spend: '$8,900',
      roi: '280%',
      startDate: '2024-06-15'
    },
    {
      campaign: 'Health & Wellness Campaign',
      status: 'Completed',
      influencers: 12,
      reach: '680K',
      engagement: '3.8%',
      spend: '$15,200',
      roi: '450%',
      startDate: '2024-05-01'
    },
    {
      campaign: 'Back to School Promotion',
      status: 'Completed',
      influencers: 6,
      reach: '290K',
      engagement: '4.6%',
      spend: '$7,800',
      roi: '380%',
      startDate: '2024-04-15'
    }
  ];

  const topInfluencers = [
    {
      name: '@tech_sarah',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
      followers: '45K',
      engagement: '5.2%',
      campaigns: 3,
      totalReach: '125K',
      rating: 4.9
    },
    {
      name: '@fashion_maya',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      followers: '28K',
      engagement: '6.1%',
      campaigns: 2,
      totalReach: '89K',
      rating: 5.0
    },
    {
      name: '@fitness_alex',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      followers: '35K',
      engagement: '4.8%',
      campaigns: 4,
      totalReach: '156K',
      rating: 4.8
    }
  ];

  const monthlyMetrics = [
    { month: 'Jan', reach: 890000, engagement: 38000, spend: 12500 },
    { month: 'Feb', reach: 1200000, engagement: 48000, spend: 15800 },
    { month: 'Mar', reach: 1560000, engagement: 62000, spend: 18900 },
    { month: 'Apr', reach: 1340000, engagement: 55000, spend: 16200 },
    { month: 'May', reach: 1980000, engagement: 78000, spend: 22400 },
    { month: 'Jun', reach: 2100000, engagement: 89000, spend: 25600 }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaign Analytics</h1>
            <p className="text-gray-600">Track your influencer marketing performance</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {overviewStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className={`flex items-center text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Reach Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Reach</h3>
            <Eye className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthlyMetrics.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t-lg flex flex-col justify-end" style={{ height: '200px' }}>
                  <div 
                    className="bg-purple-600 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(data.reach / 2500000) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mt-2">{data.month}</div>
                <div className="text-xs font-medium text-gray-900">
                  {(data.reach / 1000000).toFixed(1)}M
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spend Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Spend</h3>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthlyMetrics.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t-lg flex flex-col justify-end" style={{ height: '200px' }}>
                  <div 
                    className="bg-orange-600 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(data.spend / 30000) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mt-2">{data.month}</div>
                <div className="text-xs font-medium text-gray-900">
                  ${(data.spend / 1000).toFixed(1)}K
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Performance Table */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Influencers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reach
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ROI
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaignMetrics.map((campaign, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{campaign.campaign}</div>
                      <div className="text-sm text-gray-500">
                        Started {new Date(campaign.startDate).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      campaign.status === 'Active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.influencers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.reach}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.engagement}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.spend}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-green-600">{campaign.roi}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Influencers */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Top Performing Influencers</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {topInfluencers.map((influencer, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <img
                    src={influencer.avatar}
                    alt={influencer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{influencer.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{influencer.followers} followers</span>
                      <span>{influencer.campaigns} campaigns</span>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 text-yellow-400 mr-1" />
                        {influencer.rating}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-sm text-gray-500">Total Reach</div>
                    <div className="font-semibold text-gray-900">{influencer.totalReach}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Engagement</div>
                    <div className="font-semibold text-gray-900">{influencer.engagement}</div>
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;