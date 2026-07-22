import React from 'react';
import { X } from 'lucide-react';
import { Campaign } from '../../types';
import { BrandLogo } from '../common/BrandLogo';

interface CompareMatrixProps {
  selectedCampaigns: Campaign[];
  onRemoveSlot?: (index: number) => void;
}

export const CompareMatrix: React.FC<CompareMatrixProps> = ({ selectedCampaigns, onRemoveSlot }) => {
  const columnCount = selectedCampaigns.length;
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `200px repeat(${columnCount}, minmax(220px, 1fr))`,
    minWidth: `${200 + columnCount * 220}px`
  };

  return (
    <div className="compare-table" id="compare-table-content" style={{ marginBottom: 'var(--space-12)', overflowX: 'auto' }}>
      {/* Table Head */}
      <div className="compare-table__row compare-table__row--head" style={gridStyle}>
        <div className="compare-table__cell">Evaluation Parameter</div>
        
        {selectedCampaigns.map((camp, index) => (
          <div key={`${camp.id}-${index}`} className="compare-table__cell" style={{ fontWeight: 600, padding: 'var(--space-4) var(--space-5)', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', minHeight: '36px', flex: 1 }}>
                <span className="brand-card__mark" style={{ width: '24px', height: '24px', backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid var(--border-subtle)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '2px', flexShrink: 0 }}>
                  <BrandLogo brandId={camp.brand} customStyle={{ maxWidth: '90%', maxHeight: '90%' }} />
                </span>
                <div>
                  <div style={{ lineHeight: 1.2 }}>{camp.title}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', marginTop: '1px' }}>{camp.brand}</div>
                </div>
              </div>

              {columnCount > 2 && onRemoveSlot && (
                <button
                  type="button"
                  onClick={() => onRemoveSlot(index)}
                  style={{
                    color: 'var(--text-muted)',
                    padding: '2px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    opacity: 0.7
                  }}
                  title="Remove column"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Objective Row */}
      <div className="compare-table__row" style={gridStyle}>
        <div className="compare-table__cell compare-table__cell--label">Objective</div>
        {selectedCampaigns.map((camp, idx) => (
          <div key={idx} className="compare-table__cell">{camp.objectiveContent.goals}</div>
        ))}
      </div>

      {/* Strategy Row */}
      <div className="compare-table__row" style={gridStyle}>
        <div className="compare-table__cell compare-table__cell--label">Strategy</div>
        {selectedCampaigns.map((camp, idx) => (
          <div key={idx} className="compare-table__cell">{camp.strategy.approach}</div>
        ))}
      </div>

      {/* Consumer Psychology Row */}
      <div className="compare-table__row" style={gridStyle}>
        <div className="compare-table__cell compare-table__cell--label">Psychology</div>
        {selectedCampaigns.map((camp, idx) => (
          <div key={idx} className="compare-table__cell">{camp.strategy.psychology}</div>
        ))}
      </div>

      {/* Media Mix Row */}
      <div className="compare-table__row" style={gridStyle}>
        <div className="compare-table__cell compare-table__cell--label">Media Mix</div>
        {selectedCampaigns.map((camp, idx) => (
          <div key={idx} className="compare-table__cell">
            <ul style={{ paddingLeft: '16px', fontSize: '13px' }}>
              {camp.media.channels.map((ch, channelIdx) => (
                <li key={channelIdx}>{ch.name} ({ch.share})</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Vetted Results Row */}
      <div className="compare-table__row" style={gridStyle}>
        <div className="compare-table__cell compare-table__cell--label">Results & ROI</div>
        {selectedCampaigns.map((camp, idx) => (
          <div key={idx} className="compare-table__cell">
            <strong>{camp.results.sales}</strong>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>ROI: {camp.results.roi}</p>
          </div>
        ))}
      </div>

      {/* Key Learnings Row */}
      <div className="compare-table__row" style={gridStyle}>
        <div className="compare-table__cell compare-table__cell--label">Key Learning</div>
        {selectedCampaigns.map((camp, idx) => (
          <div key={idx} className="compare-table__cell">{camp.takeaways.learnings[0]}</div>
        ))}
      </div>
    </div>
  );
};
