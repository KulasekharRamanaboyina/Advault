import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Brand } from '../../types';
import { BrandLogo } from './BrandLogo';

interface BrandCardProps {
  brand: Brand;
  variant?: 'default' | 'dark';
}

export const BrandCard: React.FC<BrandCardProps> = ({ brand, variant = 'default' }) => {
  return (
    <div 
      className={`brand-card fade-in is-visible ${variant === 'dark' ? 'brand-card--dark' : ''}`} 
      onClick={() => {
        window.history.pushState({}, '', `/brand/${brand.id}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }}
    >
      <div className="brand-card__mark">
        <BrandLogo brandId={brand.id} />
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 className="brand-card__name">{brand.name}</h3>
          <span className="brand-card__industry caption">{brand.industry}</span>
        </div>
        <ArrowUpRight size={14} className="brand-card__arrow" style={{ flexShrink: 0 }} />
      </div>
    </div>
  );
};
