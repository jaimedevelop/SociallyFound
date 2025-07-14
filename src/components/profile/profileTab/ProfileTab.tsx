// components/profile/profileTab/ProfileTab.tsx
import React, { useState } from 'react';
import { ProfileHeader } from './ProfileHeader';
import { StatsGrid } from './StatsGrid';
import { ProfileInfo } from './ProfileInfo';
import { BioSection } from './BioSection';

interface ProfileTabProps {
  isInfluencer: boolean;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ isInfluencer }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="space-y-6">
      <ProfileHeader 
        onEditClick={handleEditClick}
        isEditing={isEditing}
      />
      
      <StatsGrid isInfluencer={isInfluencer} />
      
      <ProfileInfo isInfluencer={isInfluencer} />
      
      <BioSection isInfluencer={isInfluencer} />
    </div>
  );
};