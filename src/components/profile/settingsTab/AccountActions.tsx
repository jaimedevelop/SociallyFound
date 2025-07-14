// components/profile/settingsTab/AccountActions.tsx
import React from 'react';
import { LogOut } from 'lucide-react';

interface AccountActionsProps {
  onSignOut: () => void;
}

export const AccountActions: React.FC<AccountActionsProps> = ({ onSignOut }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
      <h3 className="text-lg font-semibold text-red-900 mb-4">Account Actions</h3>
      <div className="space-y-3">
        <button
          onClick={onSignOut}
          className="w-full flex items-center justify-center space-x-2 p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
        
        <button className="w-full flex items-center justify-center space-x-2 p-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
          <span>Delete Account</span>
        </button>
      </div>
    </div>
  );
};