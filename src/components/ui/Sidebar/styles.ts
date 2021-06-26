import { blackColor, drawerWidth, primaryColor } from '@/utils/styles';
import { styled, makeStyles, Theme } from '@material-ui/core/styles';

export const ImagePreview = styled('img')({
  width: '300px',
  height: '300px',
  borderRadius: '50%'
});

export const Avatar = styled('div')<
  Theme,
  { src?: string | null; default?: string }
>({
  backgroundImage: props => `url(${props.src || props.default})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  transition: 'all 300ms linear',
  width: '34px',
  height: '34px',
  overflow: 'hidden',
  float: 'left',
  zIndex: 5,
  margin: '0 11px 0 23px',
  borderRadius: '50%',
  boxShadow: `0 10px 20px -12px rgba(0, 0, 0, 0.32),
    0 4px 15px 0px rgba(0, 0, 0, 0.1), 0 8px 5px -5px rgba(0, 0, 0, 0.2)`,
  position: 'relative',

  cursor: 'pointer',
  '::after': {
    content: '',
    textAlign: 'center',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    background: 'rgba(0, 0, 0, 0.3)',
    opacity: 0,
    visibility: 'hidden',
    backdropFilter: 'blur(0)',
    width: '100%',
    height: '100%',
    transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)'
  },
  '::before': {
    fontFamily: 'Font Awesome 5 Free',
    fontWeight: 900,
    content: '\f007',
    position: 'absolute',
    left: '50%',
    top: '50%',
    opacity: 0,
    zIndex: 2,
    transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
    transform: 'translate(-50%, -50%)'
  },
  ':hover::after': {
    opacity: 1,
    visibility: 'visible',
    backdropFilter: 'blur(1px)'
  },
  ':hover::before': {
    opacity: 1
  },

  input: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'red',
    zIndex: 100,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    opacity: 0
  }
});

export const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: '#333333'
  },
  drawerOpen: {
    width: drawerWidth,
    padding: '10px 15px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    backgroundColor: '#333333'
  },
  drawerClose: {
    padding: 10,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  listRoot: {
    width: '100%',
    maxWidth: 360
  },
  divider: {
    backgroundColor: '#717171'
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    color: '#fff',
    padding: '10px 0px',
    '& p': {
      margin: 0
    }
  }
}));
