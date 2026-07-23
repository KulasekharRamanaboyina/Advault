import React from 'react';
import { useAdVaultData } from '../../context/AdVaultDataContext';
import { DiscoverHeader } from './DiscoverHeader';
import { DiscoverFilters } from './DiscoverFilters';
import { DiscoverCampaignGrid } from './DiscoverCampaignGrid';

interface DiscoverViewProps {
  filters: {
    industry: string;
    channel: string;
    search: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    industry: string;
    channel: string;
    search: string;
  }>>;
  onSaveCampaign: (id: string, e: React.MouseEvent) => void;
  onShareCampaign: (id: string, e: React.MouseEvent) => void;
  savedCampaigns: Set<string>;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  filters,
  setFilters,
  onSaveCampaign,
  onShareCampaign,
  savedCampaigns,
}) => {
  const { campaigns: CAMPAIGNS } = useAdVaultData();
  const campaigns = Object.values(CAMPAIGNS);
  
  const filteredCampaigns = campaigns.filter(c => {
    const matchIndustry = filters.industry === 'all' || c.industry === filters.industry;
    const matchChannel = filters.channel === 'all' || c.channel === filters.channel;
    const searchStr = `${c.title} ${c.brand} ${c.desc} ${c.subtitle}`.toLowerCase();
    const matchSearch = searchStr.includes(filters.search.toLowerCase());
    return matchIndustry && matchChannel && matchSearch;
  });

  return (
    <section className="view view--active" data-view="discover" id="view-discover">
      <div className="container">
        <DiscoverHeader />
        <DiscoverFilters filters={filters} setFilters={setFilters} />
        <DiscoverCampaignGrid 
          campaigns={filteredCampaigns}
          totalCount={campaigns.length}
          isSearchActive={!!filters.search}
          onSaveCampaign={onSaveCampaign}
          onShareCampaign={onShareCampaign}
          savedCampaigns={savedCampaigns}
        />
      </div>
    </section>
  );
};
