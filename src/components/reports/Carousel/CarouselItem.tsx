import { useState, FC } from 'react';
import { useAdminFilters } from '@/api/reports/filters';
import { styled } from '@material-ui/core';
import firebase from 'firebase/app';
import DeleteTile from '../Tile/DeleteTile';
import { useCarousel } from './CarouselProvider';

const CarouselContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  minWidth: '100%',
  height: '100%'
});

const CarouselImage = styled('div')<unknown, { img: string }>({
  backgroundImage: props => `url(${props.img})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  width: 'calc(110vw * 9 / 16)',
  height: 'calc(110vh - 17rem)',
  margin: '20px auto',
  borderRadius: '8px'
});

const CarouselId = styled('p')({
  textAlign: 'center',
  margin: '5px auto',
  fontWeight: 'bold',
  fontSize: '16px'
});

const CarouselCategory = styled(CarouselId)({
  fontSize: '14px'
});

const CarouselActions = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  margin: '20px auto'
});

const CarouselAction = styled('a')({
  position: 'relative',
  zIndex: 20,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto 15px',
  cursor: 'pointer',
  color: 'white',
  textDecoration: 'none',
  opacity: 0.6,

  i: {
    marginRight: '5px'
  },

  ':hover': {
    opacity: 1,
    color: 'white'
  }
});

type CarouselItemProps = {
  tile: any;
  toggleEdit(): void;
};

const CarouselItem: FC<CarouselItemProps> = ({ tile, toggleEdit }) => {
  const [openModal, setOpenModal] = useState(false);
  const [favorite, setFavorite] = useState(tile.favorite ?? false);
  const { report, disableAction } = useCarousel();
  const { setReportsXClient, branch } = useAdminFilters();

  const handleFavorite = async () => {
    const categories = report.realCategories!.map(category => {
      if (!category.images) return category;

      const images = category.images.map(image =>
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

    setReportsXClient(reports =>
      reports.map(r => (r.id === report.id ? { ...r, categories } : r))
    );

    setFavorite(!favorite);
  };

  const handleDelete = async (reason: string) => {
    await firebase
      .storage()
      .refFromURL(tile.uri)
      .delete()
      .catch(() => console.log('La imagen no existe'));

    const categories = report.realCategories!.map(category => {
      if (!category.images) return category;
      const images = category.images.map(image =>
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

    setReportsXClient(reports =>
      reports.map(r => (r.id === report.id ? { ...r, categories } : r))
    );

    //if (closeCarousel) closeCarousel({ data: {}, pictureId: "", actions: [] });

    setOpenModal(false);
  };

  return (
    <CarouselContainer>
      <DeleteTile
        onClose={() => setOpenModal(false)}
        isOpen={openModal}
        onDelete={handleDelete}
      />
      <CarouselImage img={tile.uri} />

      <CarouselId>{tile.comment}</CarouselId>
      <CarouselId>
        {branch.chainName} - {branch.name}
      </CarouselId>
      <CarouselCategory>
        Exhibición {tile.type == 'primary' ? 'Primaria' : 'Secundaria'}
      </CarouselCategory>
      <CarouselActions>
        <CarouselAction href={tile.uri} target="_blank">
          <i className="fas fa-external-link-alt"></i>Abrir en una nueva pestaña
        </CarouselAction>
        {!disableAction && (
          <>
            <CarouselAction onClick={handleFavorite}>
              {favorite ? (
                <>
                  <i className="fas fa-star"></i>Desmarcar como destacada
                </>
              ) : (
                <>
                  <i className="far fa-star"></i>Marcar como destacada
                </>
              )}
            </CarouselAction>
            <CarouselAction onClick={() => setOpenModal(true)}>
              <i className="fas fa-times"></i>Eliminar
            </CarouselAction>
            <CarouselAction onClick={toggleEdit}>
              <i className="fas fa-edit"></i>Editar Imagen
            </CarouselAction>
          </>
        )}
      </CarouselActions>
    </CarouselContainer>
  );
};

export default CarouselItem;
