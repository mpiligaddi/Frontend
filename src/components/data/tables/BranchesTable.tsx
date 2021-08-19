import { FC } from 'react';
import { TableCrud } from '@/components/ui';
import {
  useChains,
  useZones,
  useUpdateBranch,
  useBranches,
  useDeleteBranch
} from '@/hooks/api';

const BranchesTable: FC = () => {
  const { data: zones } = useZones();
  const { data: allChains } = useChains({ all: true });
  const branches = useBranches({ all: true });
  const deleteBranch = useDeleteBranch();
  const updateBranch = useUpdateBranch();

  return (
    <>
      <>
        <div>
          <TableCrud
            title="Sucursales"
            data={branches.data || []}
            columns={[
              {
                title: 'Nombre',
                field: 'name',
                validate: rowData =>
                  rowData.name === '' || rowData.name?.length < 3
                    ? { isValid: false, helperText: 'Revise este campo' }
                    : true
              },
              {
                title: 'Cadena',
                field: 'chainId',
                validate: rowData =>
                  rowData.chainId === ''
                    ? { isValid: false, helperText: 'Campo obligatorio' }
                    : true,
                lookup: allChains?.reduce(
                  (chains, chain) => ({
                    ...chains,
                    [chain.id]: chain.name
                  }),
                  {}
                )
              },
              {
                title: 'Localidad',
                field: 'locality'
              },
              {
                title: 'Dirección',
                field: 'address'
              },
              {
                title: 'Zona',
                field: 'zoneId',
                validate: rowData =>
                  rowData.zoneId === ''
                    ? { isValid: false, helperText: 'Campo obligatorio' }
                    : true,
                lookup: zones?.reduce(
                  (zones, zone) => ({ ...zones, [zone.id]: zone.name }),
                  {}
                )
              }
            ]}
            isLoading={branches.isLoading}
            editable={{
              async onRowUpdate(data) {
                await updateBranch.mutateAsync({
                  id: data.id,
                  locality: data.locality,
                  displayName: data.displayName,
                  address: data.address,
                  chain: data.chainId,
                  name: data.name,
                  zone: data.zoneId
                });
              },
              async onRowDelete({ id }) {
                await deleteBranch.mutateAsync(id);
              }
            }}
          />
        </div>
      </>
    </>
  );
};

export default BranchesTable;
