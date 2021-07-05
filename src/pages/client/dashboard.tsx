import { useClient } from '@/api/user';
import { Page } from '@/typings/page';
import { useFilters, useFilteredData } from '@/api/reports/filters';
import { ClientLayout } from '@/components/common/';
import { makeStyles } from '@material-ui/core/styles';
import { FavoritesReports } from '@/components/reports';

import { GridItem, GridContainer } from '@/components/ui';

import { Accordion, FilterBar } from '@/components/reports';

import { primaryColor } from '@/utils/styles';
import { LinearProgress } from '@/components/ui';

const useStyles = makeStyles({
  container: {
    margin: '10px'
  },

  filtersContainer: {
    marginTop: '10px'
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

  titleName: {
    color: primaryColor[0],
    fontWeight: 'bold'
  },

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden'
  },
  gridList: {
    width: '85%',
    display: 'flex',
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
  const client = useClient();
  const { filters } = useFilters();
  const { chains } = useFilteredData(true);

  if ((client.isLoading, client.isIdle)) return <LinearProgress />;

  return (
    <GridContainer>
      <GridItem
        xs={12}
        sm={4}
        md={4}
        lg={4}
        className={classes.filtersContainer}
      >
        <h3 className={classes.titleName}>{client.data?.name}</h3>
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
          {client && <FilterBar reported />}
        </GridItem>
        <GridItem xs={12} sm={8} md={8} lg={8}>
          {filters?.chain && filters?.branch?.name ? (
            <Accordion type="revised" />
          ) : (
            <>{chains.isLoading ? <LinearProgress /> : <FavoritesReports />}</>
          )}
        </GridItem>
      </GridContainer>
    </GridContainer>
  );
};

Dashboard.Layout = ClientLayout;

export default Dashboard;
