// components/dashboard/QuickActions.tsx
import React from 'react';
import { Card } from '../ui/Card';
import { TouchFriendlyButton } from '../mobile/TouchFriendlyButton';
import { 
  MessageSquare, 
  Calendar, 
  TrendingUp 
} from 'lucide-react';

export const QuickActions: React.FC = () => {
  return (
    <Card>
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        <TouchFriendlyButton variant="outline" className="flex items-center justify-center p-4 md:p-6 h-auto">
          <MessageSquare className="w-5 h-5 mr-2" />
          <span>Send Message</span>
        </TouchFriendlyButton>
        <TouchFriendlyButton variant="outline" className="flex items-center justify-center p-4 md:p-6 h-auto">
          <Calendar className="w-5 h-5 mr-2" />
          <span>Schedule Content</span>
        </TouchFriendlyButton>
        <TouchFriendlyButton variant="outline" className="flex items-center justify-center p-4 md:p-6 h-auto">
          <TrendingUp className="w-5 h-5 mr-2" />
          <span>View Analytics</span>
        </TouchFriendlyButton>
      </div>
    </Card>
  );
};