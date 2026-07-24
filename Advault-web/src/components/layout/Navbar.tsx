import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <header className="nav" id="main-nav">
      <div className="container nav__inner" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <a href="/" className="nav__logo">
          Ad<span>biceps</span>
        </a>
      </div>
    </header>
  );
};
