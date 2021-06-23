import React, { useState, FC } from 'react';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteTile from './DeleteTile';
import Image from 'next/image';

import firebase from 'firebase/app';
import { useAdminFilters } from '@/api/reports/filters';
import { useCarousel } from '../Carousel/CarouselProvider';

import { useStyles } from './styles';

type TileProps = {
  tile: any;
  report: any;
  catIndex: number;
  disableAction?: boolean;
};

const Tile: FC<TileProps> = ({
  tile,
  report,
  catIndex,
  disableAction = false
}) => {
  const classes = useStyles();
  const [favorite, setFavorite] = useState(tile.favorite ?? false);
  const [openModal, setOpenModal] = useState(false);
  const { setReportsXClient } = useAdminFilters();

  const { setCarouselInfo } = useCarousel();

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const categories = report.realCategories.map((category: any) => {
      if (!category.images) return category;

      const images = category.images.map((image: any) =>
        image.name === tile.name
          ? {
              ...image,
              favorite: !favorite
            }
          : image
      );

      return {
        ...category,
        images
      };
    });

    await firebase.firestore().collection('reports').doc(report.id).update({
      categories
    });

    setReportsXClient((reports: any) =>
      reports.map((r: any) => (r.id === report.id ? { ...r, categories } : r))
    );

    setFavorite(!favorite);
  };

  const deleteTile = async (reason: string) => {
    await firebase
      .storage()
      .refFromURL(tile.uri)
      .delete()
      .catch(() => console.log('La imagen no existe'));

    const categories = report.realCategories.map((category: any) => {
      if (!category.images) return category;
      const images = category.images.map((image: any) =>
        image.name === tile.name ? { ...image, isDeleted: true, reason } : image
      );

      return {
        ...category,
        images
      };
    }, []);

    await firebase.firestore().collection('reports').doc(report.id).update({
      categories
    });

    setReportsXClient((reports: any) =>
      reports.map((r: any) => (r.id === report.id ? { ...r, categories } : r))
    );

    setOpenModal(false);
  };

  return (
    <div
      onClick={() =>
        setCarouselInfo({
          report,
          tileInfo: { tile, catIndex }
        })
      }
      className={classes.container}
    >
      <DeleteTile
        onClose={() => setOpenModal(false)}
        isOpen={openModal}
        onDelete={deleteTile}
      />
      <div className={classes.photo}>
        <Image
          src={tile.uri}
          width="200"
          height="300"
          objectFit="cover"
          alt={tile.name}
        />
      </div>

      <GridListTileBar
        titlePosition="bottom"
        classes={{ root: classes.titleBar, title: classes.title }}
        actionIcon={
          !disableAction && (
            <>
              <IconButton
                onClick={handleFavorite}
                className={classes.title}
                value={tile.uri}
              >
                <Icon>{favorite ? 'star' : 'star_border'}</Icon>
              </IconButton>
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  setOpenModal(true);
                }}
                className={classes.title}
                value={tile.uri}
              >
                <Icon>delete</Icon>
              </IconButton>
            </>
          )
        }
      />
    </div>
  );
};

export default Tile;
