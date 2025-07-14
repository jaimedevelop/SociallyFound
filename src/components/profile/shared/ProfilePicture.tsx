// components/profile/shared/ProfilePicture.tsx
import React, { useState, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { storage } from '../../../firebase/index';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface ProfilePictureProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  editable?: boolean;
  onUpdate?: (url: string) => void;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
};

export const ProfilePicture: React.FC<ProfilePictureProps> = ({ 
  size = 'md', 
  editable = false,
  onUpdate 
}) => {
  const { user, profile, updateProfile } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Create unique filename
      const filename = `profile-pictures/${user.uid}/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, filename);

      // Upload file
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Update user profile
      await updateProfile({ photoURL: downloadURL });
      onUpdate?.(downloadURL);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleClick = () => {
    if (editable && !uploading) {
      fileInputRef.current?.click();
    }
  };

  const displayImage = profile?.photoURL || user?.photoURL;

  return (
    <div className="relative">
      <div 
        className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ${
          editable ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
        }`}
        onClick={handleClick}
      >
        {uploading ? (
          <div className="animate-spin rounded-full h-1/2 w-1/2 border-b-2 border-blue-600"></div>
        ) : displayImage ? (
          <img 
            src={displayImage} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <svg 
            className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : size === 'lg' ? 'w-8 h-8' : 'w-12 h-12'} text-gray-400`}
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      {editable && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {size !== 'sm' && (
            <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 cursor-pointer hover:bg-blue-700 transition-colors">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
          )}
        </>
      )}
      {error && (
        <div className="absolute top-full mt-2 bg-red-50 border border-red-200 rounded-md p-2 text-sm text-red-800 whitespace-nowrap z-10">
          {error}
        </div>
      )}
    </div>
  );
};