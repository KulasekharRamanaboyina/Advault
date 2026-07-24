import React from 'react';
import { Clock, Bookmark, BookmarkCheck, Share2, Download } from 'lucide-react';
import { Campaign } from '../../types';
import { BrandLogo } from '../common/BrandLogo';

interface CampaignHeaderProps {
  campaign: Campaign;
  readTime: number;
  onSaveCampaign: (id: string, e: React.MouseEvent) => void;
  onShareCampaign: (id: string, e: React.MouseEvent) => void;
  onDownloadCampaign: (id: string, e: React.MouseEvent) => void;
  savedCampaigns: Set<string>;
}

export const CampaignHeader: React.FC<CampaignHeaderProps> = ({
  campaign,
  readTime,
  onSaveCampaign,
  onShareCampaign,
  onDownloadCampaign,
  savedCampaigns,
}) => {
  return (
    <header className="article-header">
      <div className="article-header__container">
        <div className="article-header__logo-wrapper">
          <BrandLogo brandId={campaign.brand} customStyle={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
        <div className="article-header__info">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)', flexWrap: 'wrap' }}>
            <span className="article-header__kicker" style={{ marginBottom: 0 }}>Case Study Dossier</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', fontWeight: 500, color: 'var(--text-muted)', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)', padding: '2px 8px', borderRadius: '12px', lineHeight: 1 }}>
              <Clock size={12} style={{ flexShrink: 0 }} />
              {readTime} min read
            </span>
          </div>
          <h1 className="article-header__title" style={{ marginBottom: 0 }}>{campaign.title}</h1>
        </div>
      </div>
      <p className="article-header__subtitle" style={{ marginTop: 'var(--space-4)' }}>{campaign.subtitle}</p>
      
      <div className="article-header__meta">
        <div className="article-header__meta-item">
          <strong>Brand</strong>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: '4px' }}>
            <span className="brand-card__mark" style={{ width: '24px', height: '24px', backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid var(--border-subtle)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '2px' }}>
              <BrandLogo brandId={campaign.brand} customStyle={{ maxWidth: '90%', maxHeight: '90%' }} />
            </span>
            <a href={`/brand/${campaign.brandSlug || campaign.brand.toLowerCase().replace(/[^a-z0-9]/g, '')}`} style={{ borderBottom: '1px solid var(--border-subtle)', fontWeight: 500 }}>{campaign.brand}</a>
          </div>
        </div>
        <div className="article-header__meta-item">
          <strong>Launched</strong>
          {campaign.year}
        </div>
        <div className="article-header__meta-item">
          <strong>Duration</strong>
          {campaign.duration}
        </div>
        <div className="article-header__meta-item">
          <strong>Primary Medium</strong>
          {campaign.meta[1]}
        </div>
        <div className="article-header__meta-item">
          <strong>Reading Time</strong>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontWeight: 500 }}>
            <Clock size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <span>{readTime} min read</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-5)', flexWrap: 'wrap' }}>
        <button className="btn btn--sm btn--primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }} onClick={(e) => onShareCampaign(campaign.id, e)}>
          <Share2 size={14} />
          <span>Copy Reference Link</span>
        </button>
        {campaign.documents && campaign.documents.map((doc, idx) => (
          <a 
            key={idx}
            href={doc.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn--sm btn--secondary" 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Download size={14} />
            <span>View {doc.filename || 'Research Paper'}</span>
          </a>
        ))}
      </div>
    </header>
  );
};
