import {
  createMuiTheme,
  responsiveFontSizes,
  makeStyles
} from '@material-ui/core/styles';
import {
  primaryColor,
  dangerColor,
  grayColor,
  whiteColor
} from "../../assets/jss/trade-app.js";

import {fontSize} from '@material-ui/system'

let theme = createMuiTheme({

});

theme = responsiveFontSizes(theme);

const useStyle = makeStyles(() => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    backgroundColor: 'transparent',
    fontSize: '10px'
  },
  
}));

export { theme, useStyle };
