// components/layout/Sidebar.tsx - Hidden on mobile
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ProfilePicture } from '../user';
import { 
  LayoutDashboard, 
  Megaphone, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  User,
  Briefcase,
  Heart
} from 'lucide-react';
import { ROUTES } from '../../constants';

export const Sidebar: React.FC = () => {
  const { user, profile } = useAuth();
  const location = useLocation();
  const isInfluencer = profile?.userType === 'influencer';

  // Only show main navigation items in sidebar (secondary items moved to Profile page)
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: ROUTES.DASHBOARD },
    { icon: isInfluencer ? Megaphone : Briefcase, label: 'Campaigns', path: ROUTES.CAMPAIGNS },
    { icon: Users, label: 'Collaborations', path: ROUTES.COLLABORATIONS },
    { icon: MessageSquare, label: 'Messages', path: ROUTES.MESSAGES },
    { icon: User, label: 'Profile', path: ROUTES.PROFILE }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    // Hidden on mobile, visible on desktop
    <div className="hidden md:block w-64 bg-white shadow-lg h-screen sticky top-0 border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">SF</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">SociallyFound</h2>
            <p className="text-sm text-gray-500 capitalize">{profile?.userType} Dashboard</p>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-50 rounded-lg">
          <ProfilePicture size="md" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.displayName || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email}
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive(path)
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Heart className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-900">Pro Tip</span>
          </div>
          <p className="text-sm text-indigo-700">
            {isInfluencer
              ? 'Complete your profile to get more brand collaborations!'
              : 'Create detailed campaigns to attract the best influencers!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;