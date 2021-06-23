import { FC } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@material-ui/core';

type ForgotPasswordProps = {
  isOpen: boolean;
  close(): void;
};

const ForgotPassword: FC<ForgotPasswordProps> = ({ isOpen, close }) => {
  return (
    <>
      <Dialog open={isOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Restablecer contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Escriba a <b>soporte.chek@gmail.com</b> para solicitar el
            restablecimiento de su contraseña
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={close}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ForgotPassword;
