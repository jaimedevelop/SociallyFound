// components/collaborations/BrandCollaborations.tsx
import React from 'react';
import { CollaborationHeader } from './CollaborationHeader';
import { CollaborationStats } from './CollaborationStats';
import { CollaborationTabs } from './CollaborationTabs';
import { CollaborationCard } from './CollaborationCard';
import { PerformanceMetrics } from './PerformanceMetrics';

interface Collaboration {
  id: number;
  influencer: string;
  influencerName: string;
  campaign: string;
  status: string;
  budget: string;
  deadline: string;
  progress: number;
  followers: string;
  engagement: string;
  deliverables: any[];
  influencerAvatar: string;
  lastActivity: string;
  rating: number;
  previousCollabs: number;
  totalViews?: string;
  totalEngagement?: string;
}

interface BrandCollaborationsProps {
  collaborations: Collaboration[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: { id: string; label: string; count: number }[];
  stats: {
    activeCollaborations: number;
    pendingReviews: number;
    totalReach: string;
    avgEngagement: string;
  };
  onCollaborationAction: (collaborationId: number, action: string) => void;
  onDeliverableAction: (deliverable: any, action: string) => void;
}

export const BrandCollaborations: React.FC<BrandCollaborationsProps> = ({
  collaborations,
  activeTab,
  onTabChange,
  tabs,
  stats,
  onCollaborationAction,
  onDeliverableAction
}) => {
  const filteredCollaborations = collaborations.filter(collab => {
    if (activeTab === 'active') return collab.status === 'in_progress';
    if (activeTab === 'review') return collab.status === 'review_pending';
    return collab.status === 'completed';
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <CollaborationHeader isInfluencer={false} />

      {/* Stats Cards */}
      <CollaborationStats stats={stats} />

      {/* Tabs and Content */}
      <CollaborationTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
        isInfluencer={false}
      />

      <div className="p-6">
        <div className="space-y-6">
          {filteredCollaborations.map((collaboration) => (
            <div key={collaboration.id}>
              <CollaborationCard
                collaboration={collaboration}
                isInfluencer={false}
                onAction={onCollaborationAction}
                onDeliverableAction={onDeliverableAction}
              />

              {/* Performance Metrics for completed campaigns */}
              {collaboration.status === 'completed' && collaboration.totalViews && (
                <PerformanceMetrics
                  collaboration={collaboration}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};