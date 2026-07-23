import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <header className="nav" id="main-nav">
      <div className="container nav__inner" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <a href="#home" className="nav__logo">
          A<span>dVault</span>
        </a>
      </div>
    </header>
  );
};
