// components/campaigns/creationModal/QuickStart.tsx
import React from 'react';
import { Instagram, Video, Play, Youtube } from 'lucide-react';

interface QuickStartProps {
  onTemplateSelect?: (templateType: string) => void;
}

export const QuickStart: React.FC<QuickStartProps> = ({
  onTemplateSelect
}) => {
  const templates = [
    {
      id: 'instagram-post',
      title: 'Instagram Post',
      icon: Instagram,
      description: 'Single feed post campaign'
    },
    {
      id: 'story-campaign',
      title: 'Story Campaign',
      icon: Video,
      description: 'Instagram stories promotion'
    },
    {
      id: 'reel-challenge',
      title: 'Reel Challenge',
      icon: Play,
      description: 'Viral reel content'
    },
    {
      id: 'youtube-review',
      title: 'YouTube Review',
      icon: Youtube,
      description: 'Product review video'
    }
  ];

  const handleTemplateClick = (templateId: string) => {
    if (onTemplateSelect) {
      onTemplateSelect(templateId);
    } else {
      // Placeholder functionality
      console.log(`Template selected: ${templateId}`);
    }
  };

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-xl">
      <h4 className="font-semibold text-gray-800 mb-4">Quick Start Templates</h4>
      <p className="text-sm text-gray-600 mb-4">
        Choose a template to get started quickly with pre-configured settings
      </p>
      
      <div className="flex flex-wrap gap-3">
        {templates.map((template) => {
          const IconComponent = template.icon;
          
          return (
            <button
              key={template.id}
              onClick={() => handleTemplateClick(template.id)}
              className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors border border-gray-200 flex items-center gap-2 group"
              title={template.description}
            >
              <IconComponent className="w-4 h-4 group-hover:text-indigo-600" />
              <span>{template.title}</span>
            </button>
          );
        })}
      </div>

      {/* Coming Soon Badge */}
      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs">
        <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
        Templates coming soon - Currently visual placeholder
      </div>
    </div>
  );
};