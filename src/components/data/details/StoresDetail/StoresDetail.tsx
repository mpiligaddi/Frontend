import { useState, useEffect, FC, useCallback } from 'react';
import { GridContainer, GridItem, TableDashboard } from '@/components/ui';
import Link from '@material-ui/core/Link';
import { useRouter } from 'next/router';
import { useFilters, useFilteredData } from '@/api/reports/filters';
import { useZones } from '@/api/data';
import { primaryBackgroundText } from '@/utils/styles';
import { useStyles } from './styles';

const frequency = {
  FV: 'Foto Visita',
  FS: 'Foto Semanal',
  FQ: 'Foto Quincenal',
  FM: 'Foto Mensual'
};

const columnsByChain = [
  {
    title: 'Sucursal',
    field: 'branch'
  },
  {
    title: 'Fecha de último reporte',
    field: 'lastReport'
  },
  {
    title: 'Zona',
    field: 'zone'
  },
  {
    title: 'Reporte Completo',
    field: 'isComplete'
  }
];

const columnsByClient = [
  {
    title: 'Cadena',
    field: 'chain'
  },
  ...columnsByChain
];

const StoresDetail: FC = () => {
  const router = useRouter();
  const { filters, filteredReports } = useFilters();
  const classes = useStyles();
  const { branches, reports, chains } = useFilteredData();

  const [data, setData] = useState([]);
  const { data: zones } = useZones();

  const getData = useCallback(() => {
    if (filters?.chain) {
      const data = filteredReports.map(r => {
        const report = {
          branch: branches.data?.filter(b => b.ID == r.branchId)[0]?.name,
          lastReport: r.createdAt.toDate().toLocaleString(),
          zone: zones?.filter(
            z =>
              z.ID == branches.data?.filter(b => b.ID == r.branchId)[0]?.zoneId
          )[0]?.name,
          isComplete: r.isComplete ? 'SI' : 'NO'
        };

        return report;
      });

      setData(data as any);
      return;
    }

    const data = reports.data?.map(report => ({
      chain: chains.data?.filter(c => c.ID == report.branchId.substr(0, 3))[0]
        ?.name,
      branch: branches.data?.filter(b => b.ID == report.branchId)[0]?.name,
      lastReport: report.createdAt.toDate().toLocaleString(),
      zone: zones?.filter(
        z =>
          z.ID == branches.data?.filter(b => b.ID == report.branchId)[0]?.zoneId
      )[0]?.name,

      isComplete: report.isComplete ? 'SI' : 'NO'
    }));

    setData(data as any);
  }, [
    branches.data,
    filters,
    chains.data,
    filteredReports,
    zones,
    reports.data
  ]);

  useEffect(() => {
    getData();
  }, [filters, getData]);

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <br />
          <h3>Tiendas con fotos</h3>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <br />
          <div style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <p>
              Período de reporte fotográfico acordado:{' '}
              <span style={primaryBackgroundText}>
                {frequency[filters?.client?.periodReportId!]}
              </span>
            </p>
          </div>
          <br />
          <div style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <p>
              Número de tiendas con fotografías durante el período acordado:{' '}
              {'  '}
              <span style={primaryBackgroundText}>
                {filters?.chain
                  ? `${filteredReports.length} (de ${branches.data?.length} totales)`
                  : `${reports.data?.length} (de ${branches.data?.length} totales)`}
              </span>
            </p>
          </div>
          <br />
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              {filters?.chain ? (
                <>
                  {filteredReports.length > 0 && (
                    <>
                      <div className={classes.stats}>
                        <Link
                          href="#"
                          underline="hover"
                          color="primary"
                          variant="body1"
                          align="center"
                          onClick={() => router.push('/admin/revision')}
                        >
                          <p>Ver fotos</p>
                        </Link>
                      </div>
                      <br />
                      <TableDashboard
                        title="Tiendas Visitadas"
                        data={data}
                        columns={columnsByChain}
                      />
                    </>
                  )}
                </>
              ) : (
                reports.data &&
                reports.data.length > 0 && (
                  <>
                    <div className={classes.stats}>
                      <Link
                        href="#"
                        underline="hover"
                        color="primary"
                        variant="body1"
                        align="center"
                        onClick={() => router.push('/admin/revision')}
                      >
                        <p>Ver fotos</p>
                      </Link>
                    </div>
                    <br />
                    <br />
                    <TableDashboard
                      title="Tiendas Contratadas"
                      data={data}
                      columns={columnsByClient}
                    />
                  </>
                )
              )}
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </>
  );
};

export default StoresDetail;
