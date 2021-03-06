import { transition, containerFluid } from '@/utils/styles';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
    '&:after': {
      display: 'table',
      clear: 'both',
      content: '" "'
    }
  },
  mainPanel: {
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    // [theme.breakpoints.up("md")]: {
    //   width: `calc(100% - ${drawerWidth}px)`
    // },
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch'
  },
  logo: {
    zIndex: 9,
    [theme.breakpoints.down('sm')]: {
      transform: 'scale(1)'
    }
  },
  content: {
    marginTop: '30px',
    padding: '30px 15px',
    minHeight: 'calc(100vh - 123px)'
  },
  container: { ...containerFluid },
  map: {
    marginTop: '70px'
  },
  clean: {
    marginTop: 0,
    paddingTop: 0
  },
  mainPanelSidebarMini: {
    // [theme.breakpoints.up("md")]: {
    //   width: `calc(100% - ${drawerMiniWidth}px)`
    // }
  },
  mainPanelWithPerfectScrollbar: {
    overflow: 'hidden !important'
  }
}));
