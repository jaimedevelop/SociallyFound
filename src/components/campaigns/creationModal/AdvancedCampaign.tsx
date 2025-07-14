// components/campaigns/creationModal/AdvancedCampaign.tsx
import React, { useState } from 'react';
import { ArrowLeft, Shield, TrendingUp } from 'lucide-react';
import { Campaign } from './CreateCampaignModal';

interface AdvancedCampaignProps {
  formData: Partial<Campaign>;
  onFormDataChange: (data: Partial<Campaign>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export const AdvancedCampaign: React.FC<AdvancedCampaignProps> = ({
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
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = () => {
    // Add preview logic here
    console.log('Preview campaign:', formData);
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
        <h3 className="text-xl font-bold text-gray-800">Advanced Campaign Setup</h3>
        <div className="ml-auto bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          Professional
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-8">
        {/* Campaign Overview */}
        <div className="bg-blue-50 p-6 rounded-xl">
          <h4 className="font-semibold text-gray-800 mb-4">Campaign Overview</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Title</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Q3 Product Launch Campaign"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Description</label>
              <textarea 
                rows={3} 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Detailed campaign description, objectives, and key messages..."
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.category || ''}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  required
                >
                  <option value="">Select...</option>
                  <option value="Fashion & Style">Fashion & Style</option>
                  <option value="Beauty & Makeup">Beauty & Makeup</option>
                  <option value="Food & Lifestyle">Food & Lifestyle</option>
                  <option value="Tech & Gaming">Tech & Gaming</option>
                  <option value="Fitness & Health">Fitness & Health</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Type</label>
                <select 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.campaignType || ''}
                  onChange={(e) => handleInputChange('campaignType', e.target.value)}
                  required
                >
                  <option value="">Select...</option>
                  <option value="Product Launch">Product Launch</option>
                  <option value="Brand Awareness">Brand Awareness</option>
                  <option value="Seasonal Campaign">Seasonal Campaign</option>
                  <option value="Event Promotion">Event Promotion</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.priority || ''}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  required
                >
                  <option value="">Select...</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content Requirements */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h4 className="font-semibold text-gray-800 mb-4">Content Requirements</h4>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-700 mb-3">Instagram</h5>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Posts</span>
                    <input 
                      type="number" 
                      min="0" 
                      value={formData.contentRequirements?.instagram?.posts || 3}
                      onChange={(e) => handleContentRequirementChange('instagram', 'posts', parseInt(e.target.value))}
                      className="w-16 px-2 py-1 rounded border border-gray-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Stories</span>
                    <input 
                      type="number" 
                      min="0" 
                      value={formData.contentRequirements?.instagram?.stories || 5}
                      onChange={(e) => handleContentRequirementChange('instagram', 'stories', parseInt(e.target.value))}
                      className="w-16 px-2 py-1 rounded border border-gray-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Reels</span>
                    <input 
                      type="number" 
                      min="0" 
                      value={formData.contentRequirements?.instagram?.reels || 2}
                      onChange={(e) => handleContentRequirementChange('instagram', 'reels', parseInt(e.target.value))}
                      className="w-16 px-2 py-1 rounded border border-gray-300"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-700 mb-3">YouTube</h5>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Long-form Videos</span>
                    <input 
                      type="number" 
                      min="0" 
                      value={formData.contentRequirements?.youtube?.videos || 1}
                      onChange={(e) => handleContentRequirementChange('youtube', 'videos', parseInt(e.target.value))}
                      className="w-16 px-2 py-1 rounded border border-gray-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Shorts</span>
                    <input 
                      type="number" 
                      min="0" 
                      value={formData.contentRequirements?.youtube?.shorts || 3}
                      onChange={(e) => handleContentRequirementChange('youtube', 'shorts', parseInt(e.target.value))}
                      className="w-16 px-2 py-1 rounded border border-gray-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Community Posts</span>
                    <input 
                      type="number" 
                      min="0" 
                      value={formData.contentRequirements?.youtube?.community || 0}
                      onChange={(e) => handleContentRequirementChange('youtube', 'community', parseInt(e.target.value))}
                      className="w-16 px-2 py-1 rounded border border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Guidelines</label>
              <textarea 
                rows={3} 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Specific requirements, hashtags, mentions, talking points..."
              />
            </div>
          </div>
        </div>

        {/* Advanced Targeting */}
        <div className="bg-indigo-50 p-6 rounded-xl">
          <h4 className="font-semibold text-gray-800 mb-4">Advanced Targeting</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Influencer Tiers</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Nano (1K-10K)
                  <span className="ml-auto text-sm text-gray-500">High engagement</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked /> Micro (10K-100K)
                  <span className="ml-auto text-sm text-gray-500">Best ROI</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Mid-tier (100K-500K)
                  <span className="ml-auto text-sm text-gray-500">Broader reach</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Geographic Targeting</label>
              <select 
                multiple 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                size={4}
              >
                <option>India</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
            </div>
          </div>
        </div>

        {/* Budget & Timeline */}
        <div className="bg-green-50 p-6 rounded-xl">
          <h4 className="font-semibold text-gray-800 mb-4">Budget & Timeline</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Campaign Budget</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input 
                  type="number" 
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                  placeholder="5000"
                  value={formData.budget?.replace('$', '') || ''}
                  onChange={(e) => handleInputChange('budget', `$${e.target.value}`)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Influencers</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                placeholder="10"
                value={formData.influencerCount || ''}
                onChange={(e) => handleInputChange('influencerCount', parseInt(e.target.value))}
                required
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline</label>
              <input 
                type="date" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.deadline || ''}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Duration</label>
              <select 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.duration || ''}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                required
              >
                <option value="">Select duration...</option>
                <option value="2 weeks">2 weeks</option>
                <option value="1 month">1 month</option>
                <option value="2 months">2 months</option>
                <option value="3 months">3 months</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
          </div>
        </div>

        {/* Placeholder Features */}
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg border-2 border-dashed border-gray-300">
            <div className="flex items-center text-gray-500">
              <Shield className="w-5 h-5 mr-2" />
              <span className="font-medium">Risk Mitigation & Approval Workflows</span>
              <span className="ml-auto bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">Coming Soon</span>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg border-2 border-dashed border-gray-300">
            <div className="flex items-center text-gray-500">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span className="font-medium">Advanced Campaign Analytics & Predictions</span>
              <span className="ml-auto bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <button 
            type="button" 
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            onClick={handleSaveDraft}
            disabled={isSubmitting}
          >
            Save as Draft
          </button>
          <button 
            type="button" 
            className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors"
            onClick={handlePreview}
            disabled={isSubmitting}
          >
            Preview Campaign
          </button>
          <button 
            type="submit" 
            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Launch Campaign'}
          </button>
        </div>
      </form>
    </div>
  );
};