import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface HomeHeroProps {
  onSearchSubmit: (query: string) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onSearchSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(query);
  };

  return (
    <header
      className="section hero-pattern"
      style={{
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: 'var(--space-12)',
        paddingBottom: 'var(--space-16)',
        position: 'relative'
      }}
    >
      <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="caption text-muted fade-in is-visible" style={{ marginBottom: 'var(--space-4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          AdVault &bull; The Peer-Reviewed Archive of Physical Media & Consumer Strategy
        </div>

        <h1 className="display-xl fade-in is-visible" id="hero-title" style={{ marginBottom: 'var(--space-5)', maxWidth: '20ch', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.1' }}>
          The Wikipedia for Offline Marketing.
        </h1>

        <p className="body-lg fade-in is-visible text-muted" style={{ maxWidth: '72ch', marginBottom: 'var(--space-8)', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.6' }}>
          Discover, research, compare, and learn from verified real-world offline marketing campaigns. Detailed strategy, consumer psychology, media mix, and business outcomes documented with absolute precision.
        </p>

        <div className="fade-in is-visible" style={{ width: '100%', maxWidth: '680px', marginBottom: 'var(--space-6)', marginLeft: 'auto', marginRight: 'auto' }}>
          <form className="search-container" id="hero-search-form" autoComplete="off" onSubmit={handleSubmit}>
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              id="hero-search-input"
              placeholder="Search campaigns, brands, or strategies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}
            />
            <span className="search-shortcut" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>⌘K</span>
          </form>
        </div>
      </div>
    </header>
  );
};
