import React from 'react';
import { Brand } from '../../types';
import { BrandLogo } from '../common/BrandLogo';

interface BrandHeaderProps {
  brand: Brand;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({ brand }) => {
  return (
    <header className="brand-header fade-in is-visible">
      <div className="brand-header__container">
        <div id="brand-detail-mark" className="brand-header__logo-wrapper">
          <BrandLogo brandId={brand.id} customStyle={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
        <div className="brand-header__info">
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
