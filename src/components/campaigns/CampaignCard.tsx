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
        {/* Campaign Image */}
        {campaign.image && (
          <div className="relative">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-40 md:h-48 object-cover"
            />
            {campaign.isNew && (
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                NEW
              </span>
            )}
            <div className="absolute top-2 right-2 flex gap-1">
              <button 
                className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                onClick={() => onAction?.(campaign.id, 'favorite')}
              >
                <Heart className="w-4 h-4 text-gray-600" />
              </button>
              <button 
                className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                onClick={() => onAction?.(campaign.id, 'share')}
              >
                <Share2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        )}

        {/* Campaign Details */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-indigo-600">{campaign.brand}</span>
            <div className="flex items-center text-gray-500 text-sm">
              <Users className="w-4 h-4 mr-1" />
              {campaign.applications}
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {campaign.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {campaign.description}
          </p>

          {/* Campaign Info Grid - 2 columns on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="flex items-center text-sm">
              <DollarSign className="w-4 h-4 text-green-500 mr-1 flex-shrink-0" />
              <span className="font-medium truncate">{campaign.budget}</span>
            </div>
            {campaign.deadline && (
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 text-orange-500 mr-1 flex-shrink-0" />
                <span className="truncate">{campaign.deadline}</span>
              </div>
            )}
            {campaign.location && (
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 text-blue-500 mr-1 flex-shrink-0" />
                <span className="truncate">{campaign.location}</span>
              </div>
            )}
            {campaign.followers && (
              <div className="flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-purple-500 mr-1 flex-shrink-0" />
                <span className="truncate">{campaign.followers}</span>
              </div>
            )}
          </div>

          {/* Deliverables - Responsive wrapping */}
          {campaign.deliverables && (
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Deliverables:</div>
              <div className="flex flex-wrap gap-1">
                {campaign.deliverables.map((deliverable, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {deliverable}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons - Mobile Optimized */}
          <div className="flex gap-2">
            <button 
              className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm md:text-base"
              onClick={() => onAction?.(campaign.id, 'apply')}
            >
              Apply Now
            </button>
            <button 
              className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => onAction?.(campaign.id, 'view')}
            >
              <Eye className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Brand view
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