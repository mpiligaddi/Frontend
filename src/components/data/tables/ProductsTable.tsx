import { FC } from 'react';
import {
  useProducts,
  useCreateProduct,
  useDeleteProduct,
  useUpdateProduct,
  useChains,
  useCategories
} from '@/hooks/api';
import { TableCrud } from '@/components/ui';

const ProductsTable: FC = () => {
  const { isLoading, data } = useProducts();
  const chains = useChains({ all: true });
  const categories = useCategories({ all: true });
  const createProduct = useCreateProduct();
  const deleteProduct = useDeleteProduct();
  const updateProduct = useUpdateProduct();

  return (
    <TableCrud
      title="Productos"
      columns={[
        {
          title: 'Cadena',
          field: 'chain'
        },
        {
          title: 'Categoria',
          field: 'category',
          lookup: categories.data?.reduce(
            (categories, category) => ({
              ...categories,
              [category.name.toUpperCase()]: category.name.toUpperCase()
            }),
            {}
          )
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
        },
        {
          title: 'Descripcion',
          field: 'description'
        }
      ]}
      data={data || []}
      editable={{
        async onRowAdd(data) {
          await createProduct.mutateAsync(data);
        },
        async onRowDelete(data) {
          await deleteProduct.mutateAsync(data.id);
        },
        async onRowUpdate(data) {
          await updateProduct.mutateAsync(data);
        }
      }}
      isLoading={isLoading || chains.isLoading}
    />
  );
};

export default ProductsTable;
