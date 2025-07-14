// components/messages/MessageInput.tsx
import React from 'react';
import { 
  Send, 
  Paperclip, 
  Image as ImageIcon, 
  Smile 
} from 'lucide-react';

interface MessageInputProps {
  messageText: string;
  setMessageText: (text: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isInfluencer: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  messageText,
  setMessageText,
  onSendMessage,
  onKeyPress,
  isInfluencer
}) => {
  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <div className="flex items-end space-x-2 md:space-x-3">
        <div className="flex space-x-1 md:space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ImageIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="flex-1 relative">
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Type a message..."
            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none max-h-32 text-sm md:text-base"
            rows={1}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors">
            <Smile className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <button
          onClick={onSendMessage}
          disabled={!messageText.trim()}
          className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="mt-3 flex flex-wrap gap-1 md:gap-2">
        <button className="px-2 md:px-3 py-1 text-xs md:text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
          💼 Portfolio
        </button>
        <button className="px-2 md:px-3 py-1 text-xs md:text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
          📊 Analytics
        </button>
        <button className="px-2 md:px-3 py-1 text-xs md:text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
          📅 Schedule
        </button>
        {!isInfluencer && (
          <button className="px-2 md:px-3 py-1 text-xs md:text-sm bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition-colors">
            💰 Payment
          </button>
        )}
      </div>
    </div>
  );
};