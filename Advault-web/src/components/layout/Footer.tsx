import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer" id="main-footer">
      <div className="container">
        <div className="footer__inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
          <a href="/" className="footer__logo">
            A<span>dVault</span>
          </a>
          <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: '13px', color: 'var(--text-muted)', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
            <a href="/" className="footer__link">Home</a>
            <span>&bull;</span>
            <a href="/discover" className="footer__link">Discover Library</a>
            <span>&bull;</span>
            <a href="/brands" className="footer__link">Brands</a>
            <span>&bull;</span>
            <a href="/compare" className="footer__link">Matrix</a>
            <span>&bull;</span>
            <a href="/guidelines" className="footer__link">Guidelines</a>
            <span>&bull;</span>
            <a href="/privacy" className="footer__link">Privacy Policy</a>
          </div>
          <div className="footer__meta" style={{ textAlign: 'center', marginTop: 'var(--space-2)' }}>
            &copy; {new Date().getFullYear()} AdVault. Peer-Reviewed Marketing Intelligence.
          </div>
        </div>
      </div>
    </footer>
  );
};
