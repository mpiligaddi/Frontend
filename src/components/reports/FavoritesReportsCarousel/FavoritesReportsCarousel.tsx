import React, { FC, useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';

import { getImages, FilteredImage } from '@/utils/images';
import { useFilteredData } from '@/hooks/api';
import Image from 'next/image';

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
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      className={classes.carousel}
    >
      {images.map(image => (
        <div className={classes.carouselImage} key={image.id}>
          <Image
            objectFit="cover"
            alt={image.id}
            layout="fill"
            src={`http://e.undervolt.io:3000/assets/${image.report.creatorId}/${image.report.id}/${image.url}`}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default FavoritesReportsCarousel;
