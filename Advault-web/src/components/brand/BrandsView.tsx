import React from 'react';
import { useAdVaultData } from '../../context/AdVaultDataContext';
import { BrandCard } from '../common/BrandCard';
import { ArrowLeft } from 'lucide-react';

export const BrandsView: React.FC = () => {
  const { brands: BRANDS } = useAdVaultData();
  const brandList = Object.values(BRANDS);

  return (
    <section className="view view--active" data-view="brands" id="view-brands" style={{ padding: 'var(--space-12) 0' }}>
      <div className="container">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <a href="/" className="btn btn--sm btn--ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-4)', paddingLeft: 0 }}>
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </a>
          <div className="caption text-muted" style={{ marginBottom: 'var(--space-2)' }}>Directory</div>
          <h1 className="display-lg" style={{ marginBottom: 'var(--space-3)' }}>Documented Brands</h1>
          <p className="body-md text-muted" style={{ maxWidth: '640px' }}>
            A comprehensive index of global brands, detailing their strategic advertising milestones and conceptual evolution histories.
          </p>
        </div>

        <div className="grid grid--4" id="all-brands-grid">
          {brandList.map((brand) => (
            <BrandCard 
              key={brand.id} 
              brand={brand} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};
