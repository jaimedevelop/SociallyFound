// components/campaigns/CampaignHeader.tsx
import React from 'react';
import { Search } from 'lucide-react';
import { CreateCampaignButton } from './index';

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

interface CampaignHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  isInfluencer: boolean;
  title?: string;
  subtitle?: string;
  onCampaignCreated?: (campaign: Campaign) => void;
}

export const CampaignHeader: React.FC<CampaignHeaderProps> = ({
  searchTerm,
  onSearchChange,
  isInfluencer,
  title,
  subtitle,
  onCampaignCreated
}) => {
  const defaultTitle = isInfluencer ? "Available Campaigns" : "Campaign Management";
  const defaultSubtitle = isInfluencer 
    ? "Discover opportunities that match your profile" 
    : "Create and manage your influencer campaigns";

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="mb-4 md:mb-0">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              {title || defaultTitle}
            </h1>
            {subtitle !== undefined && (
              <p className="text-gray-600 text-sm md:text-base">
                {subtitle || defaultSubtitle}
              </p>
            )}
          </div>
          {!isInfluencer && (
            <CreateCampaignButton 
              onCampaignCreated={onCampaignCreated}
            />
          )}
        </div>
        
        {/* Search Bar - Full width on mobile */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search campaigns..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};