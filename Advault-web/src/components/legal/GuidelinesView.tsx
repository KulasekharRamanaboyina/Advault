import React from 'react';
import { ArrowLeft, BookOpen, HelpCircle } from 'lucide-react';

export const GuidelinesView: React.FC = () => {
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
          <BookOpen size={28} style={{ color: 'var(--text)' }} />
          <h1 className="display-md" style={{ margin: 0 }}>Editorial & Submission Guidelines</h1>
        </div>
        <p className="body-lg text-muted">
          Vetting standards for indexing case studies and campaign dossiers in AdVault.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', lineHeight: '1.6' }}>
        <section>
          <h2 className="title-md" style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-flex', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600 }}>1</span>
            Core Submission Criteria
          </h2>
          <p className="body-md text-muted" style={{ marginBottom: 'var(--space-3)' }}>
            AdVault is a curated database of peer-reviewed marketing intelligence. We only accept dossiers that meet strict empirical standards:
          </p>
          <ul style={{ paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', color: 'var(--text-muted)' }}>
            <li><strong>Verified Spends:</strong> Budget allocations must be cross-referenced with public reporting or reliable vendor statements.</li>
            <li><strong>Methodology Vetting:</strong> Case studies must detail the exact channel mix, media assets, and strategic playbooks.</li>
            <li><strong>Temporal Breadth:</strong> We prioritize long-running footprints or campaigns that demonstrate clear strategic shifts over time.</li>
          </ul>
        </section>

        <section>
          <h2 className="title-md" style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-flex', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600 }}>2</span>
            Dossier Drafting Structure
          </h2>
          <p className="body-md text-muted" style={{ marginBottom: 'var(--space-3)' }}>
            Every indexing dossier must follow our horizontal column layout format to ensure readable cross-examination:
          </p>
          <ul style={{ paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', color: 'var(--text-muted)' }}>
            <li><strong>Objective vs. Strategy:</strong> Clearly define the primary marketing goal versus the tactical execution details.</li>
            <li><strong>Vetted Metrics Table:</strong> Standardize ROI, CTR, CPC, and customer acquisition metrics in a structured grid.</li>
            <li><strong>Playbook Lessons:</strong> Distill actionable insights into concise, positive/negative checklists for marketing managers.</li>
          </ul>
        </section>

        <section style={{ backgroundColor: 'var(--surface-subtle)', padding: 'var(--space-5)', borderRadius: '12px', border: '1px solid var(--border-subtle)', marginTop: 'var(--space-3)' }}>
          <h3 className="title-sm" style={{ marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <HelpCircle size={16} />
            How are dossiers peer-reviewed?
          </h3>
          <p className="body-sm text-muted" style={{ margin: 0 }}>
            Once submitted via the CMS, a dossier goes to a panel of three verified marketing strategists. They cross-check the data sources and either approve, request revision, or reject the index.
          </p>
        </section>
      </div>
    </div>
  );
};
