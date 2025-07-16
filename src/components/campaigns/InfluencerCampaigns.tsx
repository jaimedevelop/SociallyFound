// components/campaigns/InfluencerCampaigns.tsx
import React from 'react';
import { CampaignHeader } from './CampaignHeader';
import { CampaignFilters } from './CampaignFilters';
import { CampaignStats } from './CampaignStats';
import { CampaignCard } from './CampaignCard';
import { MockCampaign, FilterState } from '../../data/mockCampaigns';

interface InfluencerCampaignsProps {
  campaigns: MockCampaign[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  filterOptions: {
    budgetRanges: Array<{ label: string; min: number; max: number }>;
    locations: string[];
    contentTypes: string[];
    followerRanges: Array<{ label: string; min: number; max: number }>;
    urgencyLevels: string[];
  };
  stats: {
    applied: number;
    shortlisted: number;
  };
  onCampaignAction: (campaignId: number, action: string) => void;
}

export const InfluencerCampaigns: React.FC<InfluencerCampaignsProps> = ({
  campaigns,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  filters,
  onFiltersChange,
  filterOptions,
  stats,
  onCampaignAction
}) => {
  // Enhanced filtering logic with proper error handling
  const filteredCampaigns = campaigns.filter(campaign => {
    try {
      // Search filter - now includes description and tags
      const matchesSearch = searchTerm === '' || (
        campaign.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (campaign.tags && campaign.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );

      // Category filter
      const matchesCategory = selectedCategory === 'all' || campaign.category === selectedCategory;

      // Budget range filter - with safety checks
      const matchesBudget = !filters.budgetRange || (
        filters.budgetRange.min === 0 && filters.budgetRange.max === Infinity
      ) || (
        campaign.budgetRange && 
        campaign.budgetRange.min >= filters.budgetRange.min &&
        campaign.budgetRange.max <= filters.budgetRange.max
      );

      // Location filter - with safety checks
      const matchesLocation = !filters.location || filters.location === 'All Locations' || (
        filters.location === 'Remote' ? campaign.isRemote : campaign.location === filters.location
      );

      // Content type filter - with safety checks
      const matchesContentType = !filters.contentTypes || filters.contentTypes.length === 0 || 
        (campaign.contentType && filters.contentTypes.some(type => campaign.contentType.includes(type)));

      // Follower range filter - with safety checks
      const matchesFollowerRange = !filters.followerRange || (
        filters.followerRange.min === 0 && filters.followerRange.max === Infinity
      ) || (
        campaign.followerRange && 
        campaign.followerRange.min >= filters.followerRange.min &&
        campaign.followerRange.max <= filters.followerRange.max
      );

      // Urgency filter - with safety checks
      const matchesUrgency = !filters.urgency || filters.urgency === 'all' || campaign.urgency === filters.urgency;

      return matchesSearch && matchesCategory && matchesBudget && 
             matchesLocation && matchesContentType && matchesFollowerRange && matchesUrgency;
    } catch (error) {
      console.warn('Error filtering campaign:', campaign, error);
      // If there's an error, include the campaign (fail gracefully)
      return true;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <CampaignHeader 
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        isInfluencer={true}
      />
      
      {/* Enhanced Filters */}
      <div className="bg-white p-4 border-b border-gray-200">
        <CampaignFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          filters={filters}
          onFiltersChange={onFiltersChange}
          filterOptions={filterOptions}
        />
      </div>
      
      {/* Quick Stats */}
      <CampaignStats
        isInfluencer={true}
        stats={{
          available: filteredCampaigns.length,
          applied: stats.applied,
          shortlisted: stats.shortlisted
        }}
        filteredCount={filteredCampaigns.length}
      />
      
      {/* Results Summary */}
      {(searchTerm || 
        (filters?.budgetRange && (filters.budgetRange.min > 0 || filters.budgetRange.max < Infinity)) || 
        (filters?.location && filters.location !== 'All Locations') || 
        (filters?.contentTypes && filters.contentTypes.length > 0) || 
        (filters?.followerRange && (filters.followerRange.min > 0 || filters.followerRange.max < Infinity)) || 
        (filters?.urgency && filters.urgency !== 'all')) && (
        <div className="px-4 py-2">
          <p className="text-sm text-gray-600">
            Showing {filteredCampaigns.length} of {campaigns.length} campaigns
            {searchTerm && (
              <span> matching "{searchTerm}"</span>
            )}
          </p>
        </div>
      )}
      
      {/* Campaign Cards - Updated Grid Layout */}
      <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              isInfluencer={true}
              onAction={onCampaignAction}
            />
          ))
        ) : (
          // No results message - spans full width
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find more opportunities.
            </p>
            <button
              onClick={() => {
                onSearchChange('');
                onFiltersChange({
                  category: 'all',
                  budgetRange: { min: 0, max: Infinity },
                  location: 'All Locations',
                  contentTypes: [],
                  followerRange: { min: 0, max: Infinity },
                  urgency: 'all'
                });
                onCategoryChange('all');
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Load More - Only show if there are results */}
      {filteredCampaigns.length > 0 && (
        <div className="p-4 pb-8">
          <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            Load More Campaigns
          </button>
        </div>
      )}
    </div>
  );
};