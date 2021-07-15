/* eslint-disable react/display-name */
import { useState, useEffect, FC } from 'react';
import { TableCrud, SuccessAlert } from '@/components/ui';
import { useFilters, useFilteredData } from '@/api/reports/filters';
import {
  useCoverages,
  useChains,
  useBranches,
  useClients,
  useCreateCoverage,
  useDeleteCoverage
} from '@/api/data';
import frequencyString from '@/utils/frequency';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
  const { setFilters } = useFilters();
  const allChains = useChains({ all: true });
  const allBranches = useBranches({ all: true });
  const allClients = useClients({ all: true });
  const createCoverage = useCreateCoverage();
  const deleteCoverage = useDeleteCoverage();

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
            client: client?.name,
            chain: allChains.data?.find(
              ch => ch.ID == coverage.branchId.substr(0, 3)
            )?.name,
            branch: allBranches.data?.find(b => b.ID == coverage.branchId)
              ?.name,
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
                editComponent: props => (
                  <Autocomplete
                    disableClearable
                    id="client"
                    options={allClients.data!}
                    value={props.value || null}
                    getOptionLabel={option => option.name}
                    onChange={(_, client) => {
                      props.onChange(client);
                      setFilters(filters => ({
                        ...filters,
                        client,
                        branch: undefined,
                        chain: undefined
                      }));
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
                validate: rowData =>
                  rowData.chain === '' ? 'Campo obligatorio' : '',
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
                      setFilters(filters => ({
                        ...filters,
                        chain,
                        branch: undefined
                      }));
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
                validate: rowData =>
                  rowData.branch === '' ? 'Campo obligatorio' : '',
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
                      setFilters(filters => ({ ...filters, branch }));
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
