import React from 'react';
import { Campaign } from '../../types';
import { CampaignCard } from '../common/CampaignCard';

interface DiscoverCampaignGridProps {
  campaigns: Campaign[];
  totalCount: number;
  isSearchActive: boolean;
  onSaveCampaign: (id: string, e: React.MouseEvent) => void;
  onShareCampaign: (id: string, e: React.MouseEvent) => void;
  savedCampaigns: Set<string>;
}

export const DiscoverCampaignGrid: React.FC<DiscoverCampaignGridProps> = ({
  campaigns,
  totalCount,
  isSearchActive,
  onSaveCampaign,
  onShareCampaign,
  savedCampaigns,
}) => {
  return (
    <div style={{ marginBottom: 'var(--space-10)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <div className="caption text-muted" id="discover-results-count">
          Showing {campaigns.length} of {totalCount} campaigns
        </div>
      </div>
      <div className={`grid grid--3 ${isSearchActive ? 'search-active' : ''}`} id="discover-campaigns-grid">
        {campaigns.map((campaign, index) => (
          <CampaignCard 
            key={campaign.id} 
            campaign={campaign} 
            onSave={onSaveCampaign}
            onShare={onShareCampaign}
            isSaved={savedCampaigns.has(campaign.id)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
