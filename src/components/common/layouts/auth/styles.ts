import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      flexDirection: 'column'
    }
  },
  carousel: {
    width: '65%',
    [theme.breakpoints.down('sm')]: {
      width: '100vw'
    }
  },
  login: {
    width: '35%',
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
      width: '100vw'
    }
  },
  logo: {
    position: 'absolute',
    zIndex: 9,
    [theme.breakpoints.down('sm')]: {
      transform: 'scale(1)'
    }
  }
}));
