import MaterialCarousel from 'react-material-ui-carousel';
import Image from 'next/image';

import { makeStyles } from '@material-ui/core/styles';

//assets
import image1 from '@/assets/img/LANDING-01.webp';
import image2 from '@/assets/img/LANDING-02.webp';
import image3 from '@/assets/img/LANDING-03.webp';

const useStyles = makeStyles(theme => ({
  item: {
    width: '100%',
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundOrigin: 'content-box',
    boxShadow:
      '0px 100px 100px rgb(28, 26, 26, 0.8) inset, 0px -100px 100px rgb(28, 26, 26, 0.7) inset',
    [theme.breakpoints.down('sm')]: {
      backgroundSize: 'cover',
      height: '70vh'
    }
  },
  content: {
    position: 'absolute',
    color: 'white',
    fontSize: '25px',
    fontWeight: 400,
    padding: '40px',
    top: '85vh',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
      top: '60vh',
      padding: '20px'
    }
  },
  bgWrap: {
    position: 'relative',
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
    zIndex: -1
  }
}));

const items = [
  {
    image: image1,
    content: 'Chekeá cómo están tus marcas'
  },
  {
    image: image2,
    content: 'Chekeá cómo están tus tiendas'
  },
  { image: image3, content: 'Chekeá cómo trabaja tu equipo' }
];

export default function Carousel() {
  const props = {
    backgroundImage: 'url(../../../assets/img/LANDING-01.webp)'
  };

  const classes = useStyles(props);

  return (
    <MaterialCarousel
      timeout={1000}
      indicators={false}
      stopAutoPlayOnHover={false}
      navButtonsAlwaysInvisible
    >
      {items.map((item, i) => (
        <div key={i} className={classes.item}>
          <div className={classes.bgWrap}>
            <Image
              src={item.image}
              layout="fill"
              objectFit="cover"
              alt={item.content}
            />
          </div>
          {/* <img src={item.src} /> */}
          <p className={classes.content}>{item.content}</p>
        </div>
      ))}
    </MaterialCarousel>
  );
}
