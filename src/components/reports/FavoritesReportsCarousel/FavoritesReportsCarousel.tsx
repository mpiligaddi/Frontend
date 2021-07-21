import React, { FC, useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';

import { getImages, FilteredImage } from '@/utils/images';
import { useFilteredData } from '@/api/reports/filters/use-filtered-data';

import { useStyles } from './styles';

const FavoritesReportsCarousel: FC = () => {
  const classes = useStyles();
  const [images, setImages] = useState<FilteredImage[]>([]);
  const { reports } = useFilteredData({
    reported: true,
    revised: true
  });

  useEffect(() => {
    if (!reports.data) return;

    const images = getImages(reports.data.filter(report => report.revised));

    const favoritesImages = images.filter(image => image.favorite).slice(0, 6);

    setImages(favoritesImages);
  }, [reports.data]);

  return (
    <Carousel
      stopAutoPlayOnHover
      animation="fade"
      indicators={false}
      className={classes.carousel}
    >
      {images.map(image => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={classes.carouselImage}
          alt={image.id}
          key={image.id}
          src={image.url}
        />
      ))}
    </Carousel>
  );
};

export default FavoritesReportsCarousel;
