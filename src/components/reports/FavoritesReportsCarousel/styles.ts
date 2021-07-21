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
    height: '100%',
    width: '100%',
    justifyContent: 'space-around',
    borderRadius: '23px'
  },
  carouselImage: {
    height: '500px',
    objectFit: 'cover',
    maxWidth: '100%',
    borderRadius: '20px',
    width: '100%',
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
