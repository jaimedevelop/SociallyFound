// components/profile/profileTab/ProfileInfo.tsx
import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { 
  Mail,
  Phone,
  MapPin,
  Calendar,
  Instagram,
  Youtube,
  Link as LinkIcon,
  Briefcase,
  Globe,
  Target
} from 'lucide-react';

interface ProfileInfoProps {
  isInfluencer: boolean;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ isInfluencer }) => {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-600">Email</div>
              <div className="font-medium">{user?.email}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-600">Phone</div>
              <div className="font-medium">+1 (555) 123-4567</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-600">Location</div>
              <div className="font-medium">New York, NY</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-600">Member Since</div>
              <div className="font-medium">January 2024</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {isInfluencer && (
            <>
              <div className="flex items-center space-x-3">
                <Instagram className="w-5 h-5 text-pink-500" />
                <div>
                  <div className="text-sm text-gray-600">Instagram</div>
                  <div className="font-medium">@username</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Youtube className="w-5 h-5 text-red-500" />
                <div>
                  <div className="text-sm text-gray-600">YouTube</div>
                  <div className="font-medium">Channel Name</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <LinkIcon className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Website</div>
                  <div className="font-medium">www.example.com</div>
                </div>
              </div>
            </>
          )}
          
          {!isInfluencer && (
            <>
              <div className="flex items-center space-x-3">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Company</div>
                  <div className="font-medium">Brand Name Inc.</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Website</div>
                  <div className="font-medium">www.company.com</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Industry</div>
                  <div className="font-medium">Technology</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};