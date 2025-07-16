// components/campaigns/CampaignCard.tsx
import React from 'react';
import { 
  Heart, 
  Share2, 
  DollarSign, 
  Clock, 
  MapPin, 
  TrendingUp, 
  Users, 
  Eye 
} from 'lucide-react';

interface Campaign {
  id: number;
  brand?: string;
  title: string;
  budget: string;
  deadline?: string;
  location?: string;
  category?: string;
  followers?: string;
  deliverables?: string[];
  description: string;
  image?: string;
  applications?: number;
  isNew?: boolean;
  status?: string;
  hired?: number;
  pending?: number;
  views?: number;
  createdAt?: string;
}

interface CampaignCardProps {
  campaign: Campaign;
  isInfluencer: boolean;
  onAction?: (campaignId: number, action: string) => void;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  isInfluencer,
  onAction
}) => {
  if (isInfluencer) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Campaign Image - Larger header */}
        <div className="relative h-32">
          {campaign.image ? (
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500" />
          )}
          
          {/* NEW badge */}
          {campaign.isNew && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </span>
          )}
          
          {/* Category overlay */}
          {campaign.category && (
            <span className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {campaign.category}
            </span>
          )}
          
          {/* Heart icon */}
          <button 
            className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            onClick={() => onAction?.(campaign.id, 'favorite')}
          >
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Campaign Details - Compact layout */}
        <div className="p-3">
          {/* Brand, Title, and Price */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1 mr-2">
              <span className="text-xs text-indigo-600 font-medium">{campaign.brand}</span>
              <h3 className="font-semibold text-sm text-gray-900 leading-tight">
                {campaign.title}
              </h3>
            </div>
            <span className="text-lg font-bold text-green-600">{campaign.budget}</span>
          </div>
          
          {/* Inline details row */}
          <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
            {campaign.deadline && (
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {campaign.deadline}
              </span>
            )}
            {campaign.followers && (
              <span className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {campaign.followers}
              </span>
            )}
            {campaign.location && (
              <span className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {campaign.location}
              </span>
            )}
          </div>

          {/* Deliverables - Compact tags */}
          {campaign.deliverables && campaign.deliverables.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {campaign.deliverables.slice(0, 3).map((deliverable, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  {deliverable}
                </span>
              ))}
              {campaign.deliverables.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  +{campaign.deliverables.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Action Buttons - Split layout */}
          <div className="flex gap-2">
            <button 
              className="flex-1 bg-indigo-600 text-white py-2 px-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-xs"
              onClick={() => onAction?.(campaign.id, 'apply')}
            >
              Apply
            </button>
            <button 
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => onAction?.(campaign.id, 'view')}
            >
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Brand view (unchanged for now, but maintaining existing layout)
  return (
    <div className="border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center mb-2">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-0">
                {campaign.title}
              </h3>
              {campaign.status && (
                <span className={`self-start md:ml-3 px-2 py-1 text-xs font-medium rounded-full ${
                  campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                  campaign.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.status}
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm md:text-base mb-4">
              {campaign.description}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs md:text-sm text-gray-500">Applications</p>
            <p className="font-semibold">{campaign.applications}</p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-500">Budget</p>
            <p className="font-semibold">{campaign.budget}</p>
          </div>
          {campaign.hired !== undefined && (
            <div>
              <p className="text-xs md:text-sm text-gray-500">Hired</p>
              <p className="font-semibold">{campaign.hired}</p>
            </div>
          )}
          {campaign.views !== undefined && (
            <div>
              <p className="text-xs md:text-sm text-gray-500">Views</p>
              <p className="font-semibold">{campaign.views}</p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-3">
          <button 
            className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-sm md:text-base"
            onClick={() => onAction?.(campaign.id, 'view')}
          >
            View Details
          </button>
          {campaign.status === 'active' && (
            <button 
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm md:text-base"
              onClick={() => onAction?.(campaign.id, 'manage')}
            >
              Manage Applications
            </button>
          )}
        </div>
      </div>
    </div>
  );
};