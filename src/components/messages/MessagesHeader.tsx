// components/messages/MessagesHeader.tsx
import React from 'react';
import { Search } from 'lucide-react';

interface MessagesHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const MessagesHeader: React.FC<MessagesHeaderProps> = ({ 
  searchTerm, 
  onSearchChange 
}) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Messages</h1>
      
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};