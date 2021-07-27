import { useState, useEffect, useCallback, FC } from 'react';
import { AccessTime } from '@material-ui/icons';
import { LinearProgress } from '@material-ui/core';
import ChartCate from '../../charts/CategoryChart';
import ChartResp from '../../charts/ResponsibleChart';
import ChartChains from '../../charts/ChainsChart';
import {
  Card,
  TableDashboard,
  CardBody,
  GridItem,
  CardFooter,
  GridContainer
} from '@/components/ui';
import { useFilters } from '@/context/filters';
import { useFilteredData, useZones, useSupervisors } from '@/hooks/api';
import { primaryBackgroundText, primaryColor } from '@/utils/styles';
import { useStyles } from './styles';

const columns = [
  {
    title: 'Zona',
    field: 'zone'
  },
  {
    title: 'Cadena',
    field: 'chain'
  },
  {
    title: 'Punto de venta',
    field: 'branch'
  },
  {
    title: 'Último registro',
    field: 'lastReport'
  },
  {
    title: 'Supervisor',
    field: 'supervisor'
  }
];

export const ComplianceDetail: FC = () => {
  const { filters, filteredReports } = useFilters();
  const classes = useStyles();
  const { branches, reports, categories, ofc } = useFilteredData();
  const { data: zones } = useZones();
  const [dataSupervisors, setDataSupervisors] = useState<number[]>([]);
  const [dataCategories, setDataCategories] = useState<number[]>([]);
  const [dataChainsChart, setDataChainsChart] = useState<number[]>([]);
  const [labelsSupervisors, setLabelsSupervisors] = useState<string[]>([]);
  const [labelsCategories, setLabelsCategories] = useState<string[]>([]);
  const [labelsChainsChart, setLabelsChainsChart] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [pending, setPendings] = useState(0);
  //const [OFCpendings, setOFCpendings] = useState([]);
  const [dataChain, setDataChain] = useState<any>([]);
  const [dataClient, setDataClient] = useState<any>([]);
  const [OFCPorcIncump, setOFCPorcIncump] = useState(0);
  const { data: supervisors } = useSupervisors();

  const getPendings = useCallback(() => {
    let pendings = 0;
    pendings =
      filters?.client && filters?.chain
        ? branches.data?.length! - filteredReports.length
        : !filters?.chain?.ID
        ? branches?.data?.length! - reports.data?.length!
        : 0;
    return pendings;
  }, [
    branches.data?.length,
    filteredReports.length,
    filters?.chain,
    filters?.client,
    reports.data?.length
  ]);

  const getOFCPorcIncump = useCallback(() => {
    if (!ofc.data) return;
    const pending = ofc.data.filter(ofc => !ofc.done);

    setOFCPorcIncump(Math.trunc((pending?.length * 100) / ofc.data.length));
  }, [ofc.data]);

  useEffect(() => {
    const pendings = getPendings();
    setPendings(pendings);
  }, [filters?.client, filters?.chain, getPendings]);

  useEffect(() => {
    getOFCPorcIncump();
  }, [ofc.data, getOFCPorcIncump]);

  const getDataXChain = useCallback(() => {
    try {
      const dataXChain = branches.data?.map(comp => ({
        chain: comp.chainName,
        branch: branches.data?.find(b => b.ID == comp.ID)?.name,
        supervisor: supervisors?.find(
          s => s.ID == zones?.find(z => z.ID == comp.zoneId)?.supervisorId
        )?.name,
        zone: zones?.find(z => z.ID == comp.zoneId)?.name,
        lastReport:
          reports.data
            ?.filter(report => report.branchId === comp.ID)
            [reports.data?.length - 1]?.createdAt.toDate()
            .toLocaleString() || 'Sin registros'
        //lastReport: await getReportDate(comp.ID),
      }));

      return dataXChain?.filter(c => c.lastReport == 'Sin registros' || true);
    } catch (error) {
      console.error(`getDataXChain. Ocurrió el error: ${error}`);
    }
  }, [zones, branches.data, supervisors, reports.data]);

  const getDataXClient = useCallback(() => {
    try {
      const dataXClient = branches.data?.map(comp => ({
        chain: comp.chainName,
        branch: branches.data?.filter(b => b.ID == comp.ID)[0]?.name,
        supervisor: supervisors?.filter(
          s => s.ID == zones?.filter(z => z.ID == comp.zoneId)[0]?.supervisorId
        )[0]?.name,
        zone: zones?.filter(z => z.ID == comp.zoneId)[0]?.name,
        lastReport:
          reports.data
            ?.filter(report => report.branchId === comp.ID)
            [reports.data?.length - 1]?.createdAt.toDate()
            .toLocaleString() || 'Sin registros'
      }));

      return dataXClient?.filter(
        c => c.lastReport === 'Sin registros' || false
      );
    } catch (error) {
      console.error(`getDataXClient. Ocurrió el error: ${error}`);
    }
  }, [branches.data, supervisors, zones, reports.data]);

  const getOFCPending = useCallback(() => {
    if (!ofc.data) return;
    const pending = ofc.data.filter(ofc => !ofc.done);

    return pending;
  }, [ofc.data]);

  const getDataSupervisors = useCallback(() => {
    const zoneIds: string[] = [];
    const sups: string[] = [];
    //console.log(allBranches)

    const branchIds = getOFCPending()?.map(pend => pend.branchId);

    //console.log(branchIds)

    branchIds?.forEach(br => {
      branches.data?.map(branch => {
        if (br == branch.ID) {
          zoneIds.push(branch.zoneId);
        }
      });
    });

    //console.log(zoneIds)

    zoneIds.forEach(z => {
      const supId = zones?.filter(zo => zo.ID == z)[0]?.supervisorId;
      sups.push(supId!);
    });

    const counts = getCount(sups);
    setLabelsSupervisors(Object.keys(counts));
    setDataSupervisors(Object.values(counts));
  }, [zones, branches.data, getOFCPending]);

  const getDataCategories = useCallback(() => {
    const param = getOFCPending()?.map(pending => pending.categoryId);
    if (!param) return;
    const counts = getCount(param);
    const cats: string[] = [];

    categories.data?.forEach(c => {
      if (Object.keys(counts).includes(c.ID)) {
        cats.push(c.name);
      }
    });
    setLabelsCategories(cats);
    setDataCategories(Object.values(counts));
  }, [categories.data, getOFCPending]);

  const getDataChainsChart = useCallback(() => {
    const param = getOFCPending()?.map(pending =>
      pending.branchId.substr(0, 3)
    );
    if (!param) return;
    const counts = getCount(param);
    setLabelsChainsChart(Object.keys(counts));
    setDataChainsChart(Object.values(counts));
  }, [getOFCPending]);

  const getCompliances = useCallback(() => {
    setLoading(true);
    if (filters?.chain) {
      const compliances = getDataXChain();
      console.log(compliances);
      setDataChain(compliances);
    } else {
      const compliances = getDataXClient();
      setDataClient(compliances);
    }
    setLoading(false);
  }, [filters?.chain, getDataXChain, getDataXClient]);

  useEffect(() => {
    getCompliances();
  }, [getCompliances]);

  useEffect(() => {
    getCompliances();
  }, [filters, branches.data, getCompliances]);

  useEffect(() => {
    getDataSupervisors();
    getDataCategories();
    getDataChainsChart();
  }, [
    dataClient,
    dataChain,
    getDataSupervisors,
    getDataCategories,
    getDataChainsChart
  ]);

  const getCount = (list: any[]) => {
    const counts: Record<any, number> = {};
    list.forEach(obj => {
      counts[obj] = counts[obj] ? counts[obj] + 1 : 1;
    });
    return counts;
  };

  return (
    <>
      {loading && <LinearProgress className={classes.progress} />}
      {filters?.client && (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <br />
            <h3>Incumplimiento de OFC</h3>
          </GridItem>
          {pending <= 0 ? (
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <p>
                  ¡Felicitaciones! No hay tiendas que no cumplan el OFC para el
                  cliente/sucursal seleccionada.
                </p>
              </GridItem>
            </GridContainer>
          ) : (
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <GridItem xs={12} sm={12} md={12}>
                  <br />
                  <p>
                    A continuación podrás visualizar el detalle del{' '}
                    {OFCPorcIncump}% del{' '}
                    <span
                      style={{ color: primaryColor[0], fontWeight: 'bold' }}
                    >
                      OFC que aún se encuentra pendiente
                    </span>
                  </p>
                  <div
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start'
                    }}
                  >
                    {/* <p>
                      Tiendas totales Sin registros: {'  '}
                      <span style={primaryBackgroundText}>{pending}</span>
                    </p> */}
                    <p>
                      Fotografías pendientes: {'  '}
                      <span style={primaryBackgroundText}>
                        {getOFCPending()?.length}
                      </span>
                    </p>
                    <br />
                    <p>
                      <em>
                        {' '}
                        * Tené en cuenta que esta información guarda relación
                        con la frecuencia de reporte fotográfico acordado con el
                        cliente seleccionado (Ejemplo: si el acuerdo es semanal,
                        el OFC volverá a 0% cada día Lunes)
                      </em>
                    </p>
                  </div>
                </GridItem>
              </GridItem>

              <GridItem xs={12} sm={12} md={12}>
                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer>
                    <GridItem xs={12} sm={6} md={4}>
                      <div data-for="chart">
                        <Card chart>
                          <CardBody>
                            <ChartResp
                              labels={labelsSupervisors}
                              values={dataSupervisors}
                              title="Incumplimiento por responsables"
                            />
                          </CardBody>
                          <CardFooter chart>
                            <div className={classes.stats}>
                              <AccessTime /> Semana actual
                            </div>
                          </CardFooter>
                        </Card>
                      </div>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={4}>
                      <div data-for="chart">
                        <Card chart>
                          <CardBody>
                            <ChartChains
                              values={dataChainsChart}
                              labels={labelsChainsChart}
                              title={'Incumplimiento por cadenas'}
                            />
                          </CardBody>
                          <CardFooter chart>
                            <div className={classes.stats}>
                              <AccessTime /> Semana actual
                            </div>
                          </CardFooter>
                        </Card>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={4}>
                      <div data-for="chart">
                        <Card chart>
                          <CardBody>
                            <ChartCate
                              labels={labelsCategories}
                              values={dataCategories}
                              title={'Incumplimiento por categorías'}
                            />
                          </CardBody>
                          <CardFooter chart>
                            <div className={classes.stats}>
                              <AccessTime /> Semana actual
                            </div>
                          </CardFooter>
                        </Card>
                      </div>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridItem>

              <GridItem xs={12} sm={12} md={12}>
                <GridItem xs={12} sm={12} md={12}>
                  {filters?.chain ? (
                    <TableDashboard
                      title="Tiendas Sin registros"
                      data={dataChain}
                      columns={columns}
                    />
                  ) : (
                    <TableDashboard
                      title="Tiendas Sin registros"
                      data={dataClient}
                      columns={columns}
                    />
                  )}
                </GridItem>
              </GridItem>
            </GridContainer>
          )}
        </GridContainer>
      )}
    </>
  );
};

export default ComplianceDetail;
