// pages/Campaigns.tsx - Updated with full filter state management
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  InfluencerCampaigns,
  BrandCampaigns
} from '../components/campaigns';
import { enhancedMockCampaigns, filterOptions, defaultFilters, FilterState } from '../data/mockCampaigns';

const Campaigns: React.FC = () => {
  const { profile } = useAuth();
  const isInfluencer = profile?.userType === 'influencer';
  
  // Influencer state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Enhanced filter state
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  
  // Brand state
  const [activeTab, setActiveTab] = useState('active');

  // Mock data for brands
  const mockBrandCampaigns = [
    {
      id: 1,
      title: 'Summer Collection Launch',
      status: 'active',
      applications: 24,
      budget: '$2,500',
      deadline: '2024-08-15',
      category: 'Fashion',
      description: 'Promote our new summer collection with authentic lifestyle content',
      hired: 3,
      pending: 12,
      views: 1250,
      createdAt: '2024-07-01'
    },
    {
      id: 2,
      title: 'Tech Product Review Campaign',
      status: 'draft',
      applications: 0,
      budget: '$3,000',
      deadline: '2024-09-01',
      category: 'Technology',
      description: 'Comprehensive review of our latest smartphone series',
      hired: 0,
      pending: 0,
      views: 0,
      createdAt: '2024-07-05'
    },
    {
      id: 3,
      title: 'Fitness Challenge Series',
      status: 'completed',
      applications: 45,
      budget: '$1,800',
      deadline: '2024-06-30',
      category: 'Health & Fitness',
      description: '30-day fitness challenge featuring our supplement line',
      hired: 5,
      pending: 0,
      views: 2340,
      createdAt: '2024-05-15'
    }
  ];

  const categories = filterOptions.categories;
  
  const tabs = [
    { id: 'active', label: 'Active', count: 2 },
    { id: 'draft', label: 'Drafts', count: 1 },
    { id: 'completed', label: 'Completed', count: 1 }
  ];

  const influencerStats = {
    applied: 12,
    shortlisted: 3
  };

  const brandStats = {
    totalCampaigns: 12,
    applications: 347,
    hired: 23,
    monthlySpend: '$12.5K'
  };

  // Enhanced filter handler that updates both category and filter state
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setFilters(prev => ({
      ...prev,
      category
    }));
  };

  // Advanced filters handler
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Update selected category to match filter category
    setSelectedCategory(newFilters.category);
  };

  const handleInfluencerCampaignAction = (campaignId: number, action: string) => {
    console.log(`Influencer action: ${action} on campaign ${campaignId}`);
    switch (action) {
      case 'apply':
        // Handle apply logic
        break;
      case 'favorite':
        // Handle favorite logic
        break;
      case 'share':
        // Handle share logic
        break;
      case 'view':
        // Handle view details logic
        break;
    }
  };

  const handleBrandCampaignAction = (campaignId: number, action: string) => {
    console.log(`Brand action: ${action} on campaign ${campaignId}`);
    switch (action) {
      case 'view':
        // Handle view details logic
        break;
      case 'manage':
        // Handle manage applications logic
        break;
      case 'edit':
        // Handle edit campaign logic
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {isInfluencer ? (
        <InfluencerCampaigns
          campaigns={enhancedMockCampaigns}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          categories={categories}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          filterOptions={filterOptions}
          stats={influencerStats}
          onCampaignAction={handleInfluencerCampaignAction}
        />
      ) : (
        <BrandCampaigns
          campaigns={mockBrandCampaigns}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={tabs}
          stats={brandStats}
          onCampaignAction={handleBrandCampaignAction}
        />
      )}
    </div>
  );
};

export default Campaigns;