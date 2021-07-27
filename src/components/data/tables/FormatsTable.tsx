import { FC } from 'react';
import {
  useFormats,
  useCreateFormat,
  useDeleteFormat,
  useUpdateFormat,
  useChains
} from '@/hooks/api';
import { TableCrud } from '@/components/ui';

const FormatsTable: FC = () => {
  const { isLoading, data } = useFormats();
  const chains = useChains({ all: true });
  const createFormat = useCreateFormat();
  const deleteFormat = useDeleteFormat();
  const updateFormat = useUpdateFormat();

  return (
    <TableCrud
      title="Formatos"
      columns={[
        {
          title: 'Identificador',
          field: 'id'
        },
        {
          title: 'Nombre',
          field: 'name'
        },
        {
          title: 'Cadena',
          field: 'chain',
          lookup: chains.data?.reduce(
            (chains, chain) => ({
              ...chains,
              [chain.name.toUpperCase()]: chain.name.toUpperCase()
            }),
            {}
          )
        }
      ]}
      data={data || []}
      editable={{
        async onRowAdd(data) {
          await createFormat.mutateAsync(data);
        },
        async onRowDelete(data) {
          await deleteFormat.mutateAsync(data.id);
        },
        async onRowUpdate(data) {
          await updateFormat.mutateAsync(data);
        }
      }}
      isLoading={isLoading || chains.isLoading}
    />
  );
};

export default FormatsTable;
