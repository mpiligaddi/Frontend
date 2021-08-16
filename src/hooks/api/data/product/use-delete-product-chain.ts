import { useMutation, useQueryClient } from 'react-query';
import { client } from '@/lib/axios';
import { ProductChain } from '@/lib/types';

const deleteProductChain = async (id: string) => {
  const res = await client.delete<{ product: ProductChain[] }>(
    `/api/products/chains/${id}`
  );

  return res.data.product;
};

export const useDeleteProductsChains = () => {
  const queryClient = useQueryClient();

  return useMutation('productsChains', deleteProductChain, {
    async onSuccess() {
      await queryClient.refetchQueries('productsChains');
    }
  });
};
