import React, { useState, FC, useEffect } from 'react';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteTile from './DeleteTile';
import Image from 'next/image';

import { Image as IImage, Report } from '@/lib/types';
import { useAddFavorite, useDeleteTile } from '@/api/reports';
import { useCarousel } from '../Carousel/CarouselProvider';

import { useStyles } from './styles';

type TileProps = {
  tile: IImage;
  report: Report;
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
  const { mutateAsync: addFavorite } = useAddFavorite();
  const { mutateAsync: deleteTile } = useDeleteTile();

  const { setCarouselInfo } = useCarousel();

  useEffect(() => {
    setFavorite(tile.favorite ?? false);
  }, [tile.favorite]);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await addFavorite({
      report,
      favorite,
      tile
    });
  };

  const onDeleteTile = async (reason: string) => {
    await deleteTile({
      report,
      tile,
      reason
    });

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
        onDelete={onDeleteTile}
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
