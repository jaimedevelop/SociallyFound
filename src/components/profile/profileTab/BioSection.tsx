// components/profile/profileTab/BioSection.tsx
import React from 'react';

interface BioSectionProps {
  isInfluencer: boolean;
}

export const BioSection: React.FC<BioSectionProps> = ({ isInfluencer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {isInfluencer ? 'About Me' : 'Company Description'}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {isInfluencer 
          ? "Passionate content creator focused on tech reviews and lifestyle content. I love creating authentic content that resonates with my audience and helps brands tell their story in a genuine way."
          : "We're a forward-thinking technology company dedicated to creating innovative solutions that make a difference. We partner with content creators who share our vision for authentic storytelling."
        }
      </p>
    </div>
  );
};