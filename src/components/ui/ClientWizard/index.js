import React from 'react';
import MaterialLayout from './MaterialLayout';
import CreateClientPage from './CreateClientPage';

function ClientWizard() {
  return (
    <div>
      <MaterialLayout>
        <CreateClientPage />
      </MaterialLayout>
    </div>
  );
}

export default ClientWizard;
