import { useCallback, useEffect, useState } from 'react';
import { useClient, useMe } from '@/hooks/api';
import { Page } from '@/typings/page';
import { useBranches, useOFC, useFilteredData } from '@/hooks/api';
import { useFilters } from '@/context/filters';
import { ClientLayout } from '@/components/common/';
import { makeStyles } from '@material-ui/core/styles';
import { FavoritesReports } from '@/components/reports';

import { GridItem, GridContainer, CardData } from '@/components/ui';

import { Accordion, FilterBar } from '@/components/reports';

import { primaryColor } from '@/utils/styles';
import { LinearProgress } from '@/components/ui';

import shop from '@/assets/img/icon-shop.png';
import visits from '@/assets/img/icon-visits.png';
import alert from '@/assets/img/icon-alert.png';
import { ensureAuth } from '@/lib/auth';

const useStyles = makeStyles({
  container: {
    margin: '10px'
  },
  title: {
    marginTop: '10px'
  },
  titleName: {
    color: primaryColor[0],
    fontWeight: 'bold'
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  cards: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    fontSize: '16px'
  }
});

const Dashboard: Page = () => {
  const classes = useStyles();
  const user = useMe();
  const client = useClient();
  const { filters, reports } = useFilters();
  const [OFCPercent, setOFCPercent] = useState(0);
  const branches = useBranches({
    clientId: filters?.client?.id!
  });
  const { chains, categories } = useFilteredData({
    reported: true,
    revised: true
  });
  const ofc = useOFC({
    branches: branches.data!,
    categories: categories.data,
    reports: reports.data
  });

  const getOfcPercent = useCallback(() => {
    if (!ofc.data) return;
    const pending = ofc.data.filter(ofc => !ofc.done);

    setOFCPercent(100 - Math.trunc((pending?.length * 100) / ofc.data.length));
  }, [ofc.data]);

  useEffect(() => {
    getOfcPercent();
  }, [ofc.data, getOfcPercent]);

  if (user.isLoading || user.isIdle) return <LinearProgress />;

  return (
    <GridContainer className={classes.cards}>
      <GridItem className={classes.title} xs={12} sm={12} md={12} lg={12}>
        <h3>
          <span className={classes.titleName}>{user.data?.name} </span>
          <span className={classes.message}>
            Bienvenido a sus reportes fotográficos
          </span>
        </h3>
      </GridItem>

      <GridItem xs={12} sm={4} md={3} lg={3}>
        <CardData
          image={shop}
          title="Tiendas Contratadas"
          openable={false}
          content={branches.data?.length}
        />
      </GridItem>
      <GridItem xs={12} sm={4} md={3} lg={3}>
        <CardData
          image={visits}
          title="Tiendas Reportadas"
          openable={false}
          content={new Set(reports.data?.map(report => report.branchId)).size}
        />
      </GridItem>
      <GridItem xs={12} sm={4} md={3} lg={3}>
        <CardData
          image={alert}
          contentColor="red"
          openable={false}
          title="Cumplimiento"
          content={`${OFCPercent}%`}
        />
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

Dashboard.Layout = ClientLayout;

export const getServerSideProps = ensureAuth('client');

export default Dashboard;
