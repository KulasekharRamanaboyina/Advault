import React from 'react';
import { Filter } from 'lucide-react';
import { BrandCampaignTimelineItem } from '../../types';

interface BrandTimelineProps {
  filteredTimeline: BrandCampaignTimelineItem[];
  uniqueChannels: string[];
  channelFilter: string;
  setChannelFilter: (ch: string) => void;
  hoveredCampaignId: string | null;
  setHoveredCampaignId: (id: string | null) => void;
  timelineItemRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
}

export const BrandTimeline: React.FC<BrandTimelineProps> = ({
  filteredTimeline,
  uniqueChannels,
  channelFilter,
  setChannelFilter,
  hoveredCampaignId,
  setHoveredCampaignId,
  timelineItemRefs,
}) => {
  return (
    <div className="brand-timeline-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <h2 className="title-md" style={{ marginBottom: 0 }}>Historical Footprint Timeline</h2>
      </div>

      {/* Dynamic Channel Filter Pills Row */}
      <div 
        id="timeline-channel-filters" 
        className="brand-timeline-filters"
      >
        <div className="brand-timeline-filters__label">
          <Filter size={12} />
          <span>Filter:</span>
        </div>
        <button 
          className={`tag ${channelFilter === 'all' ? 'tag--active' : ''}`} 
          onClick={() => setChannelFilter('all')}
        >
          All Channels
        </button>
        {uniqueChannels.map(ch => (
          <button 
            key={ch}
            className={`tag ${channelFilter.toLowerCase() === ch.toLowerCase() ? 'tag--active' : ''}`}
            onClick={() => setChannelFilter(ch.toLowerCase())}
          >
            {ch}
          </button>
        ))}
      </div>

      {/* Timeline Container */}
      <div 
        className="timeline" 
        id="brand-detail-timeline"
      >
        {filteredTimeline.length === 0 ? (
          <div style={{ padding: 'var(--space-6) 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', fontFamily: 'var(--font-mono)', border: '1px dashed var(--border-subtle)', borderRadius: 'var(--radius)', backgroundColor: 'var(--surface)' }}>
            No timeline events match the active filters.
          </div>
        ) : (
          filteredTimeline.map(item => {
            const isHighlighted = hoveredCampaignId !== null && hoveredCampaignId === item.id;
            
            return (
              <div 
                key={`${item.year}-${item.title}`}
                className={`timeline__item ${isHighlighted ? 'timeline__item--active' : ''}`} 
                id={`timeline-item-${item.id || ''}`}
                data-campaign-id={item.id || ''}
                ref={el => { if (item.id) timelineItemRefs.current[item.id] = el; }}
                onMouseEnter={() => { if (item.id) setHoveredCampaignId(item.id); }}
                onMouseLeave={() => { if (item.id) setHoveredCampaignId(null); }}
                onClick={() => {
                  if (item.id) {
                    window.history.pushState({}, '', `/campaign/${item.id}`);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }
                }}
                style={{ cursor: item.id ? 'pointer' : 'default' }}
              >
                <div className="timeline__year mono">{item.year}</div>
                <h4 className="timeline__title">{item.title}</h4>
                <p className="timeline__desc">{item.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                  <span className="tag" style={{ fontSize: '10px', padding: '2px 8px', cursor: 'default', pointerEvents: 'none', borderColor: 'var(--border-subtle)' }}>{item.channel}</span>
                  {item.id && (
                    <a href={`/campaign/${item.id}`} className="btn btn--sm btn--ghost" style={{ height: '26px', padding: '0 var(--space-3)', display: 'inline-flex', alignItems: 'center', fontSize: '11px' }}>
                      Read Vetted Dossier &rarr;
                    </a>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
