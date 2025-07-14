// components/messages/ChatWindow.tsx
import React from 'react';
import { ChatHeader } from './ChatHeader';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  campaign: string;
  messages: Message[];
}

interface ChatWindowProps {
  conversation: Conversation;
  messageText: string;
  setMessageText: (text: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onBack?: () => void;
  isInfluencer: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  conversation,
  messageText,
  setMessageText,
  onSendMessage,
  onKeyPress,
  onBack,
  isInfluencer
}) => {
  return (
    <div className="bg-white h-full flex flex-col">
      <ChatHeader 
        conversation={conversation}
        onBack={onBack}
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-safe">
        {conversation.messages.map((message) => {
          const isOwn = isInfluencer ? message.sender === 'influencer' : message.sender === 'brand';
          
          return (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={isOwn}
            />
          );
        })}
      </div>

      <MessageInput
        messageText={messageText}
        setMessageText={setMessageText}
        onSendMessage={onSendMessage}
        onKeyPress={onKeyPress}
        isInfluencer={isInfluencer}
      />
    </div>
  );
};