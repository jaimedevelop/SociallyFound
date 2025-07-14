// components/messages/EmptyChatState.tsx
import React from 'react';
import { Send } from 'lucide-react';

export const EmptyChatState: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Start a Conversation</h3>
        <p className="text-gray-500">Select a conversation to begin messaging</p>
      </div>
    </div>
  );
};