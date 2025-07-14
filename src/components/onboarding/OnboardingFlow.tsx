import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../ui/Card';
import { TouchFriendlyButton } from '../mobile/TouchFriendlyButton';
import { MobileInput } from '../mobile/MobileForm';
import { Badge } from '../ui/Badge';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { CATEGORIES, DEMOGRAPHICS, INDUSTRIES } from '../../constants';
import { ROUTES } from '../../constants';

interface OnboardingStep {
  title: string;
  description: string;
  component: React.ReactNode;
}

export const OnboardingFlow: React.FC = () => {
  const { user, profile, updateProfile, completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const isInfluencer = user?.userType === 'influencer';

  // Influencer onboarding data
  const [influencerData, setInfluencerData] = useState({
    bio: '',
    categories: [] as string[],
    socialLinks: {
      instagram: '',
      tiktok: '',
      youtube: '',
      twitter: ''
    },
    demographics: {
      age: '',
      location: '',
      gender: ''
    },
    rates: {
      postRate: '',
      storyRate: '',
      reelRate: ''
    }
  });

  // Brand onboarding data
  const [brandData, setBrandData] = useState({
    companyName: '',
    industry: '',
    description: '',
    website: '',
    budget: {
      min: '',
      max: ''
    },
    targetAudience: [] as string[],
    companySize: '',
    location: ''
  });

  const handleCategoryToggle = (category: string) => {
    if (isInfluencer) {
      setInfluencerData(prev => ({
        ...prev,
        categories: prev.categories.includes(category)
          ? prev.categories.filter(c => c !== category)
          : [...prev.categories, category]
      }));
    } else {
      setBrandData(prev => ({
        ...prev,
        targetAudience: prev.targetAudience.includes(category)
          ? prev.targetAudience.filter(c => c !== category)
          : [...prev.targetAudience, category]
      }));
    }
  };

  const influencerSteps: OnboardingStep[] = [
    {
      title: 'Tell us about yourself',
      description: 'Help brands understand who you are',
      component: (
        <div className="space-y-4">
          <MobileInput
            label="Bio"
            placeholder="Tell us about your content and style..."
            value={influencerData.bio}
            onChange={(e) => setInfluencerData(prev => ({ ...prev, bio: e.target.value }))}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MobileInput
              label="Age"
              type="number"
              placeholder="25"
              value={influencerData.demographics.age}
              onChange={(e) => setInfluencerData(prev => ({
                ...prev,
                demographics: { ...prev.demographics, age: e.target.value }
              }))}
            />
            <MobileInput
              label="Location"
              placeholder="New York, NY"
              value={influencerData.demographics.location}
              onChange={(e) => setInfluencerData(prev => ({
                ...prev,
                demographics: { ...prev.demographics, location: e.target.value }
              }))}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Content Categories',
      description: 'What type of content do you create?',
      component: (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Select all that apply:</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-3 py-2 rounded-full text-sm transition-all ${
                  influencerData.categories.includes(category)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Social Media Links',
      description: 'Connect your social media accounts',
      component: (
        <div className="space-y-4">
          <MobileInput
            label="Instagram"
            placeholder="@username"
            value={influencerData.socialLinks.instagram}
            onChange={(e) => setInfluencerData(prev => ({
              ...prev,
              socialLinks: { ...prev.socialLinks, instagram: e.target.value }
            }))}
          />
          <MobileInput
            label="TikTok"
            placeholder="@username"
            value={influencerData.socialLinks.tiktok}
            onChange={(e) => setInfluencerData(prev => ({
              ...prev,
              socialLinks: { ...prev.socialLinks, tiktok: e.target.value }
            }))}
          />
          <MobileInput
            label="YouTube"
            placeholder="Channel name"
            value={influencerData.socialLinks.youtube}
            onChange={(e) => setInfluencerData(prev => ({
              ...prev,
              socialLinks: { ...prev.socialLinks, youtube: e.target.value }
            }))}
          />
        </div>
      )
    },
    {
      title: 'Set Your Rates',
      description: 'What do you charge for different content types?',
      component: (
        <div className="space-y-4">
          <MobileInput
            label="Instagram Post Rate"
            type="number"
            placeholder="500"
            value={influencerData.rates.postRate}
            onChange={(e) => setInfluencerData(prev => ({
              ...prev,
              rates: { ...prev.rates, postRate: e.target.value }
            }))}
          />
          <MobileInput
            label="Instagram Story Rate"
            type="number"
            placeholder="200"
            value={influencerData.rates.storyRate}
            onChange={(e) => setInfluencerData(prev => ({
              ...prev,
              rates: { ...prev.rates, storyRate: e.target.value }
            }))}
          />
          <MobileInput
            label="Instagram Reel Rate"
            type="number"
            placeholder="750"
            value={influencerData.rates.reelRate}
            onChange={(e) => setInfluencerData(prev => ({
              ...prev,
              rates: { ...prev.rates, reelRate: e.target.value }
            }))}
          />
        </div>
      )
    }
  ];

  const brandSteps: OnboardingStep[] = [
    {
      title: 'Company Information',
      description: 'Tell us about your brand',
      component: (
        <div className="space-y-4">
          <MobileInput
            label="Company Name"
            placeholder="Your Company Inc."
            value={brandData.companyName}
            onChange={(e) => setBrandData(prev => ({ ...prev, companyName: e.target.value }))}
          />
          <MobileInput
            label="Industry"
            placeholder="Fashion & Apparel"
            value={brandData.industry}
            onChange={(e) => setBrandData(prev => ({ ...prev, industry: e.target.value }))}
          />
          <MobileInput
            label="Website"
            placeholder="https://yourcompany.com"
            value={brandData.website}
            onChange={(e) => setBrandData(prev => ({ ...prev, website: e.target.value }))}
          />
          <MobileInput
            label="Company Description"
            placeholder="Describe your brand and mission..."
            value={brandData.description}
            onChange={(e) => setBrandData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>
      )
    },
    {
      title: 'Target Audience',
      description: 'What categories are you interested in?',
      component: (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Select all that apply:</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-3 py-2 rounded-full text-sm transition-all ${
                  brandData.targetAudience.includes(category)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Budget Range',
      description: 'What\'s your typical campaign budget?',
      component: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <MobileInput
              label="Minimum Budget"
              type="number"
              placeholder="1000"
              value={brandData.budget.min}
              onChange={(e) => setBrandData(prev => ({
                ...prev,
                budget: { ...prev.budget, min: e.target.value }
              }))}
            />
            <MobileInput
              label="Maximum Budget"
              type="number"
              placeholder="10000"
              value={brandData.budget.max}
              onChange={(e) => setBrandData(prev => ({
                ...prev,
                budget: { ...prev.budget, max: e.target.value }
              }))}
            />
          </div>
          <MobileInput
            label="Company Size"
            placeholder="1-10 employees"
            value={brandData.companySize}
            onChange={(e) => setBrandData(prev => ({ ...prev, companySize: e.target.value }))}
          />
          <MobileInput
            label="Location"
            placeholder="New York, NY"
            value={brandData.location}
            onChange={(e) => setBrandData(prev => ({ ...prev, location: e.target.value }))}
          />
        </div>
      )
    }
  ];

  const steps = isInfluencer ? influencerSteps : brandSteps;
  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const profileData = isInfluencer ? {
        bio: influencerData.bio,
        categories: influencerData.categories,
        socialLinks: influencerData.socialLinks,
        demographics: {
          age: influencerData.demographics.age ? parseInt(influencerData.demographics.age) : undefined,
          location: influencerData.demographics.location,
          gender: influencerData.demographics.gender
        },
        rates: {
          postRate: influencerData.rates.postRate ? parseInt(influencerData.rates.postRate) : undefined,
          storyRate: influencerData.rates.storyRate ? parseInt(influencerData.rates.storyRate) : undefined,
          reelRate: influencerData.rates.reelRate ? parseInt(influencerData.rates.reelRate) : undefined
        }
      } : {
        companyName: brandData.companyName,
        industry: brandData.industry,
        description: brandData.description,
        website: brandData.website,
        budget: {
          min: brandData.budget.min ? parseInt(brandData.budget.min) : 0,
          max: brandData.budget.max ? parseInt(brandData.budget.max) : 0
        },
        targetAudience: brandData.targetAudience,
        companySize: brandData.companySize,
        location: brandData.location
      };

      await updateProfile(profileData);
      await completeOnboarding();
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {currentStepData.title}
          </h1>
          <p className="text-gray-600">{currentStepData.description}</p>
        </div>

        <div className="mb-8">
          {currentStepData.component}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <TouchFriendlyButton
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={currentStep === 0 ? 'invisible' : ''}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </TouchFriendlyButton>

          {currentStep === steps.length - 1 ? (
            <TouchFriendlyButton
              onClick={handleComplete}
              loading={loading}
              disabled={loading}
            >
              <Check className="w-4 h-4 mr-2" />
              Complete Setup
            </TouchFriendlyButton>
          ) : (
            <TouchFriendlyButton onClick={handleNext}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </TouchFriendlyButton>
          )}
        </div>
      </Card>
    </div>
  );
};