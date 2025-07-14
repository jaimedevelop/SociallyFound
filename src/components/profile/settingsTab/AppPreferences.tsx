// components/profile/settingsTab/AppPreferences.tsx
import React from 'react';

export const AppPreferences: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">App Preferences</h3>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <div>
            <p className="font-medium">Language</p>
            <p className="text-sm text-gray-600">Choose your preferred language</p>
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <div>
            <p className="font-medium">Time Zone</p>
            <p className="text-sm text-gray-600">Set your local time zone</p>
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto">
            <option>UTC-5 (EST)</option>
            <option>UTC-8 (PST)</option>
            <option>UTC+0 (GMT)</option>
          </select>
        </div>
      </div>
    </div>
  );
};