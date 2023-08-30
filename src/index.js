import React, { useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ProcessTreeRenewalsDashboard } from './ProcessTreeRenewals/ProcessTreeRenewals';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const App = () => {

  return (
    <StrictMode>
      <ProcessTreeRenewalsDashboard />
    </StrictMode>
  );
};

root.render(<App />);
