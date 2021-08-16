/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, FC, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useCarousel } from './CarouselProvider';
import { useFilters } from '@/context/filters';
import cn from 'classnames';
import Image from 'next/image';
import MultiCarousel from 'react-multi-carousel';
import { getImages } from '@/utils/images';
import { useAddFavorite, useDeleteTile } from '@/hooks/api';
import DeleteTile from '../Tile/DeleteTile';
import {
  Close,
  ArrowForwardIos,
  ArrowBackIos,
  StarBorderOutlined,
  Star,
  Delete
} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import dayjs from 'dayjs';
import { primaryColor } from '@/utils/styles';
import { Report } from '@/lib/types';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'fixed',
    left: 0,
    top: 0,
    overflow: 'hidden',
    right: 0,
    width: '100vw',
    zIndex: 1000,
    height: '100vh',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&::before': {
      zIndex: 900,
      content: '""',
      position: 'fixed',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000',
      opacity: '0.5'
    }
  },
  modal: {
    backgroundColor: 'rgb(249, 250, 251)',
    width: '80%',
    position: 'relative',
    zIndex: 2000,
    height: '95%',
    boxShadow: `0px 7.76336px 32.3056px rgba(0, 0, 0, 0.035), 0px 4.12306px 17.1573px rgba(0, 0, 0, 0.0282725), 0px 1.7157px 7.13952px rgba(0, 0, 0, 0.0196802)`,
    [theme.breakpoints.down('md')]: {
      width: '90%'
    }
  },
  body: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75%'
  },
  info: {
    padding: '10px 15px',
    height: '90%',
    width: '30%',
    borderLeft: '1px solid #ccc'
  },
  imageContainer: {
    position: 'relative',
    padding: '10px',
    width: '100%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    inset: 0,
    margin: '10px',
    maxWidth: '100% * 3/4',
    height: '100%',
    boxShadow: `0px 7.76336px 32.3056px rgba(0, 0, 0, 0.035), 0px 4.12306px 17.1573px rgba(0, 0, 0, 0.0282725), 0px 1.7157px 7.13952px rgba(0, 0, 0, 0.0196802)`,

    '& div': {
      position: 'static !important',
      height: '100% !important',
      maxWidth: '100% * 3/4 !important',

      '& img': {
        width: '100% !important',
        position: 'static !important',
        height: '100% !important',
        maxWidth: '100% !important'
      }
    }
  },
  footer: {
    padding: '10px',
    height: '25%',
    backgroundColor: 'rgb(229, 231, 235)'
  },
  multiCarousel: {
    height: '100%',
    width: '100%'
  },
  slider: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 3000
  },
  itemCarousel: {
    height: '100%',
    userSelect: 'none',
    marginRight: '10px'
  },
  imageCarousel: {
    cursor: 'pointer',
    width: '100%',
    boxShadow: `0px 7.76336px 32.3056px rgba(0, 0, 0, 0.035), 0px 4.12306px 17.1573px rgba(199, 22, 22, 0.028), 0px 1.7157px 7.13952px rgba(0, 0, 0, 0.0196802)`,
    objectFit: 'cover',
    height: '100%',

    userSelect: 'none'
  },
  nonSelectedImage: {
    opacity: 0.5
  },
  back: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    margin: 'auto 0',
    height: '50px'
  },
  forward: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto 0',
    height: '50px'
  },
  data: {
    color: primaryColor[0]
  }
}));

