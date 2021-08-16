import { FC, useEffect, useState } from 'react';
import {
  useProducts,
  useCreateProduct,
  useDeleteProduct,
  useProductsChains,
  useDeleteProductsChains,
  useUpdateProductsChains,
  useChains,
  useCategories
} from '@/hooks/api';
import { TableCrud } from '@/components/ui';

const ProductsTable: FC = () => {
  const products = useProducts();
  const chains = useChains({ all: true });
  const categories = useCategories({ all: true });
  const createProduct = useCreateProduct();
  const productsChains = useProductsChains();
  const updateProductsChains = useUpdateProductsChains();
  const deleteProductsChains = useDeleteProductsChains();

  return (
    <TableCrud
      title="Productos"
      columns={[
        {
          title: 'Cadena',
          field: 'chainId',
          lookup: chains.data?.reduce(
            (chains, chain) => ({
              ...chains,
              [chain.id]: chain.name
            }),
            {}
          )
        },
        {
          title: 'Categoria',
          field: 'product.category.id',
          lookup: categories.data?.reduce(
            (categories, category) => ({
              ...categories,
              [category.id]: category.name
            }),
            {}
          )
        },
        {
          title: 'Nombre',
          field: 'product.name'
        }
      ]}
      data={productsChains.data || []}
      editable={{
        async onRowAdd(data) {
          await createProduct.mutateAsync({
            categoryId: data.product.category.id,
            chainId: data.chainId,
            name: data.product.name
          });
        },
        async onRowDelete(data) {
          await deleteProductsChains.mutateAsync(data.id);
        },
        async onRowUpdate({ chainId, productId, id, product }) {
          await updateProductsChains.mutateAsync({
            chainId,
            id,
            name: product.name,
            categoryId: product.category.id
          });
        }
      }}
      isLoading={products.isLoading || chains.isLoading}
    />
  );
};

export default ProductsTable;
