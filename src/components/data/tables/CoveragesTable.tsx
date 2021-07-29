/* eslint-disable react/display-name */
import { useState, useEffect, FC, useMemo } from 'react';
import { TableCrud, SuccessAlert } from '@/components/ui';
import { Filters } from '@/context/filters';
import {
  useCoverages,
  useChains,
  useBranches,
  useClients,
  useCreateCoverage,
  useDeleteCoverage
} from '@/hooks/api';
import frequencyString from '@/utils/frequency';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Branch, Chain, Client } from '@/lib/types';

interface Data {
  client?: Client;
  chain?: Chain;
  branch?: Branch;
  periodReport?: string;
  intensity: number;
  frequency: number;
  id: string;
}

const CoveragesTable: FC = () => {
  const coverages = useCoverages();
  const [client, setClient] = useState<Client | null>(null);
  const [chain, setChain] = useState<Chain | null>(null);
  const [branch, setBranch] = useState<Branch | null>(null);
  const [filters, setFilters] = useState<Filters>({});
  const chains = useChains({
    clientId: client?.ID
  });
  const branches = useBranches({
    chain: chain?.ID,
    clientId: +client?.ID!
  });
  const allChains = useChains({ all: true });
  const allBranches = useBranches({ all: true });
  const allClients = useClients({ all: true });
  const createCoverage = useCreateCoverage();
  const deleteCoverage = useDeleteCoverage();

  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      const data = coverages.data?.map(coverage => {
        const client = allClients.data?.find(c => +c.ID === coverage.clientId);

        const periodReport = client?.periodReportId
          ? frequencyString[client?.periodReportId]
          : 'No Definido';

        return {
          client,
          chain: allChains.data?.find(
            ch => ch.ID == coverage.branchId.substr(0, 3)
          ),
          branch: allBranches.data?.find(b => b.ID == coverage.branchId),
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
                render: rowData => rowData.client?.name,
                validate: rowData =>
                  rowData.client?.name === '' ? 'Campo obligatorio' : '',
                editComponent: props => (
                  <Autocomplete
                    disableClearable
                    id="client"
                    options={allClients.data!}
                    value={props.value || null}
                    getOptionLabel={option => option.name}
                    onChange={(_, client) => {
                      props.onChange(client);
                      setClient(client);
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Cliente"
                        InputLabelProps={{
                          shrink: true
                        }}
                        helperText="Cliente del anexo"
                      />
                    )}
                  />
                )
              },
              {
                title: 'Cadena',
                field: 'chain',
                render: rowData => rowData.chain?.name,
                validate: rowData =>
                  rowData.chain?.name === '' ? 'Campo obligatorio' : '',
                editComponent: props => (
                  <Autocomplete
                    disableClearable
                    id="chain"
                    disabled={!props.rowData.client}
                    loading={chains.isLoading}
                    options={chains.data || []}
                    value={props.value || null}
                    getOptionLabel={option => option.name}
                    onChange={(_, chain) => {
                      props.onChange(chain);
                      setChain(chain);
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Cadena"
                        InputLabelProps={{
                          shrink: true
                        }}
                        helperText="Cadena del anexo"
                      />
                    )}
                  />
                )
              },
              {
                title: 'Sucursal',
                field: 'branch',
                render: rowData => rowData.branch?.name,
                validate: rowData =>
                  rowData.branch?.name === '' ? 'Campo obligatorio' : '',
                editComponent: props => (
                  <Autocomplete
                    disableClearable
                    disabled={!props.rowData.chain}
                    id="branch"
                    loading={branches.isLoading}
                    value={props.value || null}
                    options={branches.data || []}
                    getOptionLabel={option => option.name}
                    onChange={(_, branch) => {
                      props.onChange(branch);
                      setBranch(branch);
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Sucursal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        helperText="Punto de venta"
                      />
                    )}
                  />
                )
              },
              {
                title: 'Frecuencia',
                field: 'frequency',
                type: 'numeric',
                validate: rowData =>
                  !rowData.frequency ? 'Campo obligatorio' : '',
                editComponent: props => (
                  <TextField
                    variant="standard"
                    label="Frecuencia"
                    id="frequency"
                    type="number"
                    value={props.value || null}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={e => props.onChange(e.target.value)}
                    helperText="Días a la semana"
                  />
                )
              },
              {
                title: 'Intensidad',
                field: 'intensity',
                type: 'numeric',
                editComponent: props => (
                  <TextField
                    variant="standard"
                    label="Intensidad"
                    id="intensity"
                    type="number"
                    value={props.value || null}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={e => props.onChange(e.target.value)}
                    helperText="Horas en visita"
                  />
                )
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
            isLoading={loading}
            editable={{
              async onRowAdd(data: any) {
                createCoverage.mutate({
                  branchId: data.branch.ID,
                  clientId: data.client.ID,
                  frequency: data.frequency,
                  intensity: data.intensity
                });
              },
              // async onRowUpdate(data) {
              //   console.log(data);
              // },
              // onRowUpdate: (newData, oldData) =>
              //   new Promise((resolve) => {
              //       firebase.db
              //         .collection('coverages')
              //         .doc(`${oldData.id}`)
              //         .set({
              //           clientId: newData.client,
              //           chainId: newData.chain,
              //           branchId: newData.branch,
              //           frequency: newData.frequency,
              //           intensity: newData.intensity,
              //           periodReport: newData.periodReport,
              //         })
              //         .then(function () {
              //           console.log('Document successfully written!');
              //           refreshCoverages();
              //         })
              //         .catch(function (error) {
              //           console.error('Error writing document: ', error);
              //         });
              //       resolve();
              //   }),
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
