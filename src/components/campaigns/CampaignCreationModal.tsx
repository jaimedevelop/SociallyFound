// components/campaigns/CampaignCreationModal.tsx
import React, { useState, useEffect } from 'react';
import { 
  X, 
  Zap, 
  Settings, 
  Check, 
  ArrowLeft,
  DollarSign,
  Clock,
  MapPin,
  Users,
  Instagram,
  Video,
  Play,
  Youtube,
  BarChart,
  Brain,
  Shield,
  TrendingUp,
  Filter
} from 'lucide-react';

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
  // Additional fields for campaign creation
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

interface CampaignCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCampaignCreated: (campaign: Campaign) => void;
}

type ModalView = 'selection' | 'quick' | 'advanced';

export const CampaignCreationModal: React.FC<CampaignCreationModalProps> = ({
  isOpen,
  onClose,
  onCampaignCreated
}) => {
  const [modalView, setModalView] = useState<ModalView>('selection');
  const [formData, setFormData] = useState<Partial<Campaign>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Body scroll lock effect
  useEffect(() => {
    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = '0';
      document.body.style.left = '0';
      document.body.style.right = '0';
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
    }

    // Cleanup on unmount
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

  // Prevent modal content from closing when clicked
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleModalTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  const handleFormSubmit = async (e: React.FormEvent, type: 'quick' | 'advanced') => {
    e.preventDefault();
    setIsSubmitting(true);

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
      setModalView('selection');
      setFormData({});
    } catch (error) {
      console.error('Error creating campaign:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContentRequirementChange = (platform: 'instagram' | 'youtube', type: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      contentRequirements: {
        ...prev.contentRequirements,
        [platform]: {
          ...prev.contentRequirements?.[platform],
          [type]: value
        }
      }
    }));
  };

  const resetModal = () => {
    setModalView('selection');
    setFormData({});
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
          <p className="mt-2 text-indigo-100">Choose your campaign type to get started</p>
        </div>

        {/* Type Selection View */}
        {modalView === 'selection' && (
          <div className="p-8 max-h-[70vh] overflow-y-auto" style={{ touchAction: 'pan-y' }}>
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Quick Campaign */}
              <div className="group cursor-pointer" onClick={() => setModalView('quick')}>
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-white bg-opacity-20 p-3 rounded-full">
                      <Zap className="w-8 h-8" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">Quick Campaign</h3>
                      <p className="text-pink-100">Perfect for small brands</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      <span>1-5 influencers</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      <span>Simple deliverables</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      <span>Fast setup (2 minutes)</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      <span>Budget: $50-$2,000</span>
                    </div>
                  </div>
                  <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-3">
                    <p className="text-xs font-medium">Most Popular Choice</p>
                  </div>
                </div>
              </div>

              {/* Advanced Campaign */}
              <div className="group cursor-pointer" onClick={() => setModalView('advanced')}>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-white bg-opacity-20 p-3 rounded-full">
                      <Settings className="w-8 h-8" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">Advanced Campaign</h3>
                      <p className="text-blue-100">For established brands</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      <span>5+ influencers</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      <span>Complex deliverables</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      <span>Advanced targeting</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      <span>Budget: $2,000+</span>
                    </div>
                  </div>
                  <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-3">
                    <p className="text-xs font-medium">Full Control & Analytics</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Start Templates */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-800 mb-4">Quick Start Templates</h4>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors border border-gray-200">
                  <Instagram className="w-4 h-4 inline mr-2" />
                  Instagram Post
                </button>
                <button className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors border border-gray-200">
                  <Video className="w-4 h-4 inline mr-2" />
                  Story Campaign
                </button>
                <button className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors border border-gray-200">
                  <Play className="w-4 h-4 inline mr-2" />
                  Reel Challenge
                </button>
                <button className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors border border-gray-200">
                  <Youtube className="w-4 h-4 inline mr-2" />
                  YouTube Review
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Campaign Form */}
        {modalView === 'quick' && (
          <div className="p-8 max-h-[70vh] overflow-y-auto" style={{ touchAction: 'pan-y' }}>
            <div className="flex items-center mb-6">
              <button 
                onClick={resetModal}
                className="text-gray-500 hover:text-gray-700 mr-4"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold text-gray-800">Quick Campaign Setup</h3>
              <div className="ml-auto bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
                Fast Track
              </div>
            </div>

            <form onSubmit={(e) => handleFormSubmit(e, 'quick')} className="space-y-6">
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
                  onClick={() => handleFormSubmit(new Event('submit') as any, 'quick')}
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
        )}

        {/* Advanced Campaign Form */}
        {modalView === 'advanced' && (
          <div className="p-8 max-h-[70vh] overflow-y-auto" style={{ touchAction: 'pan-y' }}>
            <div className="flex items-center mb-6">
              <button 
                onClick={resetModal}
                className="text-gray-500 hover:text-gray-700 mr-4"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold text-gray-800">Advanced Campaign Setup</h3>
              <div className="ml-auto bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                Professional
              </div>
            </div>

            <form onSubmit={(e) => handleFormSubmit(e, 'advanced')} className="space-y-8">
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
                        onChange={(e) => handleInputChange('budget', `${e.target.value}`)}
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
                  disabled={isSubmitting}
                >
                  Save as Draft
                </button>
                <button 
                  type="button" 
                  className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors"
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
        )}
      </div>
    </div>
  );
};