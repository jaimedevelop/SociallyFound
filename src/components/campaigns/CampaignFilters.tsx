// components/campaigns/CampaignFilters.tsx
import React, { useState } from 'react';
import { 
  ChevronDown, 
  DollarSign, 
  MapPin, 
  Users, 
  Clock,
  Filter,
  X 
} from 'lucide-react';

interface FilterState {
  category: string;
  budgetRange: { min: number; max: number };
  location: string;
  contentTypes: string[];
  followerRange: { min: number; max: number };
  urgency: string;
}

interface CampaignFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  filterOptions: {
    budgetRanges: Array<{ label: string; min: number; max: number }>;
    locations: string[];
    contentTypes: string[];
    followerRanges: Array<{ label: string; min: number; max: number }>;
    urgencyLevels: string[];
  };
  className?: string;
}

export const CampaignFilters: React.FC<CampaignFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  filters,
  onFiltersChange,
  filterOptions,
  className = ""
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Check if any advanced filters are active
  const hasActiveFilters = 
    filters.budgetRange.min > 0 || 
    filters.budgetRange.max < Infinity ||
    filters.location !== 'All Locations' ||
    filters.contentTypes.length > 0 ||
    filters.followerRange.min > 0 ||
    filters.followerRange.max < Infinity ||
    filters.urgency !== 'all';

  const handleBudgetRangeChange = (range: { min: number; max: number }) => {
    onFiltersChange({
      ...filters,
      budgetRange: range
    });
    setOpenDropdown(null);
  };

  const handleLocationChange = (location: string) => {
    onFiltersChange({
      ...filters,
      location
    });
    setOpenDropdown(null);
  };

  const handleContentTypeToggle = (contentType: string) => {
    const updatedTypes = filters.contentTypes.includes(contentType)
      ? filters.contentTypes.filter(type => type !== contentType)
      : [...filters.contentTypes, contentType];
    
    onFiltersChange({
      ...filters,
      contentTypes: updatedTypes
    });
  };

  const handleFollowerRangeChange = (range: { min: number; max: number }) => {
    onFiltersChange({
      ...filters,
      followerRange: range
    });
    setOpenDropdown(null);
  };

  const handleUrgencyChange = (urgency: string) => {
    onFiltersChange({
      ...filters,
      urgency
    });
    setOpenDropdown(null);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: 'all',
      budgetRange: { min: 0, max: Infinity },
      location: 'All Locations',
      contentTypes: [],
      followerRange: { min: 0, max: Infinity },
      urgency: 'all'
    });
    onCategoryChange('all');
  };

  const getCurrentBudgetLabel = () => {
    const current = filterOptions.budgetRanges.find(
      range => range.min === filters.budgetRange.min && range.max === filters.budgetRange.max
    );
    return current?.label || 'Custom Range';
  };

  const getCurrentFollowerLabel = () => {
    const current = filterOptions.followerRanges.find(
      range => range.min === filters.followerRange.min && range.max === filters.followerRange.max
    );
    return current?.label || 'Custom Range';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Category Filters - Keep your existing design */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'All' : category}
          </button>
        ))}
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Filter className="w-4 h-4" />
          Advanced Filters
          <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
          >
            <X className="w-3 h-3" />
            Clear All
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Budget Range Filter */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'budget' ? null : 'budget')}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 transition-colors ${
                filters.budgetRange.min > 0 || filters.budgetRange.max < Infinity
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span className="truncate">{getCurrentBudgetLabel()}</span>
              </div>
              <ChevronDown className="w-4 h-4 flex-shrink-0" />
            </button>
            
            {openDropdown === 'budget' && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {filterOptions.budgetRanges.map((range, index) => (
                  <button
                    key={index}
                    onClick={() => handleBudgetRangeChange(range)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location Filter */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'location' ? null : 'location')}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 transition-colors ${
                filters.location !== 'All Locations'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{filters.location}</span>
              </div>
              <ChevronDown className="w-4 h-4 flex-shrink-0" />
            </button>
            
            {openDropdown === 'location' && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                {filterOptions.locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => handleLocationChange(location)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content Types Filter */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'content' ? null : 'content')}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 transition-colors ${
                filters.contentTypes.length > 0
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="truncate">
                  {filters.contentTypes.length > 0 
                    ? `Content (${filters.contentTypes.length})`
                    : 'Content Type'
                  }
                </span>
              </div>
              <ChevronDown className="w-4 h-4 flex-shrink-0" />
            </button>
            
            {openDropdown === 'content' && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                {filterOptions.contentTypes.map((contentType) => (
                  <label
                    key={contentType}
                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.contentTypes.includes(contentType)}
                      onChange={() => handleContentTypeToggle(contentType)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    {contentType}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Follower Range Filter */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'followers' ? null : 'followers')}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 transition-colors ${
                filters.followerRange.min > 0 || filters.followerRange.max < Infinity
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="truncate">{getCurrentFollowerLabel()}</span>
              </div>
              <ChevronDown className="w-4 h-4 flex-shrink-0" />
            </button>
            
            {openDropdown === 'followers' && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {filterOptions.followerRanges.map((range, index) => (
                  <button
                    key={index}
                    onClick={() => handleFollowerRangeChange(range)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Urgency Filter */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'urgency' ? null : 'urgency')}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 transition-colors ${
                filters.urgency !== 'all'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="truncate">
                  {filters.urgency === 'all' ? 'Urgency' : filters.urgency}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 flex-shrink-0" />
            </button>
            
            {openDropdown === 'urgency' && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {filterOptions.urgencyLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => handleUrgencyChange(level)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg capitalize"
                  >
                    {level === 'all' ? 'All Urgency' : level}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.budgetRange.min > 0 || filters.budgetRange.max < Infinity ? (
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full">
              {getCurrentBudgetLabel()}
              <button
                onClick={() => handleBudgetRangeChange({ min: 0, max: Infinity })}
                className="hover:text-indigo-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ) : null}
          
          {filters.location !== 'All Locations' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full">
              {filters.location}
              <button
                onClick={() => handleLocationChange('All Locations')}
                className="hover:text-indigo-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          
          {filters.contentTypes.map((type) => (
            <span
              key={type}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full"
            >
              {type}
              <button
                onClick={() => handleContentTypeToggle(type)}
                className="hover:text-indigo-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};