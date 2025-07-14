// components/profile/profileTab/ProfileHeader.tsx
import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { ProfilePicture } from '../shared/ProfilePicture';
import { 
  Camera,
  Edit3
} from 'lucide-react';

interface ProfileHeaderProps {
  onEditClick: () => void;
  isEditing: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  onEditClick, 
  isEditing 
}) => {
  const { user, profile } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        <div className="relative">
          <ProfilePicture size="xl" editable={isEditing} />
          {!isEditing && (
            <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {user?.displayName || 'User Name'}
              </h2>
              <p className="text-gray-600">{user?.email}</p>
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mt-2 capitalize">
                {profile?.userType}
              </span>
            </div>
            <button
              onClick={onEditClick}
              className="mt-4 md:mt-0 flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};