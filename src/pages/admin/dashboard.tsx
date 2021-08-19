import { useState, useEffect, useMemo } from 'react';
import { AdminLayout } from '@/components/common';
import { FilterBar } from '@/components/reports';
import { GridContainer, GridItem, CardData } from '@/components/ui';
import {
  useMe,
  useFilteredData,
  useBranches,
  useOFC,
  useBreakReports,
  useOQC,
  useOPC,
  usePriceReports
} from '@/hooks/api';
import { useFilters } from '@/context/filters';
import dynamic from 'next/dynamic';

import shop from '@/assets/img/icon-shop.png';
import visits from '@/assets/img/icon-visits.png';
import camera from '@/assets/img/icon-camera.png';
import alert from '@/assets/img/icon-alert.png';

import { Page } from '@/typings';
import { ensureAuth } from '@/lib/auth';

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
    reported: false,
    enabled: { chains: false, ofc: false, branches: false }
  });
  const { data: allBranches } = useBranches({
    clientId: filters?.client?.id
  });
  const branches = useBranches({
    chain: filters?.chain?.id,
    clientId: filters?.client?.id
  });
  const ofc = useOFC({
    categories: categories.data,
    branches: branches.data,
    reports: reports.data
  });
  const breakReports = useBreakReports(filters?.client?.id);
  const priceReports = usePriceReports(filters?.client?.id);

  const oqc = useOQC({
    branches: branches.data,
    reports: breakReports.data
  });
  const opc = useOPC({
    branches: branches.data,
    reports: priceReports.data
  });

  const [chainsOpen, setChainsOpen] = useState(false);
  const [photosOpen, setPhotosOpen] = useState(false);
  const [storesOpen, setStoresOpen] = useState(false);
  const ofcPercent = useMemo(
    () =>
      100 -
      Math.trunc(
        ((ofc.data || []).filter(ofc => !ofc.done)?.length * 100) /
          (ofc.data || []).length
      ),
    [ofc.data]
  );

  const oqcPercent = useMemo(
    () =>
      100 -
      Math.trunc(
        ((oqc.data || []).filter(oqc => !oqc.done)?.length * 100) /
          (oqc.data || []).length
      ),
    [oqc.data]
  );

  const opcPercent = useMemo(
    () =>
      100 -
      Math.trunc(
        ((opc.data || []).filter(opc => !opc.done)?.length * 100) /
          (opc.data || []).length
      ),
    [opc.data]
  );

  const [complianceOpen, setComplianceOpen] = useState(false);

  useEffect(() => {
    setChainsOpen(false);
    setPhotosOpen(false);
    setStoresOpen(false);
    setComplianceOpen(false);
  }, [filters]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={6} md={6}>
        <h3>{`¡Hola ${user.data?.name}!`}</h3>
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

      <GridItem xs={12} sm={12} md={12} lg={12}>
        <p>Reporte Fotos</p>
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
          content={`${ofcPercent}%`}
        />
      </GridItem>

      {chainsOpen && <ChainsDetail />}
      {photosOpen && <PhotosDetail />}
      {storesOpen && <StoresDetail />}
      {complianceOpen && <ComplianceDetail />}
      <GridItem xs={12} sm={12} md={12} lg={12}>
        <p>Reporte Quiebres</p>
      </GridItem>

      <GridItem xs={12} sm={6} md={6} lg={3}>
        <CardData
          image={shop}
          title="Tiendas Contratadas"
          openable={false}
          content={branches.data?.length}
          sub={filters?.chain && allBranches?.length}
        />
      </GridItem>

      <GridItem xs={12} sm={6} md={6} lg={3}>
        <CardData
          openable={false}
          image={camera}
          title="OQC"
          content={oqc.data?.length}
        />
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <CardData
          image={visits}
          openable={false}
          title="Tiendas Revisadas"
          content={
            filters?.chain
              ? new Set(
                  breakReports.data
                    ?.filter(report => report.chainId === filters?.chain?.id)
                    .map(report => report.branchId)
                ).size
              : new Set(breakReports.data?.map(report => report.branchId)).size
          }
          sub={filters?.chain ? branches.data?.length : allBranches?.length}
        />
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <CardData
          openable={false}
          contentColor="red"
          image={alert}
          title="Cumplimiento OQC"
          content={`${oqcPercent}%`}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={12} lg={12}>
        <p>Reporte Precios</p>
      </GridItem>

      <GridItem xs={12} sm={6} md={6} lg={3}>
        <CardData
          image={shop}
          title="Tiendas Contratadas"
          openable={false}
          content={branches.data?.length}
          sub={filters?.chain && allBranches?.length}
        />
      </GridItem>

      <GridItem xs={12} sm={6} md={6} lg={3}>
        <CardData
          openable={false}
          image={camera}
          title="OPC"
          content={opc.data?.length}
        />
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <CardData
          image={visits}
          openable={false}
          title="Tiendas Revisadas"
          content={
            filters?.chain
              ? new Set(
                  priceReports.data
                    ?.filter(report => report.chainId === filters?.chain?.id)
                    .map(report => report.branchId)
                ).size
              : new Set(priceReports.data?.map(report => report.branchId)).size
          }
          sub={filters?.chain ? branches.data?.length : allBranches?.length}
        />
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <CardData
          openable={false}
          contentColor="red"
          image={alert}
          title="Cumplimiento OPC"
          content={`${opcPercent}%`}
        />
      </GridItem>
    </GridContainer>
  );
};

AdminDashboard.Layout = AdminLayout;

export const getServerSideProps = ensureAuth('backoffice');

export default AdminDashboard;
