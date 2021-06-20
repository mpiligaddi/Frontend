import React, { FC } from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Grid, { GridProps } from '@material-ui/core/Grid';

const useStyles = makeStyles({
  grid: {
    margin: '0 -15px',
    width: 'calc(100% + 30px)'
    // '&:before,&:after':{
    //   display: 'table',
    //   content: '" "',
    // },
    // '&:after':{
    //   clear: 'both',
    // }
  }
});

type GridContainerProps = Omit<GridProps, 'container'>;

const GridContainer: FC<GridContainerProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Grid container {...rest} className={classes.grid + ' ' + className}>
      {children}
    </Grid>
  );
};

GridContainer.propTypes = {
  className: PropTypes.string
};

export default GridContainer;
