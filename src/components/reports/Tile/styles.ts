import { makeStyles } from '@material-ui/core';

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
    //transform: 'rotate(-90deg)',
    transition: '100ms ease',
    transitionProperty: 'transform box-shadow',
    '&:hover': {
      opacity: '0.5'
    },
    objectFit: 'cover',
    maxWidth: '100%'
  },
  container: {
    position: 'relative',
    maxHeight: '100%'
  }
});
