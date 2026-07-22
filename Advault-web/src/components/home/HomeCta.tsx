import React from 'react';
import { ArrowRight } from 'lucide-react';

export const HomeCta: React.FC = () => {
  return (
    <section className="section" style={{ borderBottom: 'none' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="caption text-muted" style={{ marginBottom: 'var(--space-4)' }}>Get Started</div>
        <h2 className="display-lg" style={{ marginBottom: 'var(--space-4)' }}>Begin your research.</h2>
        <p className="body-lg" style={{ maxWidth: '60ch', marginLeft: 'auto', marginRight: 'auto', marginBottom: 'var(--space-6)' }}>
          Navigate through hundreds of deep-dives covering consumer psychology, media strategy, local activations, and direct mail campaigns.
        </p>
        <a href="#discover" className="btn btn--primary btn--lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span>Explore Archive</span>
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
};
