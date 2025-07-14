// components/messages/ConversationItem.tsx
import React from 'react';

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  campaign: string;
}

interface ConversationItemProps {
  conversation: Conversation;
  isSelected?: boolean;
  onClick: (id: number) => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({ 
  conversation, 
  isSelected, 
  onClick 
}) => {
  return (
    <div
      onClick={() => onClick(conversation.id)}
      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors active:bg-gray-100 ${
        isSelected ? 'bg-indigo-50 border-indigo-200' : ''
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="relative flex-shrink-0">
          <img
            src={conversation.avatar}
            alt={conversation.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          {conversation.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-gray-900 truncate text-sm md:text-base">
              {conversation.name}
            </h3>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <span className="text-xs text-gray-500">{conversation.timestamp}</span>
              {conversation.unread > 0 && (
                <span className="bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {conversation.unread}
                </span>
              )}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 truncate mb-1">{conversation.lastMessage}</p>
          
          <span className="text-xs text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
            {conversation.campaign}
          </span>
        </div>
      </div>
    </div>
  );
};