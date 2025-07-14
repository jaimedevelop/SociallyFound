// components/campaigns/creationModal/CreateCampaignModal.tsx
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CampaignTypeCard } from './CampaignTypeCard';
import { QuickCampaign } from './QuickCampaign';
import { AdvancedCampaign } from './AdvancedCampaign';
import { QuickStart } from './QuickStart';

export interface Campaign {
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

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCampaignCreated: (campaign: Campaign) => void;
}

type ModalView = 'selection' | 'quick' | 'advanced';

export const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({
  isOpen,
  onClose,
  onCampaignCreated
}) => {
  const [modalView, setModalView] = useState<ModalView>('selection');
  const [formData, setFormData] = useState<Partial<Campaign>>({});

  // Body scroll lock effect
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = '0';
      document.body.style.left = '0';
      document.body.style.right = '0';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle overlay click and touch events
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOverlayTouchStart = (e: React.TouchEvent) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
    }
  };

  const handleOverlayTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleModalTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  const resetModal = () => {
    setModalView('selection');
    setFormData({});
  };

  const handleCampaignSubmit = async (type: 'quick' | 'advanced') => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCampaign: Campaign = {
        id: Date.now(),
        type,
        title: formData.title || 'Untitled Campaign',
        description: formData.description || 'No description provided',
        category: formData.category || 'General',
        budget: formData.budget || '$0',
        status: 'draft',
        applications: 0,
        hired: 0,
        pending: 0,
        views: 0,
        createdAt: new Date().toISOString().split('T')[0],
        deadline: formData.deadline,
        campaignType: formData.campaignType,
        priority: formData.priority,
        contentRequirements: formData.contentRequirements,
        influencerCount: formData.influencerCount,
        duration: formData.duration,
        targetAudience: formData.targetAudience
      };

      onCampaignCreated(newCampaign);
      onClose();
      resetModal();
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
      onTouchStart={handleOverlayTouchStart}
      onTouchMove={handleOverlayTouchMove}
      style={{ touchAction: 'none' }}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={handleModalClick}
        onTouchStart={handleModalTouchStart}
        style={{ touchAction: 'auto' }}
      >
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Create New Campaign</h2>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="mt-2 text-indigo-100">
            {modalView === 'selection' && 'Choose your campaign type to get started'}
            {modalView === 'quick' && 'Quick Campaign Setup - Fast Track'}
            {modalView === 'advanced' && 'Advanced Campaign Setup - Professional'}
          </p>
        </div>

        {/* Type Selection View */}
        {modalView === 'selection' && (
          <div className="p-8 max-h-[70vh] overflow-y-auto" style={{ touchAction: 'pan-y' }}>
            <div className="grid md:grid-cols-2 gap-6">
              <CampaignTypeCard
                type="quick"
                title="Quick Campaign"
                subtitle="Perfect for small brands"
                features={[
                  "1-5 influencers",
                  "Simple deliverables", 
                  "Fast setup (2 minutes)",
                  "Budget: $50-$2,000"
                ]}
                badge="Most Popular Choice"
                onClick={() => setModalView('quick')}
              />
              
              <CampaignTypeCard
                type="advanced"
                title="Advanced Campaign"
                subtitle="For established brands"
                features={[
                  "5+ influencers",
                  "Complex deliverables",
                  "Advanced targeting",
                  "Budget: $2,000+"
                ]}
                badge="Full Control & Analytics"
                onClick={() => setModalView('advanced')}
              />
            </div>

            <QuickStart />
          </div>
        )}

        {/* Quick Campaign Form */}
        {modalView === 'quick' && (
          <QuickCampaign
            formData={formData}
            onFormDataChange={setFormData}
            onBack={resetModal}
            onSubmit={() => handleCampaignSubmit('quick')}
          />
        )}

        {/* Advanced Campaign Form */}
        {modalView === 'advanced' && (
          <AdvancedCampaign
            formData={formData}
            onFormDataChange={setFormData}
            onBack={resetModal}
            onSubmit={() => handleCampaignSubmit('advanced')}
          />
        )}
      </div>
    </div>
  );
};