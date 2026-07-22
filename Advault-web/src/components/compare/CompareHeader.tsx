import React from 'react';
import { ArrowLeftRight } from 'lucide-react';

export const CompareHeader: React.FC = () => {
  return (
    <header style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-6)' }}>
      <div className="caption text-muted" style={{ marginBottom: 'var(--space-2)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
        <ArrowLeftRight size={12} />
        <span>Matrix</span>
      </div>
      <h1 className="display-lg">Side-by-Side Comparison.</h1>
      <p className="body-lg" style={{ maxWidth: '64ch', marginTop: 'var(--space-3)' }}>
        Compare two or more marketing case studies side-by-side. Use the dropdowns or click <strong style={{ color: 'var(--text)' }}>+ Add Campaign to Compare</strong> to add additional campaigns to the evaluation matrix.
      </p>
    </header>
  );
};
