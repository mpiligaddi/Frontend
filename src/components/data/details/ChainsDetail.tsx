import React, { useState, useEffect, FC, useCallback } from 'react';
import { GridContainer, GridItem, TableDashboard } from '@/components/ui/';
import { useFilteredData, useCoverages, useZones } from '@/hooks/api';
import { useFilters } from '@/context/filters';
import { primaryBackgroundText } from '@/utils/styles';

const columnsByChain = [
  {
    title: 'Sucursal',
    field: 'branch'
  },
  {
    title: 'Frecuencia',
    field: 'frequency'
  },
  {
    title: 'Intensidad',
    field: 'intensity'
  },
  {
    title: 'Zona',
    field: 'zone'
  }
];

const columnsByClient = [
  {
    title: 'Cadena',
    field: 'chain'
  },
  ...columnsByChain
];

const ChainsCardDetail: FC = () => {
  const { filters } = useFilters();
  const { branches, chains } = useFilteredData({
    enabled: {
      categories: false,
      ofc: false,
      reports: false
    }
  });
  const { data: coverages } = useCoverages();
  const { data: zones } = useZones();
  const [data, setData] = useState([]);

  const getData = useCallback(() => {
    const coveragesByClient = coverages?.filter(
      c => c.clientId === +filters?.client?.ID!
    );

    if (filters?.chain) {
      const coveragesByChain = coveragesByClient?.filter(
        cxcli => cxcli.branchId.substr(0, 3) == filters?.chain?.ID
      );
      const dataChain = coveragesByChain?.map(c => {
        const coverage = {
          branch: branches.data?.filter(b => b.ID == c.branchId)[0]?.name,
          intensity: c.intensity,
          frequency: c.frequency,
          zone: zones?.filter(
            z =>
              z.ID == branches.data?.filter(b => b.ID == c.branchId)[0]?.zoneId
          )[0]?.name
        };
        return coverage;
      });

      setData(dataChain as any);
      return;
    }

    const dataClient = coveragesByClient?.map(c => {
      const coverage = {
        chain: chains.data?.filter(
          chain => chain.ID == c.branchId.substr(0, 3)
        )[0]?.name,
        branch: branches.data?.filter(b => b.ID == c.branchId)[0]?.name,
        intensity: c.intensity,
        frequency: c.frequency,
        zone: zones?.filter(
          z => z.ID == branches.data?.filter(b => b.ID == c.branchId)[0]?.zoneId
        )[0]?.name
      };
      return coverage;
    });

    setData(dataClient as any);
  }, [filters, branches.data, coverages, zones, chains.data]);

  useEffect(() => {
    getData();
  }, [filters, getData]);

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <h3>Tiendas contratadas</h3>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {filters?.chain ? (
            <>
              <br />
              <div
                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
              >
                <p>
                  Número de tiendas totales contratadas en la cadena
                  seleccionada: {'  '}
                  <span
                    style={primaryBackgroundText}
                  >{`${branches.data?.length}`}</span>
                </p>
                <br />
              </div>
              <TableDashboard
                title={`Tiendas Contratadas - ${filters.chain.name}`}
                data={data}
                columns={columnsByChain}
              />
              <br />
            </>
          ) : (
            <>
              <br />
              <div
                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
              >
                <p>
                  Número de tiendas totales contratadas para todas las cadenas:{' '}
                  {'  '}
                  <span
                    style={primaryBackgroundText}
                  >{`${branches.data?.length}`}</span>
                </p>
              </div>
              <br />
              <TableDashboard
                title="Tiendas Contratadas"
                data={data}
                columns={columnsByClient}
              />
            </>
          )}
        </GridItem>
      </GridContainer>
    </>
  );
};

export default ChainsCardDetail;
