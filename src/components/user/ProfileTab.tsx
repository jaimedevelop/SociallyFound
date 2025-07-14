// components/user/ProfileTab.tsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ProfilePicture } from './ProfilePicture';
import { 
  Camera,
  Edit3,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Instagram,
  Youtube,
  Link as LinkIcon,
  TrendingUp,
  Users,
  Heart,
  DollarSign,
  Globe,
  Target,
  Award,
  Briefcase
} from 'lucide-react';

interface ProfileTabProps {
  isInfluencer: boolean;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ isInfluencer }) => {
  const { user, profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <ProfilePicture size="xl" />
            <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user?.displayName || 'User Name'}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mt-2 capitalize">
                  {profile?.userType}
                </span>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="mt-4 md:mt-0 flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards - Influencer */}
      {isInfluencer && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Users className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">45.2K</div>
            <div className="text-sm text-gray-600">Followers</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">12.8K</div>
            <div className="text-sm text-gray-600">Avg. Likes</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">3.2%</div>
            <div className="text-sm text-gray-600">Engagement</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">$1,250</div>
            <div className="text-sm text-gray-600">Earned</div>
          </div>
        </div>
      )}

      {/* Stats Cards - Brand */}
      {!isInfluencer && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Briefcase className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Campaigns</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">347</div>
            <div className="text-sm text-gray-600">Applications</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">23</div>
            <div className="text-sm text-gray-600">Hired</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">$12.5K</div>
            <div className="text-sm text-gray-600">Spent</div>
          </div>
        </div>
      )}

      {/* Profile Information */}
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

      {/* Bio Section */}
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
    </div>
  );
};