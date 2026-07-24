import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer" id="main-footer">
      <div className="container">
        <div className="footer__inner">
          {/* Left Column: Logo */}
          <div className="footer__left">
            <a href="/" className="footer__logo">
              Ad<span>biceps</span>
            </a>
          </div>

          {/* Center Column: Primary Links */}
          <div className="footer__center">
            <a href="/" className="footer__link">Home</a>
            <span>&bull;</span>
            <a href="/#documented-brands-title" className="footer__link">Brands</a>
            <span>&bull;</span>
            <a href="/blogs" className="footer__link">Blogs</a>
          </div>

          {/* Right Column: Legal Links & Copyright */}
          <div className="footer__right">
            <div className="footer__legal-links">
              <a href="/terms" className="footer__link">Terms & Conditions</a>
              <span>&bull;</span>
              <a href="/privacy" className="footer__link">Privacy Policy</a>
            </div>
            <div className="footer__meta">
              &copy; {new Date().getFullYear()} Adbiceps. Peer-Reviewed Marketing Intelligence.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
