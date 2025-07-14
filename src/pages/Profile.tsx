// pages/Profile.tsx - Modularized version
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ProfileTab, AnalyticsTab, SettingsTab } from '../components/profile';
import { 
  User, 
  BarChart3, 
  Settings
} from 'lucide-react';

const Profile: React.FC = () => {
  const { profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const isInfluencer = profile?.userType === 'influencer';

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

const handleSignOut = async () => {
  try {
    await signOut();
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-1">Manage your profile and account settings</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 md:px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 md:p-6 w-full max-w-full overflow-x-hidden">
        {activeTab === 'profile' && <ProfileTab isInfluencer={isInfluencer} />}
        {activeTab === 'analytics' && <AnalyticsTab isInfluencer={isInfluencer} />}
        {activeTab === 'settings' && <SettingsTab onSignOut={handleSignOut} />}
      </div>
    </div>
  );
};

export default Profile;