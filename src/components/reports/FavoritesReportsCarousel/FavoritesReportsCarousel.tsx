import React, { FC, useState, useEffect, useCallback } from 'react';
import Carousel from 'react-material-ui-carousel';
import { format } from 'date-fns';

import { Branch, Chain } from '@/lib/types';
import { getImages, FilteredImage } from '@/utils/images';
import { useClientsFilters } from '@/api/reports/filters/query';
import branches from '@/data/branches';

import { Card, CardBody, CardFooter } from '@/components/ui';
import { useStyles } from './styles';

interface ActiveImage {
  date: string;
  category: string;
  chain?: Chain;
  branch?: Branch;
}

const FavoritesReportsCarousel: FC = () => {
  const classes = useStyles();
  const [images, setImages] = useState<FilteredImage[]>([]);
  const [activeImage, setActiveImage] = useState<ActiveImage>();
  const { reports, chains } = useClientsFilters();

  useEffect(() => {
    if (!reports.data) return;

    const images = getImages(reports.data);

    const favoritesImages = images.filter(image => image.favorite).slice(0, 6);

    setImages(favoritesImages);
  }, [reports.data]);

  const onChangeImage = useCallback(
    (index: number) => {
      const image = images[index];

      if (!image) return;

      setActiveImage({
        date: format(image.report.createdAt.toDate(), 'dd/mm/yy'),
        category: image.categoryName,
        branch: branches.find(branch => branch.ID === image.report.branchId),
        chain: chains.data?.find(chain => chain.ID === image.report.chainId)
      });
    },
    [images, chains.data]
  );

  useEffect(() => {
    if (images.length > 0 && branches.length > 0 && chains.data?.length! > 0) {
      onChangeImage(0);
    }
  }, [chains.data, images, onChangeImage]);

  return (
    <Card className={classes.card}>
      <CardBody className={classes.cardBody}>
        <Carousel
          stopAutoPlayOnHover
          animation="fade"
          onChange={onChangeImage}
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
      </CardBody>
      <CardFooter stats className={classes.carouselFooter}>
        <h3 className={classes.carouselTitle}>Fotografías destacadas</h3>
        <p className={classes.carouselDetail}>
          {activeImage?.date && (
            <>
              {activeImage.date} - {activeImage.chain?.name} -{' '}
              {activeImage.branch?.name} - {activeImage.category}
            </>
          )}
        </p>
      </CardFooter>
    </Card>
  );
};

export default FavoritesReportsCarousel;
