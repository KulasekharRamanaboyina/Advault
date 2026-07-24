import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAdbicepsData } from '../../context/AdbicepsDataContext';
import { BrandHeader } from './BrandHeader';
import { BrandTimeline } from './BrandTimeline';
import { BrandRelatedDossiers } from './BrandRelatedDossiers';

interface BrandDetailViewProps {
  brandId: string;
  onSaveCampaign: (id: string, e: React.MouseEvent) => void;
  onShareCampaign: (id: string, e: React.MouseEvent) => void;
  savedCampaigns: Set<string>;
}

export const BrandDetailView: React.FC<BrandDetailViewProps> = ({
  brandId,
  onSaveCampaign,
  onShareCampaign,
  savedCampaigns,
}) => {
  const { brands: BRANDS, campaigns: CAMPAIGNS } = useAdbicepsData();
  const brand = BRANDS[brandId];

  const [channelFilter, setChannelFilter] = useState('all');
  const [hoveredCampaignId, setHoveredCampaignId] = useState<string | null>(null);

  const timelineItemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (!brand) {
      window.location.hash = '#discover';
    }
  }, [brand]);

  if (!brand) {
    return null;
  }

  const relatedCampaigns = Object.values(CAMPAIGNS)
    .filter(c => c.brand.toLowerCase() === brand.name.toLowerCase())
    .filter(c => {
      if (channelFilter !== 'all' && c.channel?.toLowerCase().trim() !== channelFilter.toLowerCase().trim()) {
        return false;
      }
      return true;
    });

  const uniqueChannels = Array.from(new Set(brand.campaigns.map(c => c.channel)));

  const filteredTimeline = [...brand.campaigns]
    .filter(item => {
      if (channelFilter !== 'all' && item.channel.toLowerCase() !== channelFilter.toLowerCase()) return false;
      return true;
    })
    .sort((a, b) => {
      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;
      return yearB - yearA;
    });

  const handleCardMouseEnter = (id: string) => {
    setHoveredCampaignId(id);
  };

  const handleCardMouseLeave = () => {
    setHoveredCampaignId(null);
  };

  return (
    <section className="view view--active" data-view="brand" id="view-brand">
      <div className="container" id="brand-detail-container">
        
        {/* Back Link */}
        <div style={{ paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-4)' }}>
          <a href="/discover" className="btn btn--sm btn--ghost" style={{ paddingLeft: 0, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ArrowLeft size={14} />
            <span>Back to Discover</span>
          </a>
        </div>

        {/* Brand Header */}
        <BrandHeader brand={brand} />

        <div className="brand-layout-grid">
          <BrandTimeline 
            filteredTimeline={filteredTimeline}
            uniqueChannels={uniqueChannels}
            channelFilter={channelFilter}
            setChannelFilter={setChannelFilter}
            hoveredCampaignId={hoveredCampaignId}
            setHoveredCampaignId={setHoveredCampaignId}
            timelineItemRefs={timelineItemRefs}
          />
          <BrandRelatedDossiers 
            brand={brand}
          />
        </div>

      </div>
    </section>
  );
};
