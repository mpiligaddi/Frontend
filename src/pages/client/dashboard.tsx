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
  titleName: {
    color: primaryColor[0],
    fontWeight: 'bold'
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  message: {
    fontSize: '16px'
  }
});

const Dashboard: Page = () => {
  const classes = useStyles();
  const user = useMe();
  const client = useClient();
  const { filters } = useFilters();
  const { chains } = useFilteredData({
    reported: true,
    revised: true
  });

  if (user.isLoading || user.isIdle) return <LinearProgress />;

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} lg={12}>
        <h3>
          <span className={classes.titleName}>{client.data?.name} </span>
          <span className={classes.message}>
            Bienvenido a sus reportes fotográficos
          </span>
        </h3>
      </GridItem>

      <GridItem xs={12} sm={12} md={12} lg={12}>
        {<>{chains.isLoading ? <LinearProgress /> : <FavoritesReports />}</>}
      </GridItem>

      <GridContainer className={classes.container}>
        <GridItem xs={12} sm={12} md={12} lg={12}>
          <br />
          <p>Aplique los filtros para ver imágenes específicas</p>
          {client && (
            <FilterBar
              revised
              reported
              size={{
                xs: 4,
                md: 4,
                sm: 4
              }}
            />
          )}
        </GridItem>
      </GridContainer>

      <GridItem xs={12} sm={12} md={12} lg={12}>
        {filters?.chain && filters?.branch?.name && (
          <Accordion disableAction revisable={false} type="revised" />
        )}
      </GridItem>
    </GridContainer>
  );
};

// eslint-disable-next-line react/display-name
Dashboard.getLayout = page => <ClientLayout>{page}</ClientLayout>;

export default Dashboard;
