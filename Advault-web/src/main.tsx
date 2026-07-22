import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { AdVaultDataProvider } from './context/AdVaultDataContext';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <AdVaultDataProvider>
        <App />
      </AdVaultDataProvider>
    </React.StrictMode>
  );
}
