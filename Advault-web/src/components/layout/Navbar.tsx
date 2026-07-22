import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <header className="nav" id="main-nav">
      <div className="container nav__inner">
        <a href="#home" className="nav__logo">
          A<span>dVault</span>
        </a>
      </div>
    </header>
  );
};
