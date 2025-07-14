// components/mobile/MobileHeader.tsx - No hamburger menu, clean mobile header
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants';

interface MobileHeaderProps {
  title?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ 
  title = 'SociallyFound',
  showSearch = false,
  showNotifications = true
}) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Logo/Brand */}
        <Link to={ROUTES.DASHBOARD} className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SF</span>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </span>
        </Link>

        {/* Right side actions */}
        <div className="flex items-center space-x-1">
          {showSearch && (
            <button className="p-2 text-gray-600 hover:text-gray-900 min-h-[44px] min-w-[44px] flex items-center justify-center">
              <Search className="w-5 h-5" />
            </button>
          )}
          {showNotifications && (
            <button className="relative p-2 text-gray-600 hover:text-gray-900 min-h-[44px] min-w-[44px] flex items-center justify-center">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};