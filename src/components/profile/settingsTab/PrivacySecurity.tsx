// components/profile/settingsTab/PrivacySecurity.tsx
import React from 'react';
import { 
  Shield,
  Eye,
  CreditCard
} from 'lucide-react';

export const PrivacySecurity: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Security</h3>
      <div className="space-y-3">
        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-gray-400" />
            <span>Change Password</span>
          </div>
          <span className="text-gray-400">›</span>
        </button>
        
        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-3">
            <Eye className="w-5 h-5 text-gray-400" />
            <span>Privacy Settings</span>
          </div>
          <span className="text-gray-400">›</span>
        </button>
        
        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-3">
            <CreditCard className="w-5 h-5 text-gray-400" />
            <span>Payment Methods</span>
          </div>
          <span className="text-gray-400">›</span>
        </button>
      </div>
    </div>
  );
};