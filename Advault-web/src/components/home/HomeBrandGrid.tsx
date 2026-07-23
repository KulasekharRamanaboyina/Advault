import React from 'react';
import { useAdVaultData } from '../../context/AdVaultDataContext';
import { BrandCard } from '../common/BrandCard';

export const HomeBrandGrid: React.FC = () => {
  const { brands: BRANDS } = useAdVaultData();
  const brandList = Object.values(BRANDS).slice(0, 4);

  return (
    <section className="section">
      <div className="container">
        <div style={{ marginBottom: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div>
            <h2 className="display-md" id="documented-brands-title">Documented Brands</h2>
          </div>
          <a href="/brands" className="btn btn--sm btn--ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span>More &rarr;</span>
          </a>
        </div>
        
        <div className="grid grid--4" id="home-brands-grid">
          {brandList.map((brand, index) => (
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
