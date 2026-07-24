import React, { useState } from 'react';
import { useAdbicepsData } from '../../context/AdbicepsDataContext';
import { BrandCard } from '../common/BrandCard';

export const HomeBrandGrid: React.FC = () => {
  const { brands: BRANDS } = useAdbicepsData();
  const [isExpanded, setIsExpanded] = useState(false);

  const allBrands = Object.values(BRANDS);
  const brandList = isExpanded ? allBrands : allBrands.slice(0, 4);
  const hasMoreBrands = allBrands.length > 4;

  return (
    <section className="section" style={{ borderBottom: 'none' }}>
      <div className="container">
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h2 className="display-md" id="documented-brands-title" style={{ margin: 0 }}>Documented Brands</h2>
        </div>
        
        <div className="grid grid--4" id="home-brands-grid">
          {brandList.map((brand, index) => (
            <BrandCard 
              key={brand.id} 
              brand={brand} 
            />
          ))}
        </div>

        {hasMoreBrands && !isExpanded && (
          <div style={{ marginTop: 'var(--space-6)', display: 'flex', justifyContent: 'center' }}>
            <button 
              onClick={() => setIsExpanded(true)}
              className="btn btn--outline" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '24px', cursor: 'pointer', background: 'transparent' }}
            >
              <span>More Brands &rarr;</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
