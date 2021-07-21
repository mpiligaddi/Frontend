/* eslint-disable react/display-name */
import { useState, useEffect, FC, useRef, useCallback } from 'react';
import { TableCrud, SuccessAlert } from '@/components/ui';
import { useFilters, useFilteredData } from '@/api/reports/filters';
import {
  useCoverages,
  useChains,
  useBranches,
  useClients,
  useCreateCoverage,
  useDeleteCoverage,
  useUpdateCoverage
} from '@/api/data';
import frequencyString from '@/utils/frequency';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Branch, Chain, Client } from '@/lib/types';

interface Data {
  client?: string;
  chain?: string;
  branch?: string;
  periodReport?: string;
  intensity: number;
  frequency: number;
  id: string;
}

const CoveragesTable: FC = () => {
  const coverages = useCoverages();
  const { chains, branches } = useFilteredData();
  const [client, setClient] = useState({});
  const { setFilters } = useFilters();
  const allChains = useChains({ all: true });
  const allBranches = useBranches({ all: true });
  const allClients = useClients({ all: true });
  const createCoverage = useCreateCoverage();
  const deleteCoverage = useDeleteCoverage();
  const updateCoverage = useUpdateCoverage();

  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCoverages = async () => {
      try {
        setLoading(true);
        const data = coverages.data?.map(coverage => {
          const client = allClients.data?.find(
            c => +c.ID === coverage.clientId
          );

          const periodReport = client?.periodReportId
            ? frequencyString[client?.periodReportId]
            : 'No Definido';

          return {
            client: client?.ID,
            chain: allChains.data?.find(
              ch => ch.ID == coverage.branchId.substr(0, 3)
            )?.ID,
            branch: allBranches.data?.find(b => b.ID == coverage.branchId)?.ID,
            intensity: coverage.intensity,
            frequency: coverage.frequency,
            periodReport,
            id: coverage.id
          };
        });

        setData(data || []);
        setLoading(false);
      } catch (error) {
        console.error(`getCoverages. Ocurrió el error: ${error}`);
      }
    };
    getCoverages();
  }, [coverages.data, allChains.data, allBranches.data, allClients.data]);

  return (
    <>
      {createCoverage.isSuccess && (
        <SuccessAlert msg="Anexo agregado con éxito" onConfirm={() => {}} />
      )}
      {data && (
        <div>
          <TableCrud
            title="Anexos"
            data={data}
            columns={[
              {
                title: 'Cliente',
                field: 'client',
                validate: rowData =>
                  rowData.client === '' ? 'Campo obligatorio' : '',
                lookup: allClients.data?.reduce(
                  (clients, client) => ({
                    ...clients,
                    [client.ID]: client.name
                  }),
                  {}
                )
              },
              {
                title: 'Cadena',
                field: 'chain',
                validate: rowData =>
                  rowData.chain === '' ? 'Campo obligatorio' : '',
                lookup: allChains.data?.reduce(
                  (chains, chain) => ({
                    ...chains,
                    [chain.ID]: chain.name
                  }),
                  {}
                )
              },
              {
                title: 'Sucursal',
                field: 'branch',
                render: row =>
                  allBranches.data?.find(branch => row.branch === branch.ID)
                    ?.name,
                validate: rowData =>
                  rowData.branch === '' ? 'Campo obligatorio' : '',
                lookup: branches.data?.reduce(
                  (branches, branch) => ({
                    ...branches,
                    [branch.ID]: branch.name
                  }),
                  {}
                )
              },
              {
                title: 'Frecuencia',
                field: 'frequency',
                type: 'numeric',
                validate: rowData =>
                  !rowData.frequency ? 'Campo obligatorio' : ''
              },
              {
                title: 'Intensidad',
                field: 'intensity',
                type: 'numeric'
              },
              {
                title: 'PRA',
                field: 'periodReport',
                editable: 'never'
                // editComponent: props => (
                //   <Autocomplete
                //     disableClearable
                //     id="periodReport"
                //     value={props.value || null}
                //     options={periodReport}
                //     getOptionLabel={option => option.name}
                //     onChange={(_, value) => props.onChange(value)}
                //     renderInput={params => (
                //       <TextField
                //         {...params}
                //         InputLabelProps={{
                //           shrink: true
                //         }}
                //         variant="standard"
                //         label="PRA"
                //         helperText="Período reporte"
                //       />
                //     )}
                //   />
                // )
              }
            ]}
            editable={{
              async onRowAdd(data) {
                createCoverage.mutate({
                  branchId: data.branch!,
                  clientId: +data.client!,
                  frequency: data.frequency,
                  intensity: data.intensity
                });
              },
              async onRowUpdateCancelled() {
                console.log('cancelled');
              },
              async onRowUpdate(data) {},
              //   console.log(data);
              //   // updateCoverage.mutate({
              //   //   id: data.id,
              //   //   branchId: data.branch!.ID,
              //   //   clientId: +data.client!.ID,
              //   //   frequency: data.frequency,
              //   //   intensity: data.intensity
              //   // });
              // },
              async onRowDelete({ id }) {
                deleteCoverage.mutate(id);
              }
            }}
          />
        </div>
      )}
    </>
  );
};

export default CoveragesTable;
