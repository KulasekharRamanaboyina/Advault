import React from 'react';

export const DiscoverHeader: React.FC = () => {
  return (
    <header style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-6)' }}>
      <div className="caption text-muted" style={{ marginBottom: 'var(--space-2)' }}>Library</div>
      <h1 className="display-lg" id="discover-title">Discover Offline Work.</h1>
      <p className="body-lg" style={{ maxWidth: '64ch', marginTop: 'var(--space-3)' }}>
        Browse the library of documented campaigns. Search by name, brand, or copy, and refine your scope with the editorial taxonomies below.
      </p>
    </header>
  );
};
