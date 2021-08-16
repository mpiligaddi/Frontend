import { useState, useEffect, FC, useCallback, useMemo } from 'react';
import { GridContainer, GridItem, TableDashboard } from '@/components/ui';
import Link from '@material-ui/core/Link';
import { useRouter } from 'next/router';
import { useFilters } from '@/context/filters';
import { useZones, useFilteredData, useChains } from '@/hooks/api';
import { primaryBackgroundText } from '@/utils/styles';
import dayjs from 'dayjs';
import { useStyles } from './styles';
import { Report } from '@/lib/types';

const StoresDetail: FC = () => {
  const router = useRouter();
  const { filters, filteredReports } = useFilters();
  const classes = useStyles();
  const chains = useChains({ all: true });
  const { branches, reports } = useFilteredData();

  const [data, setData] = useState([]);
  const { data: zones } = useZones();

  const getData = useCallback(() => {
    if (filters?.chain) {
      const data = filteredReports.reduce((reports: any[], r: Report) => {
        const existReport = reports.find(
          report => report.branchId === r.branchId
        ) as Report;

        if (existReport && dayjs(existReport.createdAt).isBefore(r.createdAt)) {
          const index = reports.indexOf(existReport);
          reports[index] = {
            branchId: r.branchId,
            createdAt: dayjs(r.createdAt).format('DD/MM/YYYY HH:mm A'),
            zone: zones?.filter(
              z =>
                z.id ==
                branches.data?.filter(b => b.id == r.branchId)[0]?.zoneId
            )[0]?.name,
            isComplete: r.isComplete ? 'SI' : 'NO'
          };

          return reports;
        }

        const report = {
          chainId: r.chainId,
          branchId: r.branchId,
          createdAt: dayjs(r.createdAt).format('DD/MM/YYYY HH:mm A'),
          zone: zones?.filter(
            z =>
              z.id == branches.data?.filter(b => b.id == r.branchId)[0]?.zoneId
          )[0]?.name,
          isComplete: r.isComplete ? 'SI' : 'NO'
        };

        return [...reports, report];
      }, []);

      setData(data as any);
      return;
    }

    const data = reports.data?.reduce((reports: any[], r: Report) => {
      const existReport = reports.find(
        report => report.branchId === r.branchId
      ) as Report;

      if (existReport) {
        if (dayjs(existReport.createdAt).isBefore(r.createdAt)) {
          const index = reports.indexOf(existReport);
          reports[index] = {
            chainId: r.chainId,
            branchId: r.branchId,
            createdAt: dayjs(r.createdAt).format('DD/MM/YYYY HH:mm A'),
            zone: zones?.filter(
              z =>
                z.id ==
                branches.data?.filter(b => b.id == r.branchId)[0]?.zoneId
            )[0]?.name,
            isComplete: r.isComplete ? 'SI' : 'NO'
          };

          return reports;
        }

        return reports;
      }

      const report = {
        chainId: r.chainId,
        branchId: r.branchId,
        createdAt: dayjs(r.createdAt).format('DD/MM/YYYY HH:mm A'),
        zone: zones?.filter(
          z => z.id == branches.data?.filter(b => b.id == r.branchId)[0]?.zoneId
        )[0]?.name,
        isComplete: r.isComplete ? 'SI' : 'NO'
      };

      return [...reports, report];
    }, []);

    setData(data as any);
  }, [branches.data, filters, filteredReports, zones, reports.data]);

  useEffect(() => {
    getData();
  }, [filters, getData]);

  const columnsByChain = useMemo(
    () => [
      {
        title: 'Sucursal',
        field: 'branchId',
        lookup: branches.data?.reduce(
          (branches, branch) => ({
            ...branches,
            [branch.id]: branch.name
          }),
          {}
        )
      },
      {
        title: 'Fecha de último reporte',
        field: 'createdAt'
      },
      {
        title: 'Zona',
        field: 'zone'
      }
    ],
    [branches.data]
  );

  const columnsByClient = useMemo(
    () => [
      {
        title: 'Cadena',
        field: 'chainId',
        lookup: chains.data?.reduce(
          (chains, chain) => ({
            ...chains,
            [chain.id]: chain.name
          }),
          {}
        )
      },
      ...columnsByChain
    ],
    [columnsByChain, chains.data]
  );

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
                {
                  filters?.client?.periods?.find(
                    ({ period }) => period.type.alias === 'F'
                  )?.period.alias
                }
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
                  ? `${
                      new Set(filteredReports.map(report => report.branchId))
                        .size
                    } (de ${branches.data?.length} totales)`
                  : `${
                      new Set(reports.data?.map(report => report.branchId)).size
                    } (de ${branches.data?.length} totales)`}
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
