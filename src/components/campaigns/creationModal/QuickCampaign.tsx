// components/campaigns/creationModal/QuickCampaign.tsx
import React, { useState } from 'react';
import { ArrowLeft, BarChart, Brain } from 'lucide-react';
import { Campaign } from './CreateCampaignModal';

interface QuickCampaignProps {
  formData: Partial<Campaign>;
  onFormDataChange: (data: Partial<Campaign>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export const QuickCampaign: React.FC<QuickCampaignProps> = ({
  formData,
  onFormDataChange,
  onBack,
  onSubmit
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
  };

  const handleContentRequirementChange = (platform: 'instagram' | 'youtube', type: string, value: number) => {
    onFormDataChange({
      ...formData,
      contentRequirements: {
        ...formData.contentRequirements,
        [platform]: {
          ...formData.contentRequirements?.[platform],
          [type]: value
        }
      }
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    try {
      // Add draft saving logic here
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-h-[70vh] overflow-y-auto" style={{ touchAction: 'pan-y' }}>
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700 mr-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-bold text-gray-800">Quick Campaign Setup</h3>
        <div className="ml-auto bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
          Fast Track
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Campaign Basics */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Title</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
              placeholder="Summer Fashion Collection"
              value={formData.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={formData.category || ''}
              onChange={(e) => handleInputChange('category', e.target.value)}
              required
            >
              <option value="">Select category...</option>
              <option value="Fashion & Style">Fashion & Style</option>
              <option value="Beauty & Makeup">Beauty & Makeup</option>
              <option value="Food & Lifestyle">Food & Lifestyle</option>
              <option value="Tech & Gaming">Tech & Gaming</option>
              <option value="Fitness & Health">Fitness & Health</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Description</label>
          <textarea 
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
            placeholder="Describe your campaign objectives and key messages..."
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            required
          />
        </div>

        {/* Content Requirements */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h4 className="font-semibold text-gray-800 mb-4">What do you need?</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700">Instagram Posts</span>
                <input 
                  type="number" 
                  min="0" 
                  max="5" 
                  value={formData.contentRequirements?.instagram?.posts || 1}
                  onChange={(e) => handleContentRequirementChange('instagram', 'posts', parseInt(e.target.value))}
                  className="w-16 px-2 py-1 rounded border border-gray-300"
                />
              </div>
              <p className="text-sm text-gray-500">Feed posts with your product</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700">Stories</span>
                <input 
                  type="number" 
                  min="0" 
                  max="10" 
                  value={formData.contentRequirements?.instagram?.stories || 2}
                  onChange={(e) => handleContentRequirementChange('instagram', 'stories', parseInt(e.target.value))}
                  className="w-16 px-2 py-1 rounded border border-gray-300"
                />
              </div>
              <p className="text-sm text-gray-500">Story mentions & swipe-ups</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700">Reels</span>
                <input 
                  type="number" 
                  min="0" 
                  max="3" 
                  value={formData.contentRequirements?.instagram?.reels || 0}
                  onChange={(e) => handleContentRequirementChange('instagram', 'reels', parseInt(e.target.value))}
                  className="w-16 px-2 py-1 rounded border border-gray-300"
                />
              </div>
              <p className="text-sm text-gray-500">Short video content</p>
            </div>
          </div>
        </div>

        {/* Influencer Criteria */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">How many influencers?</label>
            <select 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={formData.influencerCount || ''}
              onChange={(e) => handleInputChange('influencerCount', parseInt(e.target.value))}
              required
            >
              <option value="">Select...</option>
              <option value="1">1 influencer</option>
              <option value="2">2-3 influencers</option>
              <option value="3">4-5 influencers</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Follower Range</label>
            <select 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={formData.targetAudience?.followerRange || ''}
              onChange={(e) => handleInputChange('targetAudience', { ...formData.targetAudience, followerRange: e.target.value })}
              required
            >
              <option value="">Select range...</option>
              <option value="1K - 10K">1K - 10K (Nano)</option>
              <option value="10K - 100K">10K - 100K (Micro)</option>
              <option value="100K - 500K">100K - 500K (Mid-tier)</option>
              <option value="Any">Any size</option>
            </select>
          </div>
        </div>

        {/* Budget & Timeline */}
        <div className="bg-indigo-50 p-6 rounded-xl">
          <h4 className="font-semibold text-gray-800 mb-4">Budget & Timeline</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Budget</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input 
                  type="number" 
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  placeholder="500"
                  value={formData.budget?.replace('$', '') || ''}
                  onChange={(e) => handleInputChange('budget', `$${e.target.value}`)}
                  required
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Recommended: $200-800 for this setup</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Duration</label>
              <select 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.duration || ''}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                required
              >
                <option value="">Select duration...</option>
                <option value="1 week">1 week</option>
                <option value="2 weeks">2 weeks</option>
                <option value="1 month">1 month</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
          </div>
        </div>

        {/* Placeholder Features */}
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg border-2 border-dashed border-gray-300">
            <div className="flex items-center text-gray-500">
              <BarChart className="w-5 h-5 mr-2" />
              <span className="font-medium">Campaign Analytics Preview</span>
              <span className="ml-auto bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">Coming Soon</span>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg border-2 border-dashed border-gray-300">
            <div className="flex items-center text-gray-500">
              <Brain className="w-5 h-5 mr-2" />
              <span className="font-medium">AI-Powered Recommendations</span>
              <span className="ml-auto bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <button 
            type="button" 
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            onClick={handleSaveDraft}
            disabled={isSubmitting}
          >
            Save as Draft
          </button>
          <button 
            type="submit" 
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Launch Campaign'}
          </button>
        </div>
      </form>
    </div>
  );
};