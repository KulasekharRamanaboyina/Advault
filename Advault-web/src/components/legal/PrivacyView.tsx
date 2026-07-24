import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, CheckCircle } from 'lucide-react';

export const PrivacyView: React.FC = () => {
  return (
    <div className="container fade-in is-visible" style={{ maxWidth: '960px', padding: 'var(--space-8) var(--space-4)', margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <a href="/" className="btn btn--sm btn--ghost" style={{ paddingLeft: 0, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </a>
      </div>

      <header style={{ marginBottom: 'var(--space-8)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
          <Shield size={28} style={{ color: 'var(--text)' }} />
          <h1 className="display-md" style={{ margin: 0 }}>Privacy & Data Policy</h1>
        </div>
        <p className="body-lg text-muted">
          Your data belongs to you. Here is how we ensure secure, local-first intelligence.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', lineHeight: '1.6' }}>
        <section>
          <h2 className="title-md" style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={18} />
            1. Local-First Browser Storage
          </h2>
          <p className="body-md text-muted" style={{ margin: 0 }}>
            Adbiceps is built on a privacy-first, local-only architecture. Your bookmarking history, saved dossiers, and matrix comparisons are stored directly in your browser's local storage (`localStorage`). No saved dossier identifiers or comparison states are ever sent to our servers.
          </p>
        </section>

        <section>
          <h2 className="title-md" style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Eye size={18} />
            2. Analytics & Session Data
          </h2>
          <p className="body-md text-muted" style={{ margin: 0 }}>
            We do not load third-party ad pixels, trackers, or marketing automation scripts. We believe marketing intelligence platforms should not participate in invasive tracking. The only data processed is standard server routing logs for page request delivery.
          </p>
        </section>

        <section>
          <h2 className="title-md" style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={18} />
            3. Client-Side Integrity
          </h2>
          <p className="body-md text-muted" style={{ margin: 0 }}>
            Our CMS synchronization compiles dynamic content directly at build time. When you access brand timelines or editorial charts, all rendering happens securely in your sandbox client. You can safely browse public-interest campaigns without leaking your corporate strategic queries.
          </p>
        </section>
      </div>
    </div>
  );
};
