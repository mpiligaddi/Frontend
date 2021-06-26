import {
  containerFluid,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor
} from '@/utils/styles';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: 'transparent',
    position: 'absolute',
    //boxShadow: "none",
    //borderBottom: "0",
    marginBottom: '0',
    width: '100%',
    paddingTop: '0px',
    zIndex: 1029,
    color: grayColor[6],
    minHeight: '50px',
    display: 'block',
    ...defaultBoxShadow
  },
  container: {
    ...containerFluid,
    minHeight: '50px'
  },
  flex: {
    flex: 1
  },
  logo: {
    width: '120px',
    height: '40px',
    position: 'relative',
    //zIndex: '1',
    [theme.breakpoints.down('sm')]: {
      transform: 'scale(1)'
    }
  },
  title: {
    ...defaultFont,
    lineHeight: '30px',
    fontSize: '30px',
    borderRadius: '3px',
    textTransform: 'none',
    color: 'inherit',
    paddingTop: '0.625rem',
    paddingBottom: '0.625rem',
    margin: '0 !important',
    letterSpacing: 'unset',
    '&:hover,&:focus': {
      background: 'transparent'
    }
  },
  primary: {
    backgroundColor: primaryColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  info: {
    backgroundColor: infoColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  success: {
    backgroundColor: successColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  warning: {
    backgroundColor: warningColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  danger: {
    backgroundColor: dangerColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  sidebarMinimize: {
    float: 'left',
    padding: '0 0 0 12px',
    display: 'block',
    color: grayColor[6],
    marginLeft: -20
  },
  sidebarMiniIcon: {
    width: '13px',
    height: '11px'
  }
}));
