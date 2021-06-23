import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexDirection: 'column'
  },
  heading1: {
    marginLeft: '15px',
    fontSize: '25px',
    color: 'gray',
    fontWeight: 'lighter'
  },
  heading2: {
    marginLeft: '15px',
    fontSize: '20px',
    color: 'gray',
    fontWeight: 'lighter',
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: '15px',
    color: 'gray'
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20
  },
  details: {
    alignItems: 'center',
    padding: '20px',
    '&:hover': {
      backgroundColor: 'primary'
    }
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}));
