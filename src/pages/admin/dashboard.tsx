import { useState, useEffect, useCallback } from 'react';
import { AdminLayout } from '@/components/common';
import { FilterBar } from '@/components/reports';
import { GridContainer, GridItem, CardData } from '@/components/ui';
import { useMe, useFilteredData, useBranches, useOFC } from '@/hooks/api';
import { useFilters } from '@/context/filters';
import dynamic from 'next/dynamic';

import shop from '@/assets/img/icon-shop.png';
import visits from '@/assets/img/icon-visits.png';
import camera from '@/assets/img/icon-camera.png';
import alert from '@/assets/img/icon-alert.png';

import { Page } from '@/typings';

const dynamicProps = {
  loading: () => <div>Cargando...</div>
};

const ChainsDetail = dynamic(
  import('@/components/data/details/ChainsDetail'),
  dynamicProps
);

const PhotosDetail = dynamic(
  import('@/components/data/details/PhotosDetail'),
  dynamicProps
);

const StoresDetail = dynamic(
  import('@/components/data/details/StoresDetail'),
  dynamicProps
);

const ComplianceDetail = dynamic(
  import('@/components/data/details/ComplianceDetail'),
  dynamicProps
);

const AdminDashboard: Page = () => {
  const user = useMe();
  const { filters, filteredReports } = useFilters();
  const { reports, categories } = useFilteredData({
    reported: true,
    enabled: { chains: false, ofc: false, branches: false }
  });
  const { data: allBranches } = useBranches({
    clientId: +filters?.client?.ID!
  });
  const branches = useBranches({
    chain: filters?.chain?.ID,
    clientId: +filters?.client?.ID!
  });
  const ofc = useOFC({
    categories: categories.data,
    branches: branches.data,
    reports: reports.data
  });

  const [OFCPercent, setOFCPercent] = useState(0);
  const [chainsOpen, setChainsOpen] = useState(false);
  const [photosOpen, setPhotosOpen] = useState(false);
  const [storesOpen, setStoresOpen] = useState(false);
  const [complianceOpen, setComplianceOpen] = useState(false);

  const getOfcPercent = useCallback(() => {
    if (!ofc.data) return;
    const pending = ofc.data.filter(ofc => !ofc.done);

    setOFCPercent(100 - Math.trunc((pending?.length * 100) / ofc.data.length));
  }, [ofc.data]);

  useEffect(() => {
    getOfcPercent();
  }, [ofc.data, getOfcPercent]);

  useEffect(() => {
    setChainsOpen(false);
    setPhotosOpen(false);
    setStoresOpen(false);
    setComplianceOpen(false);
  }, [filters]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={6} md={6}>
        <h3>{`¡Hola ${user.data?.displayName}!`}</h3>
        <h5>Filtrá las opciones para conocer el estado de tus cuentas:</h5>
      </GridItem>
      <GridItem xs={12} sm={6} md={6}>
        <FilterBar
          withSpace
          allChains
          size={{
            xs: 6,
            md: 6,
            sm: 6
          }}
          client
          category={false}
          branch={false}
        />
      </GridItem>

      <GridItem xs={12} sm={6} md={6} lg={3}>
        <CardData
          image={shop}
          title="Tiendas Contratadas"
          isOpen={chainsOpen}
          onOpen={() => setChainsOpen(!chainsOpen)}
          content={branches.data?.length}
          sub={filters?.chain && allBranches?.length}
        />
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <CardData
          isOpen={photosOpen}
          onOpen={() => setPhotosOpen(!photosOpen)}
          image={camera}
          title="OFC"
          content={ofc.data?.length}
        />
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <CardData
          isOpen={storesOpen}
          title="Tiendas con Fotos"
          image={visits}
          onOpen={() => setStoresOpen(!storesOpen)}
          content={
            filters?.chain
              ? new Set(filteredReports.map(report => report.branchId)).size
              : new Set(reports.data?.map(report => report.branchId)).size
          }
          sub={filters?.chain ? branches.data?.length : allBranches?.length}
        />
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <CardData
          image={alert}
          contentColor="red"
          title="Cumplimiento OFC"
          isOpen={complianceOpen}
          onOpen={() => setComplianceOpen(!complianceOpen)}
          content={`${OFCPercent}%`}
        />
      </GridItem>

      {chainsOpen && <ChainsDetail />}
      {photosOpen && <PhotosDetail />}
      {storesOpen && <StoresDetail />}
      {complianceOpen && <ComplianceDetail />}
    </GridContainer>
  );
};

AdminDashboard.Layout = AdminLayout;

export default AdminDashboard;
