// components/layout/Header.tsx - Updated without hamburger menu/dropdown
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Bell, MessageCircle } from 'lucide-react';
import { ROUTES } from '../../constants';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={user ? ROUTES.DASHBOARD : ROUTES.HOME} className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SF</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                SociallyFound
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {!user && (
              <>
                <Link to="#features" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  Features
                </Link>
                <Link to="#how-it-works" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  How It Works
                </Link>
                <Link to="#pricing" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  Pricing
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </button>
                <Link to={ROUTES.MESSAGES} className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors">
                  <MessageCircle className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span>
                </Link>
                {/* Removed the dropdown menu completely - navigation is now handled by sidebar */}
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;