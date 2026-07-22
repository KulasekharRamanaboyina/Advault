import React from 'react';
import { Search, Filter, Layers } from 'lucide-react';

interface DiscoverFiltersProps {
  filters: {
    industry: string;
    channel: string;
    search: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    industry: string;
    channel: string;
    search: string;
  }>>;
}

export const DiscoverFilters: React.FC<DiscoverFiltersProps> = ({ filters, setFilters }) => {
  const handleIndustryClick = (value: string) => {
    setFilters(prev => ({ ...prev, industry: value }));
  };

  const handleChannelClick = (value: string) => {
    setFilters(prev => ({ ...prev, channel: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const industries = [
    { label: 'All Industries', value: 'all' },
    { label: 'FMCG & Dairy', value: 'fmcg' },
    { label: 'Beverage', value: 'beverage' },
    { label: 'Sportswear', value: 'sportswear' },
    { label: 'Confectionery', value: 'confectionery' },
    { label: 'Skincare', value: 'skincare' },
    { label: 'Automotive', value: 'automotive' },
    { label: 'Spirits', value: 'spirits' },
  ];

  const channels = [
    { label: 'All Channels', value: 'all' },
    { label: 'Outdoor / OOH', value: 'outdoor' },
    { label: 'Packaging', value: 'packaging' },
    { label: 'Television', value: 'television' },
    { label: 'Sampling / Activation', value: 'sampling' },
    { label: 'Print Media', value: 'print' },
  ];

  return (
    <div className="filters-panel">
      {/* Search container */}
      <div className="search-container" autoComplete="off" style={{ width: '100%' }}>
        <Search className="search-icon" size={18} />
        <input 
          type="text" 
          className="search-input" 
          id="discover-search-input" 
          placeholder="Search campaigns, slogans, strategies..." 
          value={filters.search}
          onChange={handleSearchChange}
        />
        <span className="search-shortcut">⌘K</span>
      </div>

      {/* Industry taxonomy filter row */}
      <div className="filters-group" id="filter-industry">
        <span className="filters-group__label" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Filter size={12} />
          <span>Industry Classification</span>
        </span>
        <div className="tags">
          {industries.map(ind => (
            <button 
              key={ind.value}
              className={`tag ${filters.industry === ind.value ? 'tag--active' : ''}`}
              onClick={() => handleIndustryClick(ind.value)}
              data-value={ind.value}
            >
              {ind.label}
            </button>
          ))}
        </div>
      </div>

      {/* Channel taxonomy filter row */}
      <div className="filters-group" id="filter-channel">
        <span className="filters-group__label" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Layers size={12} />
          <span>Media Channel</span>
        </span>
        <div className="tags">
          {channels.map(ch => (
            <button 
              key={ch.value}
              className={`tag ${filters.channel === ch.value ? 'tag--active' : ''}`}
              onClick={() => handleChannelClick(ch.value)}
              data-value={ch.value}
            >
              {ch.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
