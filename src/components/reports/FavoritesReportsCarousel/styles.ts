import { makeStyles } from '@material-ui/core/styles';
import { primaryColor } from '@/utils/styles';

export const useStyles = makeStyles(theme => ({
  card: {
    marginTop: '-60px'
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column'
  },
  carousel: {
    height: '400px',
    justifyContent: 'space-around'
  },
  carouselImage: {
    transform: 'rotate(-90deg) scale(1.4)',
    width: 280,
    height: 'auto',
    display: 'flex',
    margin: 'auto',
    marginTop: '-30px'
    //borderRadius: '5px'
  },
  carouselDetail: {
    fontSize: '1rem',
    color: primaryColor[0]
  },
  carouselFooter: {
    display: 'flex',
    flexDirection: 'column'
  },
  carouselTitle: {
    marginTop: 5,
    fontWeight: 400,
    display: 'flex',
    color: 'gray'
  }
}));
