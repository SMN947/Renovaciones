import React, { useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Button from '@mui/material/Button';

import Agent from './Agent';
import Admin from './Admin';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const App = () => {
  // if (localStorage.getItem('flowchart') == null) {
  // localStorage.setItem(
  //   'flowchartLines',
  //   ''
  // );
  // localStorage.setItem(
  //   'flowchart',
  //   ''
  // );
  // }
  const [showAgent, setShowAgent] = useState(true);

  return (
    <StrictMode>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowAgent(!showAgent)}
      >
        {showAgent ? 'Ver Admin' : 'Ver Agente'}
      </Button>
      <hr />
      {showAgent ? <Agent /> : <Admin />}
      {/* <Admin /> */}
      {/* <Agent /> */}
    </StrictMode>
  );
};

root.render(<App />);
