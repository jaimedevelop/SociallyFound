// components/campaigns/creationModal/CampaignTypeCard.tsx
import React from 'react';
import { Zap, Settings, Check } from 'lucide-react';

interface CampaignTypeCardProps {
  type: 'quick' | 'advanced';
  title: string;
  subtitle: string;
  features: string[];
  badge: string;
  onClick: () => void;
}

export const CampaignTypeCard: React.FC<CampaignTypeCardProps> = ({
  type,
  title,
  subtitle,
  features,
  badge,
  onClick
}) => {
  const isQuick = type === 'quick';
  
  const gradientClass = isQuick 
    ? "bg-gradient-to-r from-pink-500 to-rose-500"
    : "bg-gradient-to-r from-blue-500 to-cyan-500";
    
  const iconBgClass = isQuick ? "text-pink-100" : "text-blue-100";
  
  const Icon = isQuick ? Zap : Settings;

  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className={`${gradientClass} rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg`}>
        <div className="flex items-center mb-4">
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <Icon className="w-8 h-8" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className={iconBgClass}>{subtitle}</p>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <Check className="w-4 h-4 mr-2" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-3">
          <p className="text-xs font-medium">{badge}</p>
        </div>
      </div>
    </div>
  );
};