import { primaryColor } from '@/utils/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  container: {
    //width: '100%',
    //marginTop: '-60px'
  },
  // card: {
  //   marginTop: '-60px'
  // },
  //filters
  filtersContainer: {
    marginTop: '10px'
  },
  card: {
    marginTop: '-60px',
    padding: '0'
  },
  //Images grid
  cardBody: {
    display: 'flex',
    flexDirection: 'column'
  },
  item: {
    marginBottom: '10px',
    height: '250px'
  },
  gridImages: {
    width: '100%',
    height: '250px'
  },
  pagination: {
    margin: 'auto',
    marginTop: '30px'
  },

  //images carousel
  carousel: {
    height: 'auto'
  },
  carouselImage: {
    width: 'auto',
    height: '400px',
    display: 'flex',
    margin: 'auto',
    borderRadius: '5px'
  },
  carouselDetail: {
    fontSize: '1.2rem'
  },
  carouselFooter: {
    display: 'flex',
    flexDirection: 'column'
  },
  carouselTitle: {
    fontWeight: 500
  },

  root: {
    width: '100%'
  },
  heading1: {
    //marginLeft: '15px',
    fontSize: '25px',
    color: primaryColor[0],
    fontWeight: 'lighter'
  },
  heading2: {
    marginLeft: '15px',
    fontSize: '20px',
    color: 'gray',
    fontWeight: 'lighter',
    flexBasis: '25%',
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
      padding: '10px',
      backgroundColor: 'primary'
    }
  },
  // column: {
  //   flexBasis: '33.33%',
  // },
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
