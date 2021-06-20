import React from 'react';
import { Typography } from '@material-ui/core';

function CreateClientSuccess() {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        El cliente ha sido agregado con éxito
      </Typography>
      <Typography variant="subtitle1">
        Si deseas agregar más clientes, comienza el proceso nuevamente.
      </Typography>
    </React.Fragment>
  );
}

export default CreateClientSuccess;
