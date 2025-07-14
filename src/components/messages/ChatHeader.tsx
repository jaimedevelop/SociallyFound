// components/messages/ChatHeader.tsx
import React from 'react';
import { 
  ArrowLeft, 
  Phone, 
  Video, 
  MoreVertical 
} from 'lucide-react';

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  campaign: string;
}

interface ChatHeaderProps {
  conversation: Conversation;
  onBack?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  conversation, 
  onBack 
}) => {
  return (
    <div className="p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          
          <div className="relative flex-shrink-0">
            <img
              src={conversation.avatar}
              alt={conversation.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {conversation.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          
          <div className="min-w-0">
            <h3 className="font-medium text-gray-900 truncate text-sm md:text-base">
              {conversation.name}
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full truncate">
                {conversation.campaign}
              </span>
              {conversation.online && (
                <span className="text-xs text-green-600 hidden md:block">Online</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 md:space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Phone className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Video className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};