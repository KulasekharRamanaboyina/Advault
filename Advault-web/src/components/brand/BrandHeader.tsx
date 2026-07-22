import React from 'react';
import { Brand } from '../../types';
import { BrandLogo } from '../common/BrandLogo';

interface BrandHeaderProps {
  brand: Brand;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({ brand }) => {
  return (
    <header className="brand-header fade-in is-visible" style={{ marginBottom: 'var(--space-8)' }}>
      <div style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div id="brand-detail-mark" style={{ width: '80px', height: '80px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BrandLogo brandId={brand.id} customStyle={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
        <div style={{ flex: 1, minWidth: '250px' }}>
          <h1 className="display-lg" id="brand-detail-name" style={{ marginBottom: 'var(--space-1)' }}>{brand.name}</h1>
          <span className="caption text-muted" id="brand-detail-industry" style={{ display: 'block', marginBottom: 'var(--space-3)' }}>
            {brand.industry} &middot; Founded {brand.founded}
          </span>
          <p className="body-md" id="brand-detail-desc" style={{ maxWidth: '68ch', color: 'var(--text-muted)' }}>
            {brand.description}
          </p>
        </div>
      </div>
    </header>
  );
};
