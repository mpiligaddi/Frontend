import React from 'react';
import { Paper, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';


import { theme, useStyle } from './styles';

export default function MaterialLayout(props) {
  const { children } = props;
  const classes = useStyle();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}  
    </ThemeProvider>
  );
}
