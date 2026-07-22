import React from 'react';
import { useAdVaultData } from '../../context/AdVaultDataContext';
import { BrandCard } from '../common/BrandCard';

export const DiscoverBrandGrid: React.FC = () => {
  const { brands: BRANDS } = useAdVaultData();
  return (
    <section style={{ paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border-subtle)' }}>
      <div style={{ marginBottom: 'var(--space-5)' }}>
        <div className="caption text-muted" style={{ marginBottom: 'var(--space-2)' }}>Directory</div>
        <h2 className="display-md">Brand Index</h2>
        <p className="body-sm text-muted">A full catalog of brands and their strategic evolution timelines.</p>
      </div>
      <div className="grid grid--4" id="discover-brands-grid">
        {Object.values(BRANDS).map(brand => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </section>
  );
};
