// pages/Collaborations.tsx - Updated with modular components
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  InfluencerCollaborations,
  BrandCollaborations
} from '../components/collaborations';

const Collaborations: React.FC = () => {
  const { profile } = useAuth();
  const isInfluencer = profile?.userType === 'influencer';
  const [activeTab, setActiveTab] = useState('active');

  // Mock data for influencers
  const mockInfluencerCollaborations = [
    {
      id: 1,
      brand: 'TechFlow',
      campaign: 'Smartphone Review Series',
      status: 'in_progress',
      budget: '$1,200',
      deadline: '2024-08-20',
      progress: 60,
      deliverables: [
        { type: 'Unboxing Video', status: 'completed', dueDate: '2024-07-15' },
        { type: 'Review Post', status: 'in_progress', dueDate: '2024-08-10' },
        { type: 'Stories Series', status: 'pending', dueDate: '2024-08-20' }
      ],
      brandLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
      lastMessage: '2 hours ago',
      rating: 4.8
    },
    {
      id: 2,
      brand: 'FashionForward',
      campaign: 'Summer Collection 2024',
      status: 'completed',
      budget: '$800',
      deadline: '2024-07-31',
      progress: 100,
      deliverables: [
        { type: 'Outfit Posts', status: 'completed', dueDate: '2024-07-20' },
        { type: 'Styling Reel', status: 'completed', dueDate: '2024-07-25' },
        { type: 'Try-on Stories', status: 'completed', dueDate: '2024-07-31' }
      ],
      brandLogo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
      lastMessage: '1 week ago',
      rating: 5.0,
      earnings: '$720'
    },
    {
      id: 3,
      brand: 'HealthFirst',
      campaign: 'Fitness Journey Documentation',
      status: 'pending_approval',
      budget: '$500',
      deadline: '2024-08-05',
      progress: 90,
      deliverables: [
        { type: 'Daily Workout Posts', status: 'completed', dueDate: '2024-07-30' },
        { type: 'Progress Video', status: 'submitted', dueDate: '2024-08-05' },
        { type: 'Final Review', status: 'submitted', dueDate: '2024-08-05' }
      ],
      brandLogo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop',
      lastMessage: '1 day ago',
      rating: 4.9
    }
  ];

  // Mock data for brands
  const mockBrandCollaborations = [
    {
      id: 1,
      influencer: '@tech_sarah',
      influencerName: 'Sarah Chen',
      campaign: 'Smartphone Review Series',
      status: 'in_progress',
      budget: '$1,200',
      deadline: '2024-08-20',
      progress: 75,
      followers: '45K',
      engagement: '4.2%',
      deliverables: [
        { type: 'Unboxing Video', status: 'completed', submittedAt: '2024-07-15', approved: true },
        { type: 'Review Post', status: 'submitted', submittedAt: '2024-08-08', approved: false },
        { type: 'Stories Series', status: 'pending', dueDate: '2024-08-20' }
      ],
      influencerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
      lastActivity: '2 hours ago',
      rating: 4.8,
      previousCollabs: 3
    },
    {
      id: 2,
      influencer: '@fashion_maya',
      influencerName: 'Maya Patel',
      campaign: 'Summer Collection Launch',
      status: 'review_pending',
      budget: '$800',
      deadline: '2024-07-31',
      progress: 100,
      followers: '28K',
      engagement: '5.1%',
      deliverables: [
        { type: 'Outfit Posts', status: 'submitted', submittedAt: '2024-07-29', approved: false },
        { type: 'Styling Reel', status: 'submitted', submittedAt: '2024-07-30', approved: false },
        { type: 'Try-on Stories', status: 'submitted', submittedAt: '2024-07-31', approved: false }
      ],
      influencerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      lastActivity: '1 day ago',
      rating: 4.9,
      previousCollabs: 0
    },
    {
      id: 3,
      influencer: '@fitness_alex',
      influencerName: 'Alex Rodriguez',
      campaign: 'Protein Supplement Campaign',
      status: 'completed',
      budget: '$600',
      deadline: '2024-07-15',
      progress: 100,
      followers: '35K',
      engagement: '3.8%',
      deliverables: [
        { type: 'Workout Videos', status: 'completed', submittedAt: '2024-07-10', approved: true },
        { type: 'Progress Posts', status: 'completed', submittedAt: '2024-07-14', approved: true },
        { type: 'Final Review', status: 'completed', submittedAt: '2024-07-15', approved: true }
      ],
      influencerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      lastActivity: '2 weeks ago',
      rating: 5.0,
      previousCollabs: 2,
      totalViews: '125K',
      totalEngagement: '4.8K'
    }
  ];

  const influencerTabs = [
    { id: 'active', label: 'Active', count: 1 },
    { id: 'pending', label: 'Pending Review', count: 1 },
    { id: 'completed', label: 'Completed', count: 1 }
  ];

  const brandTabs = [
    { id: 'active', label: 'Active', count: 1 },
    { id: 'review', label: 'Pending Review', count: 1 },
    { id: 'completed', label: 'Completed', count: 1 }
  ];

  const influencerStats = {
    active: 3,
    totalEarned: '$3,240',
    avgRating: 4.9
  };

  const brandStats = {
    activeCollaborations: 8,
    pendingReviews: 5,
    totalReach: '1.2M',
    avgEngagement: '4.3%'
  };

  const handleInfluencerAction = (collaborationId: number, action: string) => {
    console.log(`Influencer action: ${action} on collaboration ${collaborationId}`);
    switch (action) {
      case 'message':
        // Handle message brand logic
        break;
      case 'submit':
        // Handle submit work logic
        break;
      case 'download':
        // Handle download invoice logic
        break;
    }
  };

  const handleBrandAction = (collaborationId: number, action: string) => {
    console.log(`Brand action: ${action} on collaboration ${collaborationId}`);
    switch (action) {
      case 'message':
        // Handle message influencer logic
        break;
      case 'contract':
        // Handle view contract logic
        break;
      case 'view':
        // Handle view campaign logic
        break;
    }
  };

  const handleDeliverableAction = (deliverable: any, action: string) => {
    console.log(`Deliverable action: ${action} on deliverable ${deliverable.type}`);
    switch (action) {
      case 'approve':
        // Handle approve deliverable logic
        break;
      case 'request_changes':
        // Handle request changes logic
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isInfluencer ? (
        <InfluencerCollaborations
          collaborations={mockInfluencerCollaborations}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={influencerTabs}
          stats={influencerStats}
          onCollaborationAction={handleInfluencerAction}
        />
      ) : (
        <BrandCollaborations
          collaborations={mockBrandCollaborations}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={brandTabs}
          stats={brandStats}
          onCollaborationAction={handleBrandAction}
          onDeliverableAction={handleDeliverableAction}
        />
      )}
    </div>
  );
};

export default Collaborations;