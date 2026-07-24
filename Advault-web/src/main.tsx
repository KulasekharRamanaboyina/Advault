import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { AdbicepsDataProvider } from './context/AdbicepsDataContext';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <AdbicepsDataProvider>
        <App />
      </AdbicepsDataProvider>
    </React.StrictMode>
  );
}
