import { useState, useEffect } from 'react';
import { useClient } from '@/api/user';
import { Page } from '@/typings/page';
import { useClientsFilters } from '@/api/reports/filters';
import Carousel from 'react-material-ui-carousel';
// @material-ui/core components
import { ClientLayout } from '@/components/common/';
import { makeStyles } from '@material-ui/core/styles';
// core components
import {
  Card,
  GridItem,
  CardBody,
  CardFooter,
  GridContainer
} from '@/components/ui';
import { format } from 'date-fns';

import { Accordion, FilterBar } from '@/components/reports';

import { primaryColor } from '@/utils/styles';
import { LinearProgress } from '@/components/ui';
import { ReportCategory } from '@/lib/types';

const useStyles = makeStyles({
  container: {
    margin: '10px'
  },
  card: {
    marginTop: '-60px'
  },

  //filters
  filtersContainer: {
    marginTop: '10px'
  },
  //Images grid
  cardBody: {
    display: 'flex',
    flexDirection: 'column'
    //width: '100%'
  },
  item: {
    marginBottom: '10px',
    height: '100px'
  },
  gridImages: {
    width: '20%',
    height: '100px'
  },
  pagination: {
    margin: 'auto',
    marginTop: '30px'
  },

  //images carousel
  carousel: {
    height: '400px',
    justifyContent: 'space-around'
  },
  titleName: {
    color: primaryColor[0],
    fontWeight: 'bold'
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
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden'
    //justifyContent: 'flex-end'
  },
  gridList: {
    width: '85%',
    display: 'flex',
    //height: '5%',
    //justifyContent: 'center',
    paddingTop: '30px',
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    cursor: 'pointer'
  },
  gridList2: {
    width: '80%',
    display: 'flex',
    paddingTop: '20px',
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    cursor: 'pointer'
    //justifyContent: 'flex-end',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  title: {
    color: 'rgba(255, 255, 255, 0.54)',
    padding: 5
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10%'
  },
  paper: {
    backgroundColor: 'white',
    border: '2px solid black',
    boxShadow: '0 3px 7px rgba(0, 0, 0, 0.3)',
    padding: '5%'
  },
  dialog: {
    height: '90vh',
    width: '600px'
  },
  backdrop: {
    color: '#fff'
  }
});

const Dashboard: Page = () => {
  const classes = useStyles();
  const [activeImage, setActiveImage] = useState({});
  const { name, client } = useClient();
  const [images, setImages] = useState([]);
  const {
    chain,
    branchesXClient,
    chains,
    getReportsxClient,
    reportsXClient,
    branch
  } = useClientsFilters();

  useEffect(() => {
    getReportsxClient();
  }, [client]);

  useEffect(() => {
    if (!reportsXClient) return;

    const images = reportsXClient.reduce((acc, report) => {
      const cats = report.categories.filter(category =>
        Array.isArray(category.images)
      );
      const images = cats.reduce((acc, cat) => {
        const images = cat.images.reduce((images, image) => {
          if (image.isDeleted) return images;

          return [
            ...images,
            {
              id: image.name,
              revised: image.revised ?? false,
              url: image.uri,
              favorite: image.favorite ?? false,
              report,
              isDeleted: image.isDeleted ?? false,
              label: image.comment,
              categoryName: cat.name
            }
          ];
        }, []);

        return [...acc, ...images];
      }, []);
      return [...acc, ...images];
    }, []);

    console.log(images);

    const favoritesImages = images.filter(image => image.favorite).slice(0, 6);

    console.log(favoritesImages);

    setImages(favoritesImages);
  }, [reportsXClient]);

  const onChangeImage = (index: number) => {
    const image = images[index] as ReportCategory;

    if (!image) return;

    const activeImage = {
      date: format(image.report.createdAt.toDate(), 'dd/mm/yy'),
      category: image.categoryName,
      branch: branchesXClient.find(
        branch => branch.ID === image.report.branchId
      ),
      chain: chains.find(chain => chain.ID === image.report.chainId)
    };

    setActiveImage(activeImage);
  };

  useEffect(() => {
    if (images.length > 0 && branchesXClient.length > 0 && chains.length > 0) {
      onChangeImage(0);
    }
  }, [branchesXClient, chains, images]);

  return (
    <div>
      <GridContainer>
        <GridItem
          xs={12}
          sm={4}
          md={4}
          lg={4}
          className={classes.filtersContainer}
        >
          <h3 className={classes.titleName}>{name}</h3>
          <h4>Bienvenido a sus reportes fotográficos</h4>
        </GridItem>

        <GridContainer className={classes.container}>
          <GridItem
            xs={12}
            sm={4}
            md={4}
            lg={4}
            className={classes.filtersContainer}
          >
            <br />
            <p>Aplique los filtros para ver imágenes específicas</p>
            {client && <FilterBar />}
          </GridItem>
          {/* <GridItem md={1} lg={1}>
      </GridItem> */}
          <GridItem xs={12} sm={8} md={8} lg={8}>
            {chain && branch.name ? (
              <Accordion type="all" />
            ) : (
              <>
                {branchesXClient.length === 0 || chains.length === 0 ? (
                  <LinearProgress />
                ) : (
                  <>
                    <Card className={classes.card}>
                      <CardBody className={classes.cardBody}>
                        <Carousel
                          stopAutoPlayOnHover
                          animation="fade"
                          onChange={onChangeImage}
                          className={classes.carousel}
                        >
                          {images.map(image => (
                            <img
                              key={image.name}
                              src={image.url}
                              className={classes.carouselImage}
                            />
                          ))}
                        </Carousel>
                      </CardBody>
                      <CardFooter stats className={classes.carouselFooter}>
                        <h3 className={classes.carouselTitle}>
                          Fotografías destacadas
                        </h3>
                        <p className={classes.carouselDetail}>
                          {activeImage.date && (
                            <p>
                              {activeImage.date} - {activeImage.chain?.name} -{' '}
                              {activeImage.branch?.name} -{' '}
                              {activeImage.category}
                            </p>
                          )}
                        </p>
                      </CardFooter>
                    </Card>
                  </>
                )}
              </>
            )}
          </GridItem>
        </GridContainer>
      </GridContainer>
    </div>
  );
};

Dashboard.Layout = ClientLayout;

export default Dashboard;