type CarouselProps = {
  close(): void;
};

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const Carousel: FC<CarouselProps> = ({ close }) => {
  const classes = useStyles();
  const { tile, report, setCarouselInfo, disableAction } = useCarousel();
  const [favorite, setFavorite] = useState(tile.favorite || false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const images = useMemo(() => getImages([report]), [report]);
  const carouselRef = useRef<MultiCarousel>(null);
  const { filters } = useFilters();
  const addFavorite = useAddFavorite();
  const deleteTile = useDeleteTile();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    setFavorite(tile.favorite || false);
  }, [tile]);

  const changeImage = (image: any, newReport?: Report) => {
    setCarouselInfo({
      report: newReport || report,
      tile: {
        comment: image.label,
        name: image.url,
        type: '',
        uri: image.url,
        favorite: image.favorite,
        delete: image.delete,
        deleteReason: '',
        revised: image.revised,
        id: image.id,
        photoReportId: ''
      }
    });
  };

  const nextImage = (newReport?: Report) => {
    const index = images.findIndex(image => image.id === tile.id);

    if (images.length === index + 1) {
      changeImage(images[0], newReport);
      carouselRef.current?.next(1);

      return;
    }

    changeImage(images[index + 1], newReport);
    carouselRef.current?.next(1);
  };

  const backImage = () => {
    const index = images.findIndex(image => image.id === tile.id);

    if (index === 0) {
      changeImage(images[images.length - 1]);
      carouselRef.current?.previous(1);
      return;
    }

    changeImage(images[index - 1]);
    carouselRef.current?.previous(1);
  };

  const handleFavorite = async () => {
    await addFavorite.mutateAsync({
      imageId: tile.id,
      favorite: !favorite
    });

    setFavorite(!favorite);
  };

  const handleDelete = async (reason: string) => {
    await deleteTile.mutateAsync({
      reason,
      imageId: tile.id
    });

    close();
  };

  return (
    <div className={classes.container}>
      <DeleteTile
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        onDelete={handleDelete}
      />
      <div className={classes.modal}>
        <IconButton
          aria-label="Cerrar"
          className={classes.close}
          onClick={close}
        >
          <Close />
        </IconButton>

        <div className={classes.body}>
          <div className={classes.imageContainer}>
            {/* <img
              src={`http://e.undervolt.io:3000/assets/${report.creatorId}/${report.id}/${tile.name}`}
              alt={tile.name}
              className={classes.image}
            /> */}
            <div className={classes.image}>
              <Image
                layout="fill"
                src={`http://e.undervolt.io:3000/assets/${report.creatorId}/${report.id}/${tile.name}`}
                alt={tile.name}
              />
            </div>
            {!disableAction && (
              <div>
                <IconButton
                  aria-label={
                    favorite
                      ? 'Desmarcar como Favorito'
                      : 'Marcar como Favorito'
                  }
                  onClick={handleFavorite}
                >
                  {favorite ? <Star /> : <StarBorderOutlined />}
                </IconButton>
                <IconButton
                  onClick={() => setIsOpenDelete(true)}
                  aria-label="Borrar Imagen"
                >
                  <Delete />
                </IconButton>
              </div>
            )}
            {images.length > 1 && (
              <>
                <IconButton
                  onClick={backImage}
                  aria-label="Imagen Anterior"
                  className={classes.back}
                >
                  <ArrowBackIos />
                </IconButton>

                <IconButton
                  onClick={() => nextImage()}
                  aria-label="Imagen Siguiente"
                  className={classes.forward}
                >
                  <ArrowForwardIos />
                </IconButton>
              </>
            )}
          </div>

          <div className={classes.info}>
            <p>
              Fecha:{' '}
              <span className={classes.data}>
                {dayjs(report.createdAt).format('DD-MM-YYYY')}
              </span>
            </p>
            <p>
              Cliente:{' '}
              <span className={classes.data}>{filters?.client?.name}</span>
            </p>
            <p>
              Cadena:{' '}
              <span className={classes.data}>{filters?.chain?.name}</span>
            </p>
            <p>
              Sucursal:{' '}
              <span className={classes.data}>{filters?.branch?.name}</span>
            </p>
            <p>
              Categoria:{' '}
              <span className={classes.data}>
                {images.find(image => tile.id === image.id)?.categoryName}
              </span>
            </p>

            <p>
              {tile.comment ? `Comentario: ${tile.comment}` : 'Sin Comentario'}
            </p>
          </div>
        </div>
        <div className={classes.footer}>
          <MultiCarousel
            swipeable
            centerMode
            autoPlay={false}
            sliderClass={classes.slider}
            className={classes.multiCarousel}
            infinite
            responsive={responsive}
            ref={carouselRef}
            containerClass={classes.multiCarousel}
            showDots={false}
            itemClass={classes.itemCarousel}
          >
            {images.map(image => (
              <div
                key={image.id}
                className={cn(classes.imageCarousel, {
                  [classes.nonSelectedImage]: tile.id !== image.id
                })}
              >
                <Image
                  onClick={() => changeImage(image)}
                  draggable="false"
                  objectFit="cover"
                  src={`http://e.undervolt.io:3000/assets/${report.creatorId}/${report.id}/${image.url}`}
                  layout="fill"
                  alt={image.label}
                />
              </div>
            ))}
          </MultiCarousel>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
