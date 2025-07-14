// components/collaborations/InfluencerCollaborations.tsx
import React from 'react';
import { CollaborationHeader } from './CollaborationHeader';
import { CollaborationTabs } from './CollaborationTabs';
import { CollaborationCard } from './CollaborationCard';

interface Collaboration {
  id: number;
  brand: string;
  campaign: string;
  status: string;
  budget: string;
  deadline: string;
  progress: number;
  deliverables: any[];
  brandLogo: string;
  lastMessage: string;
  rating: number;
  earnings?: string;
}

interface InfluencerCollaborationsProps {
  collaborations: Collaboration[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: { id: string; label: string; count: number }[];
  stats: {
    active: number;
    totalEarned: string;
    avgRating: number;
  };
  onCollaborationAction: (collaborationId: number, action: string) => void;
}

export const InfluencerCollaborations: React.FC<InfluencerCollaborationsProps> = ({
  collaborations,
  activeTab,
  onTabChange,
  tabs,
  stats,
  onCollaborationAction
}) => {
  const filteredCollaborations = collaborations.filter(collab => {
    if (activeTab === 'active') return collab.status === 'in_progress';
    if (activeTab === 'pending') return collab.status === 'pending_approval';
    return collab.status === 'completed';
  });

  return (
    <div className="pb-20 md:pb-6">
      <CollaborationHeader 
        isInfluencer={true}
        stats={stats}
      />

      {/* Tabs */}
      <div className="p-4">
        <CollaborationTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
          isInfluencer={true}
        />
      </div>

      {/* Collaboration Cards */}
      <div className="space-y-4 p-4">
        {filteredCollaborations.map((collaboration) => (
          <CollaborationCard
            key={collaboration.id}
            collaboration={collaboration}
            isInfluencer={true}
            onAction={onCollaborationAction}
          />
        ))}
      </div>
    </div>
  );
};