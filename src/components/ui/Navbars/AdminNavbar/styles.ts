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
  grayColor,
  drawerWidth
} from '@/utils/styles';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: 'transparent',
    marginBottom: '0',
    position: 'absolute',
    width: '100%',
    paddingTop: '0px',
    zIndex: 500,
    color: grayColor[6],
    minHeight: '50px',
    display: 'block',
    marginLeft: 0,
    boxShadow: `
    0px 7.76336px 32.3056px rgba(0, 0, 0, 0.035), 0px 4.12306px 17.1573px rgba(0, 0, 0, 0.0282725), 0px 1.7157px 7.13952px rgba(0, 0, 0, 0.0196802)
    `
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
