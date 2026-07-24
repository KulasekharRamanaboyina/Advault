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
        minHeight: 'auto',
        display: 'flex',
        alignItems: 'center',
        borderBottom: 'none',
        paddingTop: 'var(--space-10)',
        paddingBottom: 'var(--space-10)',
        position: 'relative'
      }}
    >
      <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="caption text-muted fade-in is-visible" style={{ marginBottom: 'var(--space-4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Adbiceps &bull; The Peer-Reviewed Archive of Physical Media & Consumer Strategy
        </div>

        <h1 className="display-xl fade-in is-visible" id="hero-title" style={{ marginBottom: 'var(--space-5)', maxWidth: '20ch', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.1' }}>
          The Wikipedia for Offline Marketing.
        </h1>

        <p className="body-lg fade-in is-visible text-muted" style={{ maxWidth: '72ch', marginBottom: 'var(--space-8)', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.6' }}>
          Discover, research, compare, and learn from verified real-world offline marketing campaigns. Detailed strategy, consumer psychology, media mix, and business outcomes documented with absolute precision.
        </p>

        <div className="fade-in is-visible" style={{ width: '100%', maxWidth: '680px', marginBottom: 'var(--space-6)', marginLeft: 'auto', marginRight: 'auto' }}>
          <form className="search-container" id="hero-search-form" autoComplete="off" onSubmit={handleSubmit}>
            <input
              type="text"
              className="search-input"
              id="hero-search-input"
              placeholder="Search campaigns, brands, or strategies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ 
                backgroundColor: 'var(--bg)', 
                border: '1px solid var(--border)',
                paddingLeft: '20px',
                paddingRight: '48px'
              }}
            />
            <button
              type="submit"
              className="search-submit-btn"
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'color var(--ease)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};
