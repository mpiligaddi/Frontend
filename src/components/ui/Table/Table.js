import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

import styles from '../../assets/jss/trade-app/components/tableStyle';

const useStyles = makeStyles(styles);

// const useRowStyles = makeStyles({
//   root: {
//     '& > *': {
//       borderBottom: 'unset',
//     },
//   },
// });

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  //const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow>
        <TableCell size="small">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* <TableCell component="th" scope="row">
          {row.name}
        </TableCell> */}
        <TableCell align="center">{row.zone}</TableCell>
        <TableCell align="center">{row.chain}</TableCell>
        <TableCell align="center">{row.withoutReport}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={3}>
              <Typography variant="subtitle1" gutterBottom component="div">
                Detalle de sucursales Sin registross
              </Typography>
              <Table aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Sucursal</TableCell>
                    <TableCell align="center">Fecha último reporte</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detailsRow, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row" align="center">
                        {detailsRow.branch}
                      </TableCell>
                      <TableCell align="center">
                        {detailsRow.lastReportDate}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };
export default function CustomTable(props) {
  const classes = useStyles();
  const {
    tableHead,
    rows,
    tableHeaderColor,
    hover,
    colorsColls,
    coloredColls,
    customCellClasses,
    customClassesForCells,
    striped,
    tableShopping,
    customHeadCellClasses,
    customHeadClassesForCells
  } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table aria-label="collapsible table" className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor]}>
            <TableRow className={classes.tableRow + ' ' + classes.tableRowHead}>
              <TableCell align="center"></TableCell>
              {tableHead.map((prop, key) => {
                const tableCellClasses =
                  classes.tableHeadCell +
                  ' ' +
                  classes.tableCell +
                  ' ' +
                  cx({
                    [customHeadCellClasses[
                      customHeadClassesForCells.indexOf(key)
                    ]]: customHeadClassesForCells.indexOf(key) !== -1,
                    [classes.tableShoppingHead]: tableShopping,
                    [classes.tableHeadFontSize]: !tableShopping
                  });
                return (
                  <TableCell key={key} align="center">
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {rows.map((row, i) => (
            <Row key={row.zone + '/' + row.chain} row={row} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray',
  hover: false,
  colorsColls: [],
  coloredColls: [],
  striped: false,
  customCellClasses: [],
  customClassesForCells: [],
  customHeadCellClasses: [],
  customHeadClassesForCells: []
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  // Of(PropTypes.arrayOf(PropTypes.node)) || Of(PropTypes.object),
  tableData: PropTypes.array,
  hover: PropTypes.bool,
  coloredColls: PropTypes.arrayOf(PropTypes.number),
  // Of(["warning","primary","danger","success","info","rose","gray"]) - colorsColls
  colorsColls: PropTypes.array,
  customCellClasses: PropTypes.arrayOf(PropTypes.string),
  customClassesForCells: PropTypes.arrayOf(PropTypes.number),
  customHeadCellClasses: PropTypes.arrayOf(PropTypes.string),
  customHeadClassesForCells: PropTypes.arrayOf(PropTypes.number),
  striped: PropTypes.bool,
  // this will cause some changes in font
  tableShopping: PropTypes.bool
};
