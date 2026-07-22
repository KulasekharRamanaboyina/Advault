import React from 'react';
import { Share2 } from 'lucide-react';
import { Campaign } from '../../types';
import { BrandLogo } from './BrandLogo';

interface CampaignCardProps {
  campaign: Campaign;
  onSave: (id: string, e: React.MouseEvent) => void;
  onShare: (id: string, e: React.MouseEvent) => void;
  isSaved: boolean;
  highlighted?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  index?: number;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onShare,
  highlighted = false,
  onMouseEnter,
  onMouseLeave,
  index,
}) => {
  const isDark = index !== undefined && (index % 18 === 0 || index % 18 === 7 || index % 18 === 14);

  return (
    <article 
      className={`card fade-in is-visible ${highlighted ? 'card--highlighted' : ''} ${isDark ? 'card--dark' : ''}`}
      id={`campaign-card-${campaign.id}`}
      onClick={() => { window.location.hash = `#campaign/${campaign.id}`; }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="card__header">
        <div className="card__tag">{campaign.tag}</div>
      </div>
      
      <div className="card__body">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
          <span 
            className="brand-card__mark" 
            style={{ 
              width: '20px', 
              height: '20px', 
              backgroundColor: '#ffffff', 
              borderRadius: '4px', 
              border: '1px solid var(--border-subtle)', 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '1px', 
              flexShrink: 0 
            }}
          >
            <BrandLogo brandId={campaign.brand} customStyle={{ maxWidth: '90%', maxHeight: '90%' }} />
          </span>
          <span className="card__brand" style={{ margin: 0 }}>{campaign.brand}</span>
        </div>
        <h3 className="card__title">{campaign.title}</h3>
      </div>
      
      <div className="card__footer">
        <button 
          className="card__share-btn" 
          onClick={(e) => {
            e.stopPropagation();
            onShare(campaign.id, e);
          }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
        >
          <Share2 size={12} />
          <span>Share Campaign</span>
        </button>
      </div>
    </article>
  );
};
