import { FC, useEffect, useState } from 'react';
import { useFormats, useUpdateChainFormat, useChains } from '@/hooks/api';
import { TableCrud } from '@/components/ui';

const FormatsTable: FC = () => {
  const formats = useFormats();
  const chains = useChains({ all: true });
  const updateChainFormat = useUpdateChainFormat();
  const [data, setData] = useState<{ formatId: string; chainId: string }[]>([]);

  useEffect(() => {
    const data: any[] = [];

    formats.data?.forEach(format => {
      const c = chains.data?.filter(chain => chain.formatId === format.id);

      c?.forEach(chain => {
        data.push({
          chainId: chain.id,
          formatId: format.id
        });
      });
    });

    setData(data as any);
  }, [formats.data, chains.data]);

  return (
    <TableCrud
      title="Formatos"
      columns={[
        {
          title: 'Formato',
          field: 'formatId',
          lookup: formats.data?.reduce(
            (formats, format) => ({
              ...formats,
              [format.id]: format.name
            }),
            {}
          )
        },
        {
          title: 'Cadena',
          field: 'chainId',
          lookup: chains.data?.reduce(
            (chains, chain) => ({
              ...chains,
              [chain.id]: chain.name
            }),
            {}
          ),
          editable: 'never'
        }
      ]}
      data={data || []}
      editable={{
        async onRowUpdate({ chainId, formatId }) {
          await updateChainFormat.mutateAsync({
            id: chainId,
            format: formatId
          });
        }
        // async onRowAdd(data) {
        //   console.log(data);
        // }
      }}
      isLoading={formats.isLoading || chains.isLoading}
    />
  );
};

export default FormatsTable;
