import { FC } from 'react';
import {
  useChains,
  useCreateChain,
  useDeleteChain,
  useUpdateChain
} from '@/hooks/api';
import { TableCrud } from '@/components/ui';

const ChainsTable: FC = () => {
  const chains = useChains({ all: true });
  const createChain = useCreateChain();
  const deleteChain = useDeleteChain();
  const updateChain = useUpdateChain();

  return (
    <div>
      <TableCrud
        title="Cadenas"
        data={chains.data || []}
        columns={[
          {
            title: 'Nombre',
            field: 'name',
            validate: rowData =>
              rowData.name === ''
                ? { isValid: false, helperText: 'Campo obligatorio' }
                : true
          }
        ]}
        isLoading={chains.isLoading}
        editable={{
          async onRowAdd({ name }) {
            await createChain.mutateAsync({ name });
          },
          async onRowUpdate({ name, id }) {
            await updateChain.mutateAsync({ id, name });
          },
          async onRowDelete({ id }) {
            await deleteChain.mutateAsync(id);
          }
        }}
      />
    </div>
  );
};

export default ChainsTable;
