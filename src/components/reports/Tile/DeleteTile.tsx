import { useState, FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';

const useStyles = makeStyles({
  select: {
    width: '300px'
  }
});

type DeleteTileProps = {
  isOpen: boolean;
  onClose(): void;
  onDelete(reason: string): void;
};

const DeleteTile: FC<DeleteTileProps> = ({ isOpen, onClose, onDelete }) => {
  const [reason, setReason] = useState('');
  const classes = useStyles();

  return (
    <Dialog
      open={isOpen}
      onClick={e => e.stopPropagation()}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Eliminar Imagen</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Selecciona un motivo por el cual deseas eliminar esta imagen
        </DialogContentText>

        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Motivo</InputLabel>
          <Select
            className={classes.select}
            autoWidth
            onChange={e => {
              e.stopPropagation();
              setReason(e.target.value as string);
            }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            defaultValue="Elije una opcion"
            value={reason}
            label="Motivo"
          >
            <MenuItem value="Error de ejecución">Error de ejecución</MenuItem>
            <MenuItem value="Mala calidad de fotografía">
              Mala calidad de fotografía
            </MenuItem>
            <MenuItem value="No corresponde al cliente/cadena">
              No corresponde al cliente/cadena
            </MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          color="primary"
          onClick={e => {
            e.stopPropagation();
            onDelete(reason);
          }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTile;
