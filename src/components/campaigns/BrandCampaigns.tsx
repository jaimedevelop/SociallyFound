// components/campaigns/BrandCampaigns.tsx
import React, { useState } from 'react';
import { 
  CampaignHeader,
  CampaignStats,
  CampaignTabs,
  CampaignCard
} from './index';

interface Campaign {
  id: number;
  type?: 'quick' | 'advanced';
  title: string;
  status: string;
  applications: number;
  budget: string;
  deadline: string;
  category: string;
  description: string;
  hired: number;
  pending: number;
  views: number;
  createdAt: string;
  // Optional fields for created campaigns
  campaignType?: string;
  priority?: string;
  contentRequirements?: {
    instagram: { posts: number; stories: number; reels: number };
    youtube: { videos: number; shorts: number; community: number };
  };
  influencerCount?: number;
  duration?: string;
  targetAudience?: {
    followerRange: string;
    locations: string[];
    demographics: string[];
  };
}

interface BrandCampaignsProps {
  campaigns: Campaign[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: { id: string; label: string; count: number }[];
  stats: {
    totalCampaigns: number;
    applications: number;
    hired: number;
    monthlySpend: string;
  };
  onCampaignAction: (campaignId: number, action: string) => void;
}

export const BrandCampaigns: React.FC<BrandCampaignsProps> = ({
  campaigns: initialCampaigns,
  activeTab,
  onTabChange,
  tabs,
  stats,
  onCampaignAction
}) => {
  // Use internal state for campaigns to handle new campaign creation
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

  const handleCampaignCreated = (newCampaign: Campaign) => {
    setCampaigns(prev => [newCampaign, ...prev]);
    // TODO: Update tabs counts if needed
    // TODO: Show success notification
  };

  const filteredCampaigns = campaigns.filter(campaign => 
    activeTab === 'active' ? campaign.status === 'active' :
    activeTab === 'draft' ? campaign.status === 'draft' :
    campaign.status === 'completed'
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 max-w-7xl mx-auto">
      <CampaignHeader 
        searchTerm=""
        onSearchChange={() => {}}
        isInfluencer={false}
        title="Campaign Management"
        subtitle="Create and manage your influencer campaigns"
        onCampaignCreated={handleCampaignCreated}
      />
      
      {/* Stats Cards */}
      <CampaignStats
        isInfluencer={false}
        stats={stats}
      />
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <CampaignTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
        
        {/* Campaign List */}
        <div className="p-4 md:p-6">
          <div className="space-y-4 md:space-y-6">
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  isInfluencer={false}
                  onAction={onCampaignAction}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-2">
                  No campaigns found
                </div>
                <div className="text-gray-400 text-sm">
                  {activeTab === 'active' && 'No active campaigns yet. Create your first campaign to get started!'}
                  {activeTab === 'draft' && 'No draft campaigns. Start creating a campaign and save it as a draft.'}
                  {activeTab === 'completed' && 'No completed campaigns yet.'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};