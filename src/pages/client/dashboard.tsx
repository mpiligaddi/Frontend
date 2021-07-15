import { useClient, useMe } from '@/api/user';
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
  titleName: {
    color: primaryColor[0],
    fontWeight: 'bold'
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
});

const Dashboard: Page = () => {
  const classes = useStyles();
  const user = useMe();
  const client = useClient();
  const { filters } = useFilters();
  const { chains } = useFilteredData(true);

  if (user.isLoading || user.isIdle) return <LinearProgress />;

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
          {client && (
            <FilterBar
              reported
              size={{
                xs: 10,
                md: 10,
                sm: 10
              }}
            />
          )}
        </GridItem>
        <GridItem xs={12} sm={8} md={8} lg={8}>
          {filters?.chain && filters?.branch?.name ? (
            <Accordion top disableAction revisable={false} type="revised" />
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
