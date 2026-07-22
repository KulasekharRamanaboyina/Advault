import React, { useState, useEffect } from 'react';
import { useAdVaultData } from '../../context/AdVaultDataContext';
import { CompareHeader } from './CompareHeader';
import { CompareSelectors } from './CompareSelectors';
import { CompareMatrix } from './CompareMatrix';

interface CompareViewProps {
  campaignAId: string;
  campaignBId: string;
  setCampaignAId: (id: string) => void;
  setCampaignBId: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  campaignAId,
  campaignBId,
  setCampaignAId,
  setCampaignBId,
  onShowToast,
}) => {
  const { campaigns: CAMPAIGNS } = useAdVaultData();
  const campaigns = Object.values(CAMPAIGNS);

  const [compareIds, setCompareIds] = useState<string[]>([campaignAId, campaignBId]);

  // Keep slot 0 and slot 1 synchronized with parent props if changed from outside
  useEffect(() => {
    setCompareIds(prev => {
      const copy = [...prev];
      copy[0] = campaignAId;
      copy[1] = campaignBId;
      return copy;
    });
  }, [campaignAId, campaignBId]);

  const handleUpdateCompareId = (index: number, newId: string) => {
    setCompareIds(prev => {
      const next = [...prev];
      next[index] = newId;
      return next;
    });

    if (index === 0) setCampaignAId(newId);
    if (index === 1) setCampaignBId(newId);
  };

  const handleAddCompareSlot = () => {
    if (compareIds.length >= 4) return;

    // Find the first campaign ID not currently selected
    const unusedCampaign = campaigns.find(c => !compareIds.includes(c.id)) || campaigns[0];
    setCompareIds(prev => [...prev, unusedCampaign.id]);
    onShowToast(`Added ${unusedCampaign.brand} — ${unusedCampaign.title} to comparison matrix`);
  };

  const handleRemoveCompareSlot = (index: number) => {
    if (compareIds.length <= 2) return;

    setCompareIds(prev => prev.filter((_, idx) => idx !== index));
    onShowToast('Removed campaign column from comparison matrix');
  };

  // Keyboard navigation for Slot 0 (Alpha) and Slot 1 (Beta)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement as HTMLElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'SELECT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }

      const keys = campaigns.map(c => c.id);
      const idA = compareIds[0] || campaignAId;
      const idB = compareIds[1] || campaignBId;
      const indexA = keys.indexOf(idA);
      const indexB = keys.indexOf(idB);

      if (indexA === -1 || indexB === -1) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        let nextIdx = (indexA - 1 + keys.length) % keys.length;
        let attempts = 0;
        while (compareIds.includes(keys[nextIdx]) && keys[nextIdx] !== idA && attempts < keys.length) {
          nextIdx = (nextIdx - 1 + keys.length) % keys.length;
          attempts++;
        }
        const newId = keys[nextIdx];
        handleUpdateCompareId(0, newId);
        onShowToast(`Campaign Alpha switched to: ${CAMPAIGNS[newId].brand} — ${CAMPAIGNS[newId].title}`);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        let nextIdx = (indexA + 1) % keys.length;
        let attempts = 0;
        while (compareIds.includes(keys[nextIdx]) && keys[nextIdx] !== idA && attempts < keys.length) {
          nextIdx = (nextIdx + 1) % keys.length;
          attempts++;
        }
        const newId = keys[nextIdx];
        handleUpdateCompareId(0, newId);
        onShowToast(`Campaign Alpha switched to: ${CAMPAIGNS[newId].brand} — ${CAMPAIGNS[newId].title}`);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        let nextIdx = (indexB + 1) % keys.length;
        let attempts = 0;
        while (compareIds.includes(keys[nextIdx]) && keys[nextIdx] !== idB && attempts < keys.length) {
          nextIdx = (nextIdx + 1) % keys.length;
          attempts++;
        }
        const newId = keys[nextIdx];
        handleUpdateCompareId(1, newId);
        onShowToast(`Campaign Beta switched to: ${CAMPAIGNS[newId].brand} — ${CAMPAIGNS[newId].title}`);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        let nextIdx = (indexB - 1 + keys.length) % keys.length;
        let attempts = 0;
        while (compareIds.includes(keys[nextIdx]) && keys[nextIdx] !== idB && attempts < keys.length) {
          nextIdx = (nextIdx - 1 + keys.length) % keys.length;
          attempts++;
        }
        const newId = keys[nextIdx];
        handleUpdateCompareId(1, newId);
        onShowToast(`Campaign Beta switched to: ${CAMPAIGNS[newId].brand} — ${CAMPAIGNS[newId].title}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [compareIds, campaignAId, campaignBId, campaigns, onShowToast]);

  const selectedCampaigns = compareIds
    .map(id => CAMPAIGNS[id])
    .filter(Boolean);

  return (
    <section className="view view--active" data-view="compare" id="view-compare">
      <div className="container">
        <CompareHeader />
        <CompareSelectors 
          campaigns={campaigns}
          compareIds={compareIds}
          onUpdateCompareId={handleUpdateCompareId}
          onAddCompareSlot={handleAddCompareSlot}
          onRemoveCompareSlot={handleRemoveCompareSlot}
        />
        <CompareMatrix 
          selectedCampaigns={selectedCampaigns}
          onRemoveSlot={handleRemoveCompareSlot}
        />
      </div>
    </section>
  );
};
