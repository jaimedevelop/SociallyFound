// components/layout/MobileNavigation.tsx - Updated and optimized
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProfilePicture } from '../user';
import { 
  Home, 
  Briefcase, 
  Users, 
  MessageSquare, 
  User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants';

export const MobileNavigation: React.FC = () => {
  const { profile } = useAuth();
  const location = useLocation();
  
  const isInfluencer = profile?.userType === 'influencer';
  
  const navItems = [
    { 
      icon: Home, 
      label: 'Home', 
      path: ROUTES.DASHBOARD 
    },
    { 
      icon: Briefcase, 
      label: 'Campaigns', 
      path: ROUTES.CAMPAIGNS 
    },
    { 
      icon: Users, 
      label: 'Collabs', 
      path: ROUTES.COLLABORATIONS 
    },
    { 
      icon: MessageSquare, 
      label: 'Messages', 
      path: ROUTES.MESSAGES 
    },
    { 
      icon: () => <ProfilePicture size="sm" />, 
      label: 'Profile', 
      path: ROUTES.PROFILE,
      isProfilePic: true
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden safe-area-pb">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map(({ icon: Icon, label, path, isProfilePic }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center justify-center min-h-[48px] px-2 py-1 transition-colors flex-1 ${
              isActive(path)
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {isProfilePic ? (
              <div className={`mb-1 ${isActive(path) ? 'ring-2 ring-indigo-600 rounded-full' : ''}`}>
                <Icon />
              </div>
            ) : (
              <Icon className="w-5 h-5 mb-1" />
            )}
            <span className="text-xs font-medium leading-tight">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};