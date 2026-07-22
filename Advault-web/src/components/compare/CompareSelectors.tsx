import React from 'react';
import { Plus, X } from 'lucide-react';
import { Campaign } from '../../types';

interface CompareSelectorsProps {
  campaigns: Campaign[];
  compareIds: string[];
  onUpdateCompareId: (index: number, newId: string) => void;
  onAddCompareSlot: () => void;
  onRemoveCompareSlot: (index: number) => void;
}

export const CompareSelectors: React.FC<CompareSelectorsProps> = ({
  campaigns,
  compareIds,
  onUpdateCompareId,
  onAddCompareSlot,
  onRemoveCompareSlot,
}) => {
  const getSlotLabel = (index: number) => {
    switch (index) {
      case 0:
        return 'Campaign Alpha (Use ← / ↑ keys to cycle)';
      case 1:
        return 'Campaign Beta (Use → / ↓ keys to cycle)';
      case 2:
        return 'Campaign Gamma';
      case 3:
        return 'Campaign Delta';
      default:
        return `Campaign #${index + 1}`;
    }
  };

  return (
    <div className="filters-panel" style={{ marginBottom: 'var(--space-6)' }}>
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(auto-fit, minmax(260px, 1fr))`, 
          gap: 'var(--space-4)',
          alignItems: 'flex-end'
        }}
      >
        {compareIds.map((campaignId, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
              <label 
                className="caption text-muted" 
                style={{ fontWeight: 500 }} 
                htmlFor={`compare-select-${index}`}
              >
                {getSlotLabel(index)}
              </label>
              {compareIds.length > 2 && (
                <button
                  type="button"
                  onClick={() => onRemoveCompareSlot(index)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2px',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    padding: '2px 4px',
                    borderRadius: '4px'
                  }}
                  title="Remove this campaign from comparison"
                >
                  <X size={12} />
                  <span>Remove</span>
                </button>
              )}
            </div>
            <select 
              id={`compare-select-${index}`} 
              className="search-input" 
              style={{ 
                width: '100%', 
                height: '44px', 
                padding: '0 var(--space-4)', 
                borderRadius: 'var(--radius)', 
                border: '1px solid var(--border)', 
                background: 'var(--bg)', 
                appearance: 'auto', 
                WebkitAppearance: 'auto' 
              }}
              value={campaignId}
              onChange={(e) => onUpdateCompareId(index, e.target.value)}
            >
              {campaigns.map(c => {
                const isSelectedElsewhere = compareIds.includes(c.id) && c.id !== campaignId;
                return (
                  <option key={c.id} value={c.id} disabled={isSelectedElsewhere}>
                    {c.brand} — {c.title} {isSelectedElsewhere ? ' (Already Selected)' : ''}
                  </option>
                );
              })}
            </select>
          </div>
        ))}

        {compareIds.length < 4 && (
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '44px' }}>
            <button
              className="btn btn--ghost btn--sm"
              onClick={onAddCompareSlot}
              style={{
                height: '44px',
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justify: 'center',
                gap: '8px',
                borderStyle: 'dashed',
                borderColor: 'var(--border-subtle)',
                fontWeight: 500
              }}
            >
              <Plus size={16} />
              <span>Add Campaign to Compare</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
