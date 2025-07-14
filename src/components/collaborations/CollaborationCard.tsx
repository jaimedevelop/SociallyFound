// components/collaborations/CollaborationCard.tsx
import React from 'react';
import { 
  MessageSquare, 
  Upload, 
  Download, 
  Star, 
  Calendar 
} from 'lucide-react';
import { DeliverableStatus } from './DeliverableStatus';

interface Deliverable {
  type: string;
  status: string;
  dueDate?: string;
  submittedAt?: string;
  approved?: boolean;
}

interface Collaboration {
  id: number;
  brand?: string;
  campaign: string;
  status: string;
  budget: string;
  deadline: string;
  progress: number;
  deliverables: Deliverable[];
  brandLogo?: string;
  lastMessage?: string;
  rating: number;
  earnings?: string;
  influencer?: string;
  influencerName?: string;
  followers?: string;
  engagement?: string;
  influencerAvatar?: string;
  lastActivity?: string;
  previousCollabs?: number;
}

interface CollaborationCardProps {
  collaboration: Collaboration;
  isInfluencer: boolean;
  onAction: (collaborationId: number, action: string) => void;
  onDeliverableAction?: (deliverable: Deliverable, action: string) => void;
}

export const CollaborationCard: React.FC<CollaborationCardProps> = ({
  collaboration,
  isInfluencer,
  onAction,
  onDeliverableAction
}) => {
  if (isInfluencer) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              {collaboration.brandLogo && (
                <img
                  src={collaboration.brandLogo}
                  alt={collaboration.brand}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="font-semibold text-gray-900">{collaboration.brand}</h3>
                <p className="text-sm text-gray-600">{collaboration.campaign}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-green-600">{collaboration.budget}</div>
              {collaboration.earnings && (
                <div className="text-xs text-gray-500">Earned: {collaboration.earnings}</div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{collaboration.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${collaboration.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              Due: {new Date(collaboration.deadline).toLocaleDateString()}
            </div>
            <div className="flex items-center text-gray-500">
              <Star className="w-4 h-4 mr-1 text-yellow-400" />
              {collaboration.rating}
            </div>
          </div>
        </div>

        {/* Deliverables */}
        <div className="p-4">
          <h4 className="font-medium text-gray-900 mb-3">Deliverables</h4>
          <DeliverableStatus 
            deliverables={collaboration.deliverables}
            isInfluencer={true}
          />

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-4">
            <button 
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
              onClick={() => onAction(collaboration.id, 'message')}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Message Brand
            </button>
            {collaboration.status === 'in_progress' && (
              <button 
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                onClick={() => onAction(collaboration.id, 'submit')}
              >
                <Upload className="w-4 h-4 mr-2" />
                Submit Work
              </button>
            )}
            {collaboration.status === 'completed' && (
              <button 
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center"
                onClick={() => onAction(collaboration.id, 'download')}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Brand view
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
        <div className="flex items-center space-x-4">
          {collaboration.influencerAvatar && (
            <img
              src={collaboration.influencerAvatar}
              alt={collaboration.influencerName}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{collaboration.influencerName}</h3>
            <p className="text-indigo-600 font-medium">{collaboration.influencer}</p>
            <p className="text-gray-600">{collaboration.campaign}</p>
            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
              <span>{collaboration.followers} followers</span>
              <span>{collaboration.engagement} engagement</span>
              <span>{collaboration.previousCollabs} previous collabs</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 lg:mt-0 text-right">
          <div className="text-2xl font-bold text-gray-900">{collaboration.budget}</div>
          <div className="text-sm text-gray-500">Campaign Budget</div>
          <div className="flex items-center justify-end mt-2">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{collaboration.rating}</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Campaign Progress</span>
          <span>{collaboration.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${collaboration.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Deliverables */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Deliverables Status</h4>
        <DeliverableStatus 
          deliverables={collaboration.deliverables}
          isInfluencer={false}
          onAction={onDeliverableAction}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <button 
          className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
          onClick={() => onAction(collaboration.id, 'message')}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Message Influencer
        </button>
        <button 
          className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          onClick={() => onAction(collaboration.id, 'contract')}
        >
          View Contract
        </button>
      </div>
    </div>
  );
};