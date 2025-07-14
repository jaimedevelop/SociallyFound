// pages/Messages.tsx - Updated with modular components
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ConversationList,
  ChatWindow,
  EmptyChatState
} from '../components/messages';

const Messages: React.FC = () => {
  const { profile } = useAuth();
  const isInfluencer = profile?.userType === 'influencer';
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageText, setMessageText] = useState('');

  const mockConversations = [
    {
      id: 1,
      name: isInfluencer ? 'TechFlow Marketing' : '@tech_sarah',
      avatar: isInfluencer 
        ? 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop'
        : 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
      lastMessage: 'The content looks great! When can you submit the final review?',
      timestamp: '2m ago',
      unread: 2,
      online: true,
      campaign: 'Smartphone Review Series',
      messages: [
        {
          id: 1,
          sender: isInfluencer ? 'brand' : 'influencer',
          text: 'Hi! Thanks for applying to our campaign. We\'d love to work with you!',
          timestamp: '2024-07-08 09:00',
          read: true
        },
        {
          id: 2,
          sender: isInfluencer ? 'influencer' : 'brand',
          text: 'Thank you! I\'m excited about this opportunity. When would you like to start?',
          timestamp: '2024-07-08 09:15',
          read: true
        },
        {
          id: 3,
          sender: isInfluencer ? 'brand' : 'influencer',
          text: 'Perfect! We can start immediately. I\'ll send over the product details and requirements.',
          timestamp: '2024-07-08 09:30',
          read: true
        },
        {
          id: 4,
          sender: isInfluencer ? 'brand' : 'influencer',
          text: 'The content looks great! When can you submit the final review?',
          timestamp: '2024-07-08 14:30',
          read: false
        }
      ]
    },
    {
      id: 2,
      name: isInfluencer ? 'FashionForward' : '@fashion_maya',
      avatar: isInfluencer 
        ? 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      lastMessage: 'Payment has been processed successfully!',
      timestamp: '1h ago',
      unread: 0,
      online: false,
      campaign: 'Summer Collection Launch',
      messages: [
        {
          id: 1,
          sender: isInfluencer ? 'brand' : 'influencer',
          text: 'Congratulations on completing the campaign! We\'re very happy with the results.',
          timestamp: '2024-07-08 13:00',
          read: true
        },
        {
          id: 2,
          sender: isInfluencer ? 'influencer' : 'brand',
          text: 'Thank you! It was a pleasure working with your team. Looking forward to future collaborations.',
          timestamp: '2024-07-08 13:15',
          read: true
        },
        {
          id: 3,
          sender: isInfluencer ? 'brand' : 'influencer',
          text: 'Payment has been processed successfully!',
          timestamp: '2024-07-08 14:00',
          read: true
        }
      ]
    },
    {
      id: 3,
      name: isInfluencer ? 'HealthFirst Support' : '@fitness_alex',
      avatar: isInfluencer 
        ? 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      lastMessage: 'Could you share the analytics for last week\'s posts?',
      timestamp: '3h ago',
      unread: 1,
      online: true,
      campaign: 'Fitness Journey Documentation',
      messages: [
        {
          id: 1,
          sender: isInfluencer ? 'brand' : 'influencer',
          text: 'Great progress on the campaign! The engagement is looking really good.',
          timestamp: '2024-07-08 11:00',
          read: true
        },
        {
          id: 2,
          sender: isInfluencer ? 'brand' : 'influencer',
          text: 'Could you share the analytics for last week\'s posts?',
          timestamp: '2024-07-08 11:30',
          read: false
        }
      ]
    },
    {
      id: 4,
      name: isInfluencer ? 'BeautyBrand Co.' : '@beauty_lisa',
      avatar: isInfluencer 
        ? 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'
        : 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=100&h=100&fit=crop',
      lastMessage: 'New campaign opportunity available!',
      timestamp: '1d ago',
      unread: 0,
      online: false,
      campaign: 'New Opportunity',
      messages: [
        {
          id: 1,
          sender: isInfluencer ? 'brand' : 'influencer',
          text: 'Hi! We have a new campaign that might interest you. Would you like to hear more details?',
          timestamp: '2024-07-07 15:00',
          read: true
        },
        {
          id: 2,
          sender: isInfluencer ? 'brand' : 'influencer',
          text: 'New campaign opportunity available!',
          timestamp: '2024-07-07 15:30',
          read: true
        }
      ]
    }
  ];

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.campaign.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConversation = mockConversations.find(conv => conv.id === selectedChat);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Mobile: Show conversation list OR chat window
  // Desktop: Show both side by side
  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden w-full max-w-full">
      {/* Mobile View - Conditional rendering */}
      <div className="md:hidden w-full max-w-full overflow-hidden">
        {!selectedChat ? (
          <ConversationList
            conversations={filteredConversations}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSelectChat={setSelectedChat}
            isInfluencer={isInfluencer}
          />
        ) : (
          <ChatWindow
            conversation={selectedConversation!}
            messageText={messageText}
            setMessageText={setMessageText}
            onSendMessage={handleSendMessage}
            onKeyPress={handleKeyPress}
            onBack={() => setSelectedChat(null)}
            isInfluencer={isInfluencer}
          />
        )}
      </div>

      {/* Desktop View - Side by side */}
      <div className="hidden md:flex w-full">
        <div className="w-1/3 border-r border-gray-200">
          <ConversationList
            conversations={filteredConversations}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSelectChat={setSelectedChat}
            selectedChat={selectedChat}
            isInfluencer={isInfluencer}
          />
        </div>
        <div className="flex-1">
          {selectedChat ? (
            <ChatWindow
              conversation={selectedConversation!}
              messageText={messageText}
              setMessageText={setMessageText}
              onSendMessage={handleSendMessage}
              onKeyPress={handleKeyPress}
              isInfluencer={isInfluencer}
            />
          ) : (
            <EmptyChatState />
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;