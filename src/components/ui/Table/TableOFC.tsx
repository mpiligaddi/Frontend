import { FC } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import { defaultFont } from '@/utils/styles';

const StyledTableCell = withStyles({
  head: {
    backgroundColor: '#9e9e9e',
    color: 'white'
  },
  body: {
    fontFamily: defaultFont.fontFamily,
    color: 'gray'
  }
})(TableCell);

function createData(pra: string, renov: string, when: string) {
  return { pra, renov, when };
}

const rows = [
  createData('Foto Visita', 'Semanal', 'Todos los Lunes'),
  createData('Foto Semanal', 'Semanal', 'Todos los Lunes'),
  createData('Foto Quincenal', 'Quincenal', 'Los Lunes cada 15 días'),
  createData('Foto Mensual', 'Mensual', 'El día 1 de cada mes')
];

const TableOFC: FC = () => {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">PRA</StyledTableCell>
            <StyledTableCell align="center">Se renueva</StyledTableCell>
            <StyledTableCell align="center">Cuándo</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.pra}>
              <StyledTableCell align="center">{row.pra}</StyledTableCell>
              <StyledTableCell align="center">{row.renov}</StyledTableCell>
              <StyledTableCell align="center">{row.when}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableOFC;
