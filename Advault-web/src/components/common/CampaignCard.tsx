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
  onSave,
  onShare,
  isSaved,
  highlighted = false,
  onMouseEnter,
  onMouseLeave,
  index,
}) => {
  // All cards are now white themed per user request
  const isDark = false;

  // Styling constants based on theme
  const cardBg = isDark ? '#111116' : '#FFFFFF';
  const cardBorder = isDark ? '1px solid #22222a' : '1px solid var(--border-subtle)';
  const textColor = isDark ? '#FFFFFF' : 'var(--text)';
  const textMutedColor = isDark ? '#a1a1aa' : 'var(--text-muted)';
  const buttonBg = isDark ? '#FFFFFF' : 'var(--text)';
  const buttonColor = isDark ? '#111116' : 'var(--bg)';
  const brandKickerColor = isDark ? '#60a5fa' : '#64748b';

  return (
    <article 
      className={`card fade-in is-visible ${highlighted ? 'card--highlighted' : ''}`}
      id={`campaign-card-${campaign.id}`}
      onClick={() => {
        window.history.pushState({}, '', `/campaign/${campaign.id}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        backgroundColor: cardBg,
        border: cardBorder,
        borderRadius: '16px',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        cursor: 'pointer',
        transition: 'all var(--ease)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 1. Header Logo Banner */}
      <div 
        style={{ 
          height: '160px', 
          width: '100%', 
          backgroundColor: '#FFFFFF', 
          position: 'relative', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          overflow: 'hidden',
          borderBottom: '1px solid var(--border-subtle)'
        }}
      >
        <BrandLogo 
          brandId={campaign.brand} 
          customStyle={{ 
            maxWidth: '65%', 
            maxHeight: '65%', 
            fontSize: '36px',
            borderRadius: 0,
            backgroundColor: 'transparent'
          }} 
        />
        
        {/* Floating Share Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onShare(campaign.id, e);
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(4px)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.borderColor = 'var(--text)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = 'var(--border-subtle)';
          }}
          aria-label="Share Campaign"
        >
          <Share2 size={15} />
        </button>
      </div>

      {/* 2. Content Container */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Kicker Row */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '8px', 
            fontSize: '11px', 
            fontWeight: 600, 
            letterSpacing: '0.08em', 
            textTransform: 'uppercase', 
            color: brandKickerColor 
          }}
        >
          <span>{campaign.brand} · {campaign.channel}</span>
          <span style={{ color: textMutedColor }}>Q3 {campaign.year}</span>
        </div>

        {/* Title */}
        <h3 
          className="card__title" 
          style={{ 
            fontSize: '18px', 
            fontWeight: 700, 
            color: textColor, 
            margin: '0 0 8px 0', 
            lineHeight: 1.3, 
            textAlign: 'left' 
          }}
        >
          {campaign.title}
        </h3>

        {/* Description Subtitle */}
        <p 
          style={{ 
            fontSize: '13.5px', 
            color: textMutedColor, 
            margin: '0 0 18px 0', 
            lineHeight: 1.5, 
            textAlign: 'left', 
            minHeight: '40px',
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden' 
          }}
        >
          {campaign.subtitle || campaign.desc}
        </p>

        {/* 3. Pill CTA Button */}
        <div 
          className="btn btn--primary" 
          style={{ 
            width: '100%', 
            borderRadius: '24px', 
            padding: '10px 20px', 
            fontSize: '13px', 
            fontWeight: 600, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '6px',
            backgroundColor: '#FFFFFF',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            boxShadow: 'none',
            marginTop: 'auto',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--text)';
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.borderColor = 'var(--text)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.color = 'var(--text)';
            e.currentTarget.style.borderColor = 'var(--border)';
          }}
        >
          <span>View Campaign</span>
          <span style={{ fontSize: '14px', transition: 'transform var(--ease)' }} className="btn__arrow">&rarr;</span>
        </div>
      </div>
    </article>
  );
};
