import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  titleBar: {
    position: 'absolute',
    bottom: 0,
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  title: {
    color: 'rgba(255, 255, 255, 0.54)',
    padding: 5
  },
  photo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    //transform: 'rotate(-90deg)',
    transition: '100ms ease',
    transitionProperty: 'transform box-shadow',
    '&:hover': {
      opacity: '0.5'
    },
    objectFit: 'cover',
    maxWidth: '100%',
    minWidth: '100%',
    '& div': {
      minWidth: '100% !important'
    }
  },
  container: {
    cursor: 'pointer',
    position: 'relative',
    maxHeight: '100%',
    marginRight: 15
  }
});
