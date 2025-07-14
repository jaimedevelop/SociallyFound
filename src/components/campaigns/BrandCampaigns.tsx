// components/campaigns/BrandCampaigns.tsx
import React from 'react';
import { CampaignHeader } from './CampaignHeader';
import { CampaignStats } from './CampaignStats';
import { CampaignTabs } from './CampaignTabs';
import { CampaignCard } from './CampaignCard';

interface Campaign {
  id: number;
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
  campaigns,
  activeTab,
  onTabChange,
  tabs,
  stats,
  onCampaignAction
}) => {
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
            {filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                isInfluencer={false}
                onAction={onCampaignAction}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};