import React from 'react';
import { useAdbicepsData } from '../../context/AdbicepsDataContext';
import { getImageUrl } from '../../sanityClient';

interface BrandLogoProps {
  brandId: string;
  customStyle?: React.CSSProperties;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ brandId, customStyle = {} }) => {
  const { brands: BRANDS } = useAdbicepsData();
  const normalizedId = brandId.toLowerCase().replace(/[^a-z0-9]/g, '');
  const brand = BRANDS[normalizedId];
  const name = brand ? brand.name : brandId;
  const initial = name.charAt(0).toUpperCase();

  // Map normalized brand IDs to local logo assets copied from the brand logos folder
  const localLogoMap: Record<string, string> = {
    amul: '/logos/amul.svg',
    cocacola: '/logos/Coca-cola.svg',
    'coca-cola': '/logos/Coca-cola.svg',
    shareacoke: '/logos/Coca-cola.svg',
    nike: '/logos/Nike.svg',
    cadbury: '/logos/cadbury.svg',
    minimalist: '/logos/minimalist.webp',
    vw: '/logos/VolksWagen.svg',
    volkswagen: '/logos/VolksWagen.svg',
    absolut: '/logos/absolut.svg',
    redbull: '/logos/redbull.svg',
  };

  // Try to get Sanity image URL, fall back to local mapping
  const sanityLogoUrl = brand?.logo ? getImageUrl(brand.logo) : '';
  const logoPath = sanityLogoUrl || localLogoMap[normalizedId];

  if (logoPath) {
    // Custom premium backgrounds for specific logos to ensure correct color visibility
    let bg = 'transparent';
    if (normalizedId === 'absolut') {
      bg = '#0F0F12'; // Premium deep black for white Absolut text
    } else if (normalizedId === 'cadbury') {
      bg = '#2A085C'; // Signature Cadbury Royal Purple for gold/white typography
    }

    return (
      <div 
        style={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          backgroundColor: bg,
          borderRadius: 'inherit'
        }}
      >
        <img 
          src={logoPath}
          alt={`${name} Logo`}
          style={{
            maxWidth: '85%',
            maxHeight: '85%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
            ...customStyle
          }}
        />
      </div>
    );
  }

  // Fallback styling: clean, modern text initial inside a neutral background
  return (
    <div 
      className="mono"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111116',
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: '15px',
        borderRadius: '6px',
        userSelect: 'none',
        ...customStyle
      }}
    >
      {initial}
    </div>
  );
};
