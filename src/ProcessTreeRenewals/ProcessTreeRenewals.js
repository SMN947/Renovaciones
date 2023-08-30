import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import "./ProcessTreeRenewals.css"

import Admin from './Modules/Admin';
import Agent from './Modules/Agent';

function ProcessTreeRenewalsDashboard() {
    const [showAgent, setShowAgent] = useState(false);

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                className='btnSwitch'
                onClick={() => setShowAgent(!showAgent)}
            >
                {showAgent ? 'Ver Admin' : 'Ver Agente'}
            </Button>

            {showAgent ? <Agent /> : <Admin />}
        </>
    );
}

export { ProcessTreeRenewalsDashboard };