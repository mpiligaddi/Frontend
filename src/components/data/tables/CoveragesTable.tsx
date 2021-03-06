import { useState, useEffect, FC, useMemo } from 'react';
import { TableCrud } from '@/components/ui';
import { Filters } from '@/context/filters';
import {
  useCoverages,
  useChains,
  useBranches,
  useClients,
  useCreateCoverage,
  useDeleteCoverage
} from '@/hooks/api';
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
    clientId: client?.id
  });
  const branches = useBranches({
    chain: chain?.id,
    clientId: client?.id!
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
        const client = allClients.data?.find(c => c.id === coverage.clientId);

        const periodReport =
          client?.periods?.find(({ period }) => period.type.alias === 'F')
            ?.period.name || 'No definido';

        return {
          client,
          chain: coverage.branch.chain,
          branch: allBranches.data?.find(b => b.id == coverage.branchId),
          intensity: coverage.intensity,
          frequency: coverage.frecuency,
          periodReport,
          id: coverage.id
        };
      });

      setData(data || []);
      setLoading(false);
    } catch (error) {
      console.error(`getCoverages. Ocurri?? el error: ${error}`);
    }
  }, [coverages.data, allChains.data, allBranches.data, allClients.data]);

  return (
    <>
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
                    helperText="D??as a la semana"
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
                //         helperText="Per??odo reporte"
                //       />
                //     )}
                //   />
                // )
              }
            ]}
            isLoading={loading}
            editable={{
              async onRowAdd(data) {
                await createCoverage.mutateAsync({
                  branchId: data.branch?.id!,
                  clientId: data.client?.id!,
                  frequency: data.frequency,
                  intensity: data.intensity
                });
              },
              async onRowDelete({ id }) {
                await deleteCoverage.mutateAsync(id);
              }
            }}
          />
        </div>
      )}
    </>
  );
};

export default CoveragesTable;
