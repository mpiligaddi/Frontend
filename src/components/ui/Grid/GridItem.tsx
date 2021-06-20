import React, { FC } from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Grid, { GridProps } from '@material-ui/core/Grid';

const styles = {
  grid: {
    padding: '0 15px !important'
  }
};

const useStyles = makeStyles(styles);

type GridItemProps = Omit<GridProps, 'item'>;

const GridItem: FC<GridItemProps> = ({ children, className, ...rest }) => {
  const classes = useStyles();
  return (
    <Grid item {...rest} className={classes.grid + ' ' + className}>
      {children}
    </Grid>
  );
};

GridItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default GridItem;
