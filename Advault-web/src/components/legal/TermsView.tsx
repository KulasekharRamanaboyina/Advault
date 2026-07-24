import React from 'react';
import { ArrowLeft, Scale, HelpCircle } from 'lucide-react';

export const TermsView: React.FC = () => {
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
          <Scale size={28} style={{ color: 'var(--text)' }} />
          <h1 className="display-md" style={{ margin: 0 }}>Terms & Conditions</h1>
        </div>
        <p className="body-lg text-muted">
          Terms of service and usage regulations for the Adbiceps marketing intelligence platform.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', lineHeight: '1.6' }}>
        <section>
          <h2 className="title-md" style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-flex', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600 }}>1</span>
            Acceptance of Terms
          </h2>
          <p className="body-md text-muted" style={{ margin: 0 }}>
            By accessing or using the Adbiceps platform (including the web app, case study dossiers, and associated assets), you agree to be bound by these Terms & Conditions. If you do not agree, please discontinue using the platform.
          </p>
        </section>

        <section>
          <h2 className="title-md" style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-flex', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600 }}>2</span>
            Intellectual Property & Fair Use
          </h2>
          <p className="body-md text-muted" style={{ marginBottom: 'var(--space-3)' }}>
            All campaign analyses, editorial writeups, playbooks, and structural layouts on Adbiceps are curated for educational, analysis, and research purposes.
          </p>
          <ul style={{ paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', color: 'var(--text-muted)' }}>
            <li><strong>Brand Trademarks:</strong> All brand names, logos (e.g., Amul, Coca-Cola, Nike), and campaign slogans are trademarks of their respective owners and are displayed under fair-use commentary.</li>
            <li><strong>Editorial Content:</strong> The structural summaries, insights, and peer-reviewed dossier analyses are owned by Adbiceps.</li>
          </ul>
        </section>

        <section>
          <h2 className="title-md" style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-flex', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600 }}>3</span>
            Permitted Usage & License
          </h2>
          <p className="body-md text-muted" style={{ marginBottom: 'var(--space-3)' }}>
            Users are granted a limited, personal, non-transferable, revocable license to access campaign files for intelligence and strategy research:
          </p>
          <ul style={{ paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', color: 'var(--text-muted)' }}>
            <li>No systematic scraping, crawling, or mirroring of the dossier database is permitted.</li>
            <li>Content must not be redistributed or white-labeled as competitor databases.</li>
          </ul>
        </section>

        <section style={{ backgroundColor: 'var(--surface-subtle)', padding: 'var(--space-5)', borderRadius: '12px', border: '1px solid var(--border-subtle)', marginTop: 'var(--space-3)' }}>
          <h3 className="title-sm" style={{ marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <HelpCircle size={16} />
            Platform Disclaimer
          </h3>
          <p className="body-sm text-muted" style={{ margin: 0 }}>
            Adbiceps dossier data is compiled from public campaigns, news archives, and professional case disclosures. While we check metrics for consistency, we offer no warranty regarding data completeness or market accuracy.
          </p>
        </section>
      </div>
    </div>
  );
};
