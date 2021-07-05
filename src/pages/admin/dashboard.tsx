import { useState, useEffect, useCallback } from 'react';
import { AdminLayout } from '@/components/common';
import { FilterBar } from '@/components/reports';
import { GridContainer, GridItem, CardData } from '@/components/ui';
import { useMe } from '@/api/user';
import { useFilters, useFilteredData } from '@/api/reports/filters';
import { useBranches } from '@/api/data';

import shop from '@/assets/img/icon-shop.png';
import visits from '@/assets/img/icon-visits.png';
import camera from '@/assets/img/icon-camera.png';
import alert from '@/assets/img/icon-alert.png';

import { Page } from '@/typings';

const AdminDashboard: Page = () => {
  const user = useMe();
  const { filters, filteredReports } = useFilters();
  const { chains, branches, reports, ofc } = useFilteredData();
  const { data: allBranches } = useBranches({
    clientId: +filters?.client?.ID!
  });
  const [OFCPercent, setOFCPercent] = useState(0);

  const getOfcPercent = useCallback(() => {
    if (!ofc.data) return;
    const pending = ofc.data.filter(ofc => !ofc.done);

    setOFCPercent(100 - Math.trunc((pending?.length * 100) / ofc.data.length));
  }, [ofc.data]);

  useEffect(() => {
    getOfcPercent();
  }, [ofc.data, getOfcPercent]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={6} md={6}>
        <h3>{`¡Hola ${user.data?.displayName}!`}</h3>
        <h5>Filtrá las opciones para conocer el estado de tus cuentas:</h5>
      </GridItem>
      <GridItem xs={12} sm={6} md={6}>
        <FilterBar
          allChains
          horizontal
          client
          category={false}
          branch={false}
        />
      </GridItem>

      <GridItem xs={12} sm={6} md={6} lg={3}>
        <CardData
          image={shop}
          title="Tiendas Contratadas"
          content={branches.data?.length}
          sub={filters?.chain && allBranches?.length}
        />
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <CardData image={camera} title="OFC" content={ofc.data?.length} />
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <CardData
          image={visits}
          title="Tiendas con Fotos"
          content={
            filters?.chain ? filteredReports.length : reports.data?.length
          }
          sub={filters?.chain ? branches.data?.length : allBranches?.length}
        />
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <CardData
          image={alert}
          contentColor="red"
          title="Cumplimiento OFC"
          content={`${OFCPercent}%`}
        />
      </GridItem>
    </GridContainer>
  );
};

AdminDashboard.Layout = AdminLayout;

export default AdminDashboard;
