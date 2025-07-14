// components/campaigns/CreateCampaignButton.tsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { CreateCampaignModal } from './creationModal';

interface Campaign {
  id: number;
  type: 'quick' | 'advanced';
  title: string;
  description: string;
  category: string;
  budget: string;
  status: 'draft' | 'active';
  applications: number;
  hired: number;
  pending: number;
  views: number;
  createdAt: string;
  deadline?: string;
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

interface CreateCampaignButtonProps {
  onCampaignCreated?: (campaign: Campaign) => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export const CreateCampaignButton: React.FC<CreateCampaignButtonProps> = ({
  onCampaignCreated,
  className = '',
  variant = 'primary',
  size = 'md',
  children
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleCampaignCreated = (campaign: Campaign) => {
    onCampaignCreated?.(campaign);
    setShowModal(false);
  };

  // Size variants
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 md:px-6 py-3 text-sm md:text-base',
    lg: 'px-6 py-4 text-base md:text-lg'
  };

  // Variant styles
  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500'
  };

  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-lg
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={baseClasses}
        type="button"
      >
        <Plus className="w-5 h-5 mr-2 flex-shrink-0" />
        {children || 'Create Campaign'}
      </button>

      <CreateCampaignModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCampaignCreated={handleCampaignCreated}
      />
    </>
  );
};

// Export default for easier imports
export default CreateCampaignButton;