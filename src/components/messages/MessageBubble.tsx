// components/messages/MessageBubble.tsx
import React from 'react';
import { CheckCheck } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
  read: boolean;
}

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  isOwn 
}) => {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] md:max-w-xs lg:max-w-md px-3 md:px-4 py-2 rounded-lg ${
        isOwn 
          ? 'bg-indigo-600 text-white' 
          : 'bg-gray-100 text-gray-900'
      }`}>
        <p className="text-sm">{message.text}</p>
        <div className={`flex items-center justify-end mt-1 space-x-1 ${
          isOwn ? 'text-indigo-200' : 'text-gray-500'
        }`}>
          <span className="text-xs">
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          {isOwn && (
            <CheckCheck className={`w-3 h-3 ${
              message.read ? 'text-indigo-200' : 'text-indigo-300'
            }`} />
          )}
        </div>
      </div>
    </div>
  );
};