// components/messages/ConversationList.tsx
import React from 'react';
import { MessagesHeader } from './MessagesHeader';
import { ConversationItem } from './ConversationItem';

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

interface ConversationListProps {
  conversations: Conversation[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSelectChat: (id: number) => void;
  selectedChat?: number | null;
  isInfluencer: boolean;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  searchTerm,
  setSearchTerm,
  onSelectChat,
  selectedChat,
  isInfluencer
}) => {
  return (
    <div className="bg-white h-full flex flex-col">
      <MessagesHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isSelected={selectedChat === conversation.id}
            onClick={onSelectChat}
          />
        ))}
      </div>

      {/* Quick Actions Footer */}
      <div className="hidden md:block p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-center text-sm text-gray-500">
          {isInfluencer 
            ? 'Stay connected with your brand partners' 
            : 'Manage your influencer communications'
          }
        </div>
      </div>
    </div>
  );
};